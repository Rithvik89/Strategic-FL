import React, { useEffect, useState } from 'react';
import { Card, Text, Image, Group, Badge, Button, Avatar } from '@mantine/core';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import axios from 'axios';
import CardLayout from '../../components/PlayerCard';
import { useWebSocket } from '../../hooks/useWebSocket';

interface CardProps {
    player_id: string;
    player_name: string;
    team : string;
    profile_pic: string,
    cur_price: number;
    last_change: string;
  }

export const TradeScreen: React.FC = () => {

    const [cards, setCards] = useState<CardProps[]>([]);

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await fetch('http://localhost:8080/players?match_id=1359507');
                const data: CardProps[] = await response.json();
                const players = data.map((player: CardProps) => ({
                    ...player,
                    cur_price: parseFloat(player.cur_price.toFixed(2)),
                }));
                setCards(players);
            } catch (error) {
                console.error('Error fetching players:', error);
            }
        };

        fetchPlayers();
    }, []);

    const { isConnected, messages, sendMessage } = useWebSocket({
        url: 'ws://localhost:8080/ws'
      });

      console.log('messages:', messages);

    useEffect(() => {
        console.log("In useEffect");
        if (messages.length > 0) {
            const updatedPlayers = cards.map((player) => {
                const message = messages[0][player.player_name];
                if (message) {
                    // new price
                    console.log("newPrice" ,message)
                    const lastPrice = player.cur_price;
                    const curPrice = message
                    // pos or neg
                    const lastChange = player.last_change;
                    const change = curPrice > 0 ? 'pos' : curPrice < 0 ? 'neg' : lastChange;
                    return {
                        ...player,
                        cur_price: lastPrice + (message),
                        last_change: change,
                    };
                }
                return player;
            });
            console.log('updatedPlayers:', updatedPlayers);
            setCards(updatedPlayers);
        }
    }, [messages]);
    
    
      return (
        <div className="container p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cards.map((card, index) => (
            <CardLayout key={index} {...card} />
            ))}
          </div>
        </div>
      );
}