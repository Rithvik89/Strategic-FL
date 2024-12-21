// src/components/CardLayout.tsx
import React from 'react';
import { Card, Text, Image, Group, Badge, Button, Avatar } from '@mantine/core';
import { FaArrowTrendUp, FaArrowTrendDown,  } from "react-icons/fa6";
import { PiHourglassLow } from "react-icons/pi";

interface CardProps {
    player_id: string;
    player_name: string;
    team : string;
    profile_pic: string,
    cur_price: number;
    last_change: string;
  }

export const CardLayout: React.FC<CardProps> = ({ player_name, cur_price, team, last_change,profile_pic}) => {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
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
            </Text>
            {/* <div style={{display: "flex"}}>
            <Button color="green" fullWidth mt="md" radius="md">
                BUY
            </Button>
            <Button color="red" fullWidth mt="md" radius="md">
                SELL
            </Button>
            </div> */}
        </Card>
    );
};

export default CardLayout;