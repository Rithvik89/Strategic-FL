import { useLocation } from 'react-router-dom';
import { Badge, Card,Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';


interface Players {
    player_id: string;
    player_name: string;
    shares: number;
    cur_price: number;
    team_name: string;
}

interface Share {
    balance: number;
    players: Players[];
}


export const PortfolioScreen: React.FC = () => {
    
    const [userShares, setUserShares] = useState<Share>();

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const leagueId = searchParams.get('leagueId');

    useEffect(() => {
        const fetchPortfolio = async () => {
            try {
                const response = await fetch(`http://localhost:8080/portfolio?league_id=${leagueId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.ok) {
                    const data: Share = await response.json();
                    setUserShares(data);
                } else {
                    console.error('Failed to fetch portfolio');
                }
            } catch (error) {
                console.error('Error fetching portfolio:', error);
            }
        };

        fetchPortfolio();
    }, []);
    
	return (
        <div>
            <div style={{ textAlign: 'center' }}>
                <Text>Portfolio</Text>
            </div>
            {userShares ? (
                <div>
                    <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                        <Text>Balance: {userShares.balance}</Text>
                    </div>
                    <div>
                        {userShares.players.map(player => (
                            <Card key={player.player_id} shadow="sm" padding="lg" style={{ marginBottom: '1rem' }}>
                                
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Times New Roman, Times, serif' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                        <Badge>{player.team_name}</Badge>
                                        <Text>{player.player_name}</Text>
                                    </div>
                                    <div>
                                        <Text>Shares: {player.shares}</Text>
                                        <Text>Current Price: {player.cur_price}</Text>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
	);
}