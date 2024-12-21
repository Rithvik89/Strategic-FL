CREATE TABLE IF NOT EXISTS players (
    playerID SERIAL PRIMARY KEY,
    playername VARCHAR(255),
    team VARCHAR(255),
    year VARCHAR(4),
    league VARCHAR(255),
    profile_pic VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS points (
    pointID SERIAL PRIMARY KEY,
    player_id SERIAL,
    cur_points INT,
    last_change VARCHAR(3) CHECK (last_change IN ('pos', 'neg', 'neu')),
    FOREIGN KEY (player_id) REFERENCES players(playerID)
);