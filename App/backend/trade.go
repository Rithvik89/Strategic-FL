package main

import (
	"encoding/json"
	"net/http"
	"time"
)

type TransactionDetails struct {
	Shares int `json:"shares"`
	Price  int `json:"price"`
}

//TODO: Combine buy and sell into a single API with transaction type as a parameter

func (app *App) BuyPlayers(w http.ResponseWriter, r *http.Request) {
	playerId := r.URL.Query().Get("player_id")
	if playerId == "" {
		http.Error(w, "player_id is required", http.StatusBadRequest)
		return
	}
	leagueId := r.URL.Query().Get("league_id")
	if leagueId == "" {
		http.Error(w, "league_id is required", http.StatusBadRequest)
		return
	}
	//TODO: This we generally get from the session
	userId := r.URL.Query().Get("user_id")
	if userId == "" {
		http.Error(w, "user_id is required", http.StatusBadRequest)
		return
	}

	// extract the body of the request
	var transactionDetails TransactionDetails
	err := json.NewDecoder(r.Body).Decode(&transactionDetails)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	var balance int
	// Check the user's balance from the purse table
	err = app.DB.Raw("SELECT balance FROM purse WHERE user_id = ? AND league_id = ?", userId, leagueId).Scan(&balance).Error
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Calculate the total cost
	totalCost := transactionDetails.Shares * transactionDetails.Price

	// Check if the user has enough balance
	if balance < totalCost {
		http.Error(w, "insufficient balance", http.StatusBadRequest)
		return
	}

	// Create an entry in transactions table
	err = app.DB.Exec("INSERT INTO transactions (user_id, player_id, league_id, shares, price, transaction_type, transaction_time) VALUES (?, ?, ?, ?, ?, 'buy', ?)", userId, playerId, leagueId, transactionDetails.Shares, transactionDetails.Price, time.Now()).Error
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Update the user's balance
	err = app.DB.Exec("UPDATE users SET balance = balance - ? WHERE user_id = ?", totalCost, userId).Error
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Update the portfolio table
	// If the player is already present in the portfolio, update the shares and average price
	// If the player is not present, insert a new row
	err = app.DB.Exec("INSERT INTO portfolio (user_id, player_id, league_id, shares) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE shares = shares + ?", userId, playerId, leagueId, transactionDetails.Shares, transactionDetails.Shares).Error
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Add this purchase to redis queue : so there is a record of all the transactions
	// There should be a process monitoring this queue and updating the player's price in the player table
	key := "trasactions_" + leagueId + "_" + playerId
	app.KVStore.INCR(key)

}
