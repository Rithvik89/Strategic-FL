package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/google/uuid"
)

type players struct {
	PlayerID  string  `json:"player_id"`
	BasePrice float64 `json:"base_price"`
}

type PlayerDetails struct {
	PlayerID   string `json:"player_id"`
	PlayerName string `json:"player_name"`
	Team       string `json:"team"`
	ProfilePic string `json:"profile_pic"`
	CurPrice   int    `json:"cur_price"`
	LastChange string `json:"last_change"`
}

func (app *App) CreateLeague(w http.ResponseWriter, r *http.Request) {
	var players []players
	err := json.NewDecoder(r.Body).Decode(&players)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Generate a unique match_id
	matchID := generateMatchID()

	// Create a table name using the match_id
	tableName := "players_" + matchID

	// Create table sql dynamically
	createTableQuery := `
	CREATE TABLE ` + tableName + ` (
		player_id VARCHAR(255) PRIMARY KEY,
		base_price INT,
		cur_points INT,
    	last_change VARCHAR(3) CHECK (last_change IN ('pos', 'neg', 'neu')),
    	FOREIGN KEY (player_id) REFERENCES players(playerid)
	)`
	// Creaate table
	err = app.DB.Exec(createTableQuery).Error
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Insert players into the newly created table.
	for _, player := range players {
		insertQuery := `
		INSERT INTO ` + tableName + ` (player_id, base_price, cur_points, last_change)
		VALUES (?, ?, 0, 'neu')`
		err = app.DB.Exec(insertQuery, player.PlayerID, player.BasePrice).Error
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Write([]byte(matchID))
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
	var playerDetails []PlayerDetails

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

func generateMatchID() string {
	return uuid.New().String()
}
