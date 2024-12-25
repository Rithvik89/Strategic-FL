package main

import (
	KVStore "backend/pkg"
	"net/http"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func (app *App) initDB() (*gorm.DB, error) {
	dsn := "host=localhost user=postgres password=postgres dbname=db port=5432 sslmode=disable"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil, err
	}

	return db, nil
}

func (app *App) initKVStore() {
	// initialize redis
	app.KVStore = KVStore.NewRedis("localhost:6379", "", 0)
}

func (app *App) initHandlers() {
	app.R.Get("/ws", app.handleWebSocket)
	app.R.Post("/points", app.PushPoints)
	app.R.Post("/createLeague", app.CreateLeague)
	app.R.Get("/players", app.GetLeague)
	app.R.Delete("/deleteLeague", app.DeleteLeague)
	app.R.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Hello World"))
	})
}
