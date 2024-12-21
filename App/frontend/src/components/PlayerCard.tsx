// src/components/CardLayout.tsx
import React from 'react';
import { Card, Text, Image, Group, Badge, Button, Avatar } from '@mantine/core';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

interface CardProps {
  title: string;
  cur_price: number;
  team : string;
  net_change : boolean,
  profile_pic: string,
}

export const CardLayout: React.FC<CardProps> = ({ title, cur_price, team, net_change,profile_pic}) => {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="space-between" mt="md" mb="xs">
                <Avatar src={profile_pic} alt="it's me" size="lg" />
                
                <Text fw={500}>{title}</Text>
                <Badge color="pink">{team}</Badge>
            </Group>

            <Text size="sm" style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <strong>{cur_price}</strong>
                {
                    net_change ? (
                        <FaArrowUp style={{ color: 'green' }} />
                    ) : (
                        <FaArrowDown style={{ color: 'red' }} />
                    )
                }
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