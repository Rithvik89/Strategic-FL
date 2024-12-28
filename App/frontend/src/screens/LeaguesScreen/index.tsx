import { Button, Card } from "@mantine/core"
import { LeagueCards, LeagueCardsProps } from "../../components/LeagueCards.tsx";
import { useEffect, useState } from "react";
import axios from "axios";





export const LeaguesScreen = () => {

    const [leagues, setLeagues] = useState<LeagueCardsProps[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeagues = async () => {
            try {
                console.log("Fetching leagues...");
                const token = localStorage.getItem('token');
                console.log("Token:", token);
                const response = await axios.get('http://localhost:8080/getLeagues', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setLeagues(response.data as LeagueCardsProps[]);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching leagues:", error);
                setLoading(false);
            }
        };

        fetchLeagues();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    console.log("Leagues:", leagues);
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder style={{ width: '100%' }}>
            <div className="container p-4 flex justify-center" style={{  }}>
                <Button onClick={() => window.location.href = "/leagues/create"}>Create a League</Button>
            </div>
            {leagues.length === 0 
            ? <h1>No leagues found</h1>
            : 
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {leagues.map((league) => (
                    <LeagueCards 
                        key={league.league_id}
                        league_id={league.league_id}
                        entry_fee={league.entry_fee}
                        league_status={league.league_status}
                        capacity={league.capacity}
                        team_a={league.team_a}
                        team_b={league.team_b}
                        registered={league.registered}
                        users_registered={league.users_registered}
                        match_id={league.match_id}
                    />
                ))}
            </div>
            }
        </Card>
    );
} 