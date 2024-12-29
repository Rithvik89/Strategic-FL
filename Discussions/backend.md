1. When a league for a match is created a table in the name of points_matchId is to be created.
2. As of now lets say there is an endpoint which helps us to create this league, and returns new table name. Lets we provide the match_id.
3. Also Add players and their price after the table has been created.


4. So here i wanted to create portfolio per match 
     http://localhost:8080/buy?player_id=3&league_id=j5ldtvgk
     http://localhost:8080/sell?player_id=3&league_id=j5ldtvgk 


    So Every player in a contest there should be a table created trade_{league_id}
    These trade tables can be deleted after the league is completed
    So there will be a cron job running that cleans up all these tables (Once match is completed).

    
    Max size of this table can be: 30*pool_size .
    schema for trade_{league_id}

    {user_id,player_id} Composite primary key;
    shares int





    so if there is a purchase of a 




