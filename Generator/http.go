package main

import (
	"bytes"
	"encoding/json"
	"net/http"
)

func PostRequest(url string, data interface{}) int {
	jsonData, err := json.Marshal(data)
	if err != nil {
		panic(err)
	}
	// POST request
	resp, err := http.Post(url, "application/json", bytes.NewBuffer(jsonData))
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()
	return resp.StatusCode
}
