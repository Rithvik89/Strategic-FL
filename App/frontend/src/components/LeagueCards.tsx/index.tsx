import React from 'react';
import { Card, Text, Image, Group, Badge, Button, Avatar } from '@mantine/core';
import { FaArrowTrendUp, FaArrowTrendDown,  } from "react-icons/fa6";
import { PiHourglassLow } from "react-icons/pi";

export interface LeagueCardsProps {
    league_id: string;
    match_id: string;
    entry_fee: number;
    league_status: string;
    capacity: number;
    team_a: string;
    team_b: string;
    registered: number;
    users_registered: string;
    is_registered: boolean;
}

export const handleLeagues = (leagues: LeagueCardsProps) => {
    console.log("League Id :", leagues.league_id);
    console.log("Match Id :", leagues.match_id);

    window.location.href = `/trade?leagueId=${leagues.league_id}`;
};


export const handleRegister = (leagues: LeagueCardsProps) => {

    const token = localStorage.getItem('token');

    fetch(`http://localhost:8080/register?league_id=${leagues.league_id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ league_id: leagues.league_id }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        window.location.href = '/leagues';
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

export const LeagueCards: React.FC<LeagueCardsProps> = ({league_id,entry_fee,league_status,capacity,team_a,team_b,registered, users_registered,match_id, is_registered}) => {
    
    if (!league_id) {
        console.error("league_id is undefined");
    } else {
        console.log("league_id:", league_id);
    }
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder onClick={is_registered ? () => handleLeagues({league_id, entry_fee, league_status, capacity, team_a, team_b, registered, users_registered, match_id, is_registered}) : undefined} style={{ margin: '20px' }}>
            <Text>League Id : {league_id}</Text>
            <Group justify="space-between" mt="md" mb="xs">
            {/* <Avatar alt="it's me" size="lg" /> */}
            
            <Text fw={500}>{team_a} vs {team_b}</Text>
            <Badge color="pink">{league_status}</Badge>
            </Group>

            <Group align="apart" mt="md">
            <Button variant="light" color="blue" disabled={is_registered} onClick={() => handleRegister({league_id, entry_fee, league_status, capacity, team_a, team_b, registered, users_registered, match_id, is_registered})}>
            {is_registered ? 'Registered' : 'Register'}
            </Button>

            <Text size="sm" style={{ textAlign: 'right', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '100%', marginLeft: 'auto' }}>
            <strong>Entry Fee: {entry_fee}</strong>
            </Text>

            <Text size="sm" style={{ textAlign: 'right', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '100%' }}>
            <strong>Registered: {registered}/{capacity}</strong>
            </Text>
            </Group>
        </Card>
    );
}