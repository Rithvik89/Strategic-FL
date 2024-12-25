-- Create playters table
-- load all these players data even before tournment
-- so that we can assign base_prices as well in prior.
-- As we only open the league to users after toss, we just fetch the squad from the 
-- api and add them to players and base price and recreate the leagues (RARE case)...
CREATE TABLE IF NOT EXISTS players (
    player_id VARCHAR(6) PRIMARY KEY,
    player_name VARCHAR(255),
    team VARCHAR(255)
);


-- assign base price for all the players manually...
-- This has to be done even before the match.
Create Table base_price (
    player_id VARCHAR(6) PRIMARY KEY,
    base_price INT,
    FOREIGN KEY (player_id) REFERENCES players(player_id)
);


-- both the above tables are to be created before the tournment.



-- Create Leagues table  -> (league details)
-- Add Leagues here once a post request is made with the required team_ids, entry_fee, capacity, match_id.
-- users_registered is a comma separated user_ids...
CREATE TABLE leagues (
    league_id VARCHAR(100) PRIMARY KEY,
    match_id VARCHAR(50),
    entry_fee INT,
    capacity INT,
    registered INT DEFAULT 0,
    users_registered TEXT,
    league_status VARCHAR(15) DEFAULT 'not started' CHECK (league_status IN ('active', 'completed', 'not started'))
);

-- once this table is create we also create a points_{} table to track the cur_price.
-- so here we call squads api once to get the player id's belonging to those teams and get their respective base prices.


-- Create points table with league_id (Not to be created)
-- TODO: Add a foriegn key player_id to players table.
CREATE TABLE points_{league_name} (
    player_id SERIAL PRIMARY KEY,
    base_price INT,
    cur_price INT,
    last_change VARCHAR(3) CHECK (last_change IN ('pos', 'neg', 'neu')),
);



-- Create Users table 
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(50),
    mail_id VARCHAR(100),
    profile_pic VARCHAR(100)
);

