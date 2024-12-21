package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"sync"

	"github.com/go-chi/chi/v5"
	"github.com/gorilla/websocket"
	"github.com/rs/cors"
	"gorm.io/gorm"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

type App struct {
	DB       *gorm.DB
	R        *chi.Mux
	Clients  []*websocket.Conn
	ClientsM sync.Mutex
}

// TODO: Assuming we are only having 1 match pool for now
// We can also avoid lock i guess
func (app *App) handleWebSocket(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		http.Error(w, "Could not open websocket connection", http.StatusBadRequest)
		return
	}
	defer conn.Close()

	app.ClientsM.Lock()
	app.Clients = append(app.Clients, conn)
	app.ClientsM.Unlock()

	defer func() {
		app.ClientsM.Lock()
		for i, c := range app.Clients {
			if c == conn {
				app.Clients = append(app.Clients[:i], app.Clients[i+1:]...)
				break
			}
		}
		app.ClientsM.Unlock()
	}()

	for {
		_, _, err := conn.ReadMessage()
		if err != nil {
			break
		}
	}
}

func (app *App) GetPoints(w http.ResponseWriter, r *http.Request) {
	var players map[string]int
	// parse the request body.
	data, err := ioutil.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Could not read request body", http.StatusBadRequest)
		return
	}
	err = json.Unmarshal(data, &players)
	if err != nil {
		http.Error(w, "Could not parse request body", http.StatusBadRequest)
		return
	}

	fmt.Println(players)

	app.ClientsM.Lock()
	for _, client := range app.Clients {
		err := client.WriteMessage(websocket.TextMessage, data)
		if err != nil {
			client.Close()
		}
	}
	app.ClientsM.Unlock()

	w.Write([]byte("Points received"))
}

func main() {

	app := &App{}

	db, err := app.initDB()
	if err != nil {
		panic(err)
	}

	r := chi.NewRouter()
	// CORS middleware configuration
	r.Use(cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173"}, // Your frontend URL
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300, // Maximum value not ignored by any of major browsers
	}).Handler)

	app.DB = db
	app.R = r

	app.initHandlers()

	if err := http.ListenAndServe(":8080", r); err != nil {
		panic(err)
	}

}