// src/components/CardLayout.tsx
import React, { useState } from 'react';
import { Card, Text, Image, Group, Badge, Button, Avatar, Modal } from '@mantine/core';
import { FaArrowTrendUp, FaArrowTrendDown,  } from "react-icons/fa6";
import { PiHourglassLow } from "react-icons/pi";
import { VscGraphLine } from "react-icons/vsc";
import { NumberInput } from '@mantine/core';

interface CardProps {
    player_id: string;
    player_name: string;
    team : string;
    profile_pic: string;
    cur_price: number;
    last_change: string;
    shares: number;
  }

const handleGraphClick = (player_id: string, league_id: string) => {
    console.log(`Graph clicked for player: ${player_id}`);
    console.log(`Graph clicked for league: ${league_id}`);

    window.location.href = `/trade/graph?player_id=${player_id}&league_id=${league_id}`;
    // Add your logic here to handle the graph click event
};

const handleSellShares = (player_id: string, league_id: string, shares: number) => {
    console.log(`Sell shares clicked for player: ${player_id}`);
    
    const token = localStorage.getItem('token');

    fetch(`http://localhost:8080/trade/transaction?league_id=${league_id}&player_id=${player_id}&transaction_type=sell`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ shares })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
       
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    // Reload the page to update the shares
    // I think this becomed heavy every time doing, change this complete reload to a better way
    window.location.reload();

    // Add your logic here to handle the sell shares click event
}

const handleBuyShares = (player_id: string, league_id: string, shares:number) => {
    console.log(`Buy shares clicked for player: ${player_id}`);
    // Add your logic here to handle the buy shares click event
    const token = localStorage.getItem('token');
    fetch(`http://localhost:8080/trade/transaction?league_id=${league_id}&player_id=${player_id}&transaction_type=buy`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ shares })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
       
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    // Reload the page to update the shares
    // I think this becomed heavy every time doing, change this complete reload to a better way
    window.location.reload();
}


export const CardLayout: React.FC<CardProps> = ({ player_id, player_name, cur_price, team, last_change,profile_pic,shares}) => {
    const [opened, setOpened] = useState(false);
   

    const [transactShares, setTransactShares] = useState<number | undefined>(undefined);
   
   
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <VscGraphLine onClick={()=> handleGraphClick(player_id,"UEH4f9Xb")}/>
            <Group justify="space-between" mt="md" mb="xs">
                <Avatar src={`src/assets/${profile_pic}`} alt="it's me" size="lg" />
                
                <Text fw={500}>{player_name}</Text>
                <Badge color="pink">{team}</Badge>
            </Group>

            <Text size="sm" style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <strong>{cur_price}</strong>
                <div style={{marginLeft : '5px'}}>
                {
                    last_change === "pos" ? (
                        <FaArrowTrendUp style={{ color: 'green' }} />
                    ) : last_change === "neg" ? (
                        <FaArrowTrendDown style={{ color: 'red' }} />
                    ) : (
                        <PiHourglassLow style={{ color: 'black' }} />
                    )
                }
                </div>
                <Text style={{ marginLeft: '20px' }}>{shares} shares</Text>
            </Text>
            <div style={{display: "flex"}}>
            <Button fullWidth mt="md" radius="md" onClick={() => setOpened(true)}>
                Trade
            </Button>
            <Modal opened={opened} onClose={() => setOpened(false)} title="Buy or Sell">
                <Text>Do you want to Buy or Sell your items?</Text>


                <NumberInput
                    value={shares}
                    onChange={(value) => setTransactShares(typeof value === 'number' ? value : undefined)}
                    placeholder="Enter number of shares"
                    style={{ padding: '10px' }}
                />
                <Group justify="space-between" mt="md">
                    <Button onClick={() => { handleBuyShares(player_id,"1XNblEnb",transactShares as number) }}>Buy</Button>
                    <Button onClick={() => { handleSellShares(player_id,"1XNblEnb",transactShares as number) }}>Sell</Button>
                </Group>
            </Modal>
           
            
            </div>
        </Card>
    );
};

export default CardLayout;