package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"golang.org/x/exp/rand"
)

type Player struct {
	PlayerID   string `json:"player_id"`
	PlayerName string `json:"player_name"`
}

type GetPlayerDetails struct {
	PlayerID   string `json:"player_id"`
	PlayerName string `json:"player_name"`
	Team       string `json:"team"`
	ProfilePic string `json:"profile_pic"`
	CurPrice   int    `json:"cur_price"`
	LastChange string `json:"last_change"`
}

type CreateLeague struct {
	MatchID  string `json:"match_id"`
	Capacity int    `json:"capacity"`
	EntryFee int    `json:"entry_fee"`
}

type Fixture struct {
	MatchID string `json:"match_id"`
	TeamA   string `json:"team_a"`
	TeamB   string `json:"team_b"`
}

type Squad struct {
	Team    string          `json:"team"`
	Players []PlayerInSquad `json:"players"`
	Id      int             `json:"id"`
}

type PlayerInSquad struct {
	Name string `json:"name"`
	Id   string `json:"id"`
}

func getPlayers(team string) ([]PlayerInSquad, error) {
	// make a get request to squads end point to get players data.
	resp, err := http.Get("http://localhost:8081/squad?team_name=" + team)
	if err != nil {
		return nil, err
	}

	var squad Squad
	err = json.NewDecoder(resp.Body).Decode(&squad)
	if err != nil {
		return nil, err
	}

	return squad.Players, nil
}

func (app *App) CreateLeague(w http.ResponseWriter, r *http.Request) {
	var data CreateLeague
	err := json.NewDecoder(r.Body).Decode(&data)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Generate a unique match_id
	leagueID := generateLeagueID()

	// Create a table name using the match_id
	tableName := "players_" + leagueID

	// Insert players into the newly created table.
	// get team details from fixtures endpoint

	resp, err := http.Get("http://localhost:8081/fixtures?match_id=" + data.MatchID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var fixture Fixture
	err = json.NewDecoder(resp.Body).Decode(&fixture)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// make a get request to fixtures end point to get teams involed.
	// lets say we got teams
	teamA := fixture.TeamA
	teamB := fixture.TeamB

	// use team names and get players data from squads end point.
	teamAplayers, err := getPlayers(teamA)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	teamBplayers, err := getPlayers(teamB)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// for these players get the base price and combined data enter into the table_{}
	players := append(teamAplayers, teamBplayers...)

	playerBasePrices := make([]struct {
		PlayerID  string `json:"player_id"`
		BasePrice int    `json:"base_price"`
	}, len(players))
	for i, player := range players {
		playerBasePrices[i].PlayerID = player.Id
	}

	query := `
		SELECT base_price
		FROM base_price
		WHERE player_id = ?;`

	for i, player := range playerBasePrices {
		var base int

		err = app.DB.Raw(query, player.PlayerID).Scan(&base).Error

		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		playerBasePrices[i].BasePrice = base
	}

	// create a table_{}
	createTableQuery := `create table ` + tableName + ` (
	 	player_id VARCHAR(6) PRIMARY KEY,
		base_price INT,
		cur_price INT,
		last_change VARCHAR(3) CHECK (last_change IN ('pos', 'neg', 'neu'))
	);`

	err = app.DB.Exec(createTableQuery).Error
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	fmt.Println(playerBasePrices)

	for _, player := range playerBasePrices {
		insertQuery := `
		INSERT INTO ` + tableName + ` (player_id, base_price, cur_price, last_change)
		VALUES (?, ?, ?, 'neu')`
		err = app.DB.Exec(insertQuery, player.PlayerID, player.BasePrice, player.BasePrice).Error
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}

	//after inserting players into table_{}, add league entry to leagues table,
	insertLeagueQuery := `
	INSERT INTO leagues (league_id, match_id, capacity, entry_fee)
	VALUES (?, ?, ?, ?)`
	err = app.DB.Exec(insertLeagueQuery, leagueID, data.MatchID, data.Capacity, data.EntryFee).Error
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Create Redis key value pair for the league id and the table name
	// {league_id}_{player_id} is the key and value is the pair of <timestamp, points>

	for _, player := range playerBasePrices {
		key := leagueID + "_" + player.PlayerID
		timestamp := time.Now().Unix()
		value := fmt.Sprintf("%d,%d", timestamp, player.BasePrice)
		err = app.KVStore.RPush(key, value)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}

	w.Write([]byte(tableName))

	w.WriteHeader(http.StatusCreated)
}

func (app *App) GetLeague(w http.ResponseWriter, r *http.Request) {
	matchID := r.URL.Query().Get("match_id")
	if matchID == "" {
		http.Error(w, "match_id is required", http.StatusBadRequest)
		return
	}

	// Create a table name using the match_id
	tableName := "points_" + matchID

	fmt.Println(tableName)

	// Get all players from the table
	var playerDetails []GetPlayerDetails

	query := `
	SELECT p.player_id, p.player_name, p.team, p.profile_pic, pl.cur_price, pl.last_change
	FROM players p
	JOIN ` + tableName + ` pl ON p.player_id = pl.player_id;`

	fmt.Println(query)

	err := app.DB.Raw(query).Scan(&playerDetails).Error
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Return the players
	json.NewEncoder(w).Encode(playerDetails)
}

func (app *App) DeleteLeague(w http.ResponseWriter, r *http.Request) {
	leagueID := r.URL.Query().Get("league_id")
	if leagueID == "" {
		http.Error(w, "league_id is required", http.StatusBadRequest)
		return
	}

	// Get the match_id from the leagues table

	// Delete the league from the leagues table
	err := app.DB.Exec("DELETE FROM leagues WHERE league_id = ?", leagueID).Error
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Delete the table_{match_id} from the database
	err = app.DB.Exec("DROP TABLE " + leagueID).Error
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Write([]byte("League deleted successfully"))
	w.WriteHeader(http.StatusNoContent)
}

func generateLeagueID() string {
	const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
	rand.Seed(uint64(time.Now().UnixNano()))
	b := make([]byte, 8)
	for i := range b {
		b[i] = charset[rand.Intn(len(charset))]
	}
	return string(b)
}