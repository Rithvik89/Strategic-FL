package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"sync"

	"github.com/go-chi/chi/v5"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

type App struct {
	r        *chi.Mux
	clients  []*websocket.Conn
	clientsM sync.Mutex
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

	app.clientsM.Lock()
	app.clients = append(app.clients, conn)
	app.clientsM.Unlock()

	defer func() {
		app.clientsM.Lock()
		for i, c := range app.clients {
			if c == conn {
				app.clients = append(app.clients[:i], app.clients[i+1:]...)
				break
			}
		}
		app.clientsM.Unlock()
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

	app.clientsM.Lock()
	for _, client := range app.clients {
		err := client.WriteMessage(websocket.TextMessage, data)
		if err != nil {
			client.Close()
		}
	}
	app.clientsM.Unlock()

	w.Write([]byte("Points received"))
}

func main() {

	r := chi.NewRouter()
	app := &App{
		r: r,
	}

	app.r = r

	app.r.Post("/points", app.GetPoints)

	app.r.Get("/ws", app.handleWebSocket)

	app.r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Hello World"))
	})

	if err := http.ListenAndServe(":8080", r); err != nil {
		panic(err)
	}

}
