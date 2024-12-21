VOLUME_PATH=/Users/rithvik/Documents/Strategic\ Fantasy\ League/App/backend/volumes


start_db:
	docker run --name db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres \
	-v $(VOLUME_PATH):/var/lib/postgresql/data \
	-p 5432:5432 \
	-d postgres

stop_db:
	docker stop db
	docker rm db

restart_db: stop_db start_db

