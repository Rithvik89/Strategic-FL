package main

import (
	"encoding/json"
	"fmt"
	"os"
	"time"

	"golang.org/x/exp/rand"
)

type BallPicker struct {
	SummaryFile string `json:"summary_file"`
	Offset      int    `json:"offset"`
	MaxDelay    int    `json:"max_delay"`
	FantasyCalc *FantasyCalc
}

type BallData struct {
	BallNo       int    `json:"ballNo"`
	MatchID      string `json:"matchId"`
	Innings      string `json:"innings"`
	Over         string `json:"over"`
	Ball         string `json:"ball"`
	Batter       string `json:"batter"`
	NonStriker   string `json:"nonStriker"`
	Bowler       string `json:"bowler"`
	BatterRuns   string `json:"batterRuns"`
	ExtraRuns    string `json:"extraRuns"`
	RunsFromBall string `json:"runsFromBall"`
	Wicket       string `json:"wicket"`
	Method       string `json:"method"`
	PlayerOut    string `json:"playerOut"`
	CaughtBy     string `json:"caughtBy"`
}

func (bp *BallPicker) NewBallPicker() *BallPicker {
	return &BallPicker{
		SummaryFile: "ball_by_ball_ipl.json",
		Offset:      1,
		MaxDelay:    20,
		FantasyCalc: (&FantasyCalc{}).NewFantasyCalc(),
	}
}

func (bp *BallPicker) StartMatch() {
	// Load balls from file
	balls, err := loadBallsIntoMap(bp.SummaryFile)
	if err != nil {
		fmt.Println(err)
		return
	}

	// Loop through balls
	for i := bp.Offset; i <= len(balls); i++ {
		// rand Sleep
		time.Sleep(time.Duration(rand.Intn(bp.MaxDelay)) * time.Second)
		// Get ball data
		ball, ok := balls[i]
		if !ok {
			fmt.Printf("Ball %d not found\n", i)
			continue
		}
		// Print ball data
		fmt.Printf("Ball %d: %s to %s, %s runs\n", ball.BallNo, ball.Bowler, ball.Batter, ball.RunsFromBall)

		players := bp.FantasyCalc.CalculatePoints(&ball)
		fmt.Println(players)
		respCode := PostRequest("http://localhost:8080/points", players)
		fmt.Printf("Response code: %d\n", respCode)

		//TODO: Handler Error

	}
}

func loadBallsIntoMap(filename string) (map[int]BallData, error) {
	// Read JSON file
	data, err := os.ReadFile(filename)
	if err != nil {
		return nil, fmt.Errorf("error reading file: %v", err)
	}

	// Parse JSON array
	var balls []BallData
	if err := json.Unmarshal(data, &balls); err != nil {
		return nil, fmt.Errorf("error parsing JSON: %v", err)
	}

	// Create map with ball number as key
	ballMap := make(map[int]BallData)
	for _, ball := range balls {
		ballMap[ball.BallNo] = ball
	}

	return ballMap, nil
}
