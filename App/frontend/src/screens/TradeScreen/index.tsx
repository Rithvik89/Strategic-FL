import React from 'react';
import { Card, Text, Image, Group, Badge, Button, Avatar } from '@mantine/core';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import CardLayout from '../../components/PlayerCard';
import { useWebSocket } from '../../hooks/useWebSocket';

interface CardProps {
    title: string;
    cur_price: number;
    team : string;
    net_change : boolean, 
    profile_pic: string,
  }

export const TradeScreen: React.FC = () => {
    const cards: CardProps[] = [
        { title: "AM Rahane", cur_price: 4500, team: "CSK", net_change: true, profile_pic: "src/assets/CSK/AM_Rahane.png" },
        { title: "DP Conway", cur_price: 7000, team: "CSK", net_change: true, profile_pic: "src/assets/CSK/DP_Conway.png" },
        { title: "RD Gaikwad", cur_price: 3000, team: "CSK", net_change: true, profile_pic: "src/assets/CSK/RD_Gaikwad.png" },
        { title: "MS Dhoni", cur_price: 8500, team: "CSK", net_change: true, profile_pic: "src/assets/CSK/MS_Dhoni.png" },
        { title: "RA Jadeja", cur_price: 6000, team: "CSK", net_change: true, profile_pic: "src/assets/CSK/RA_Jadeja.png" },
        { title: "MM Ali", cur_price: 5000, team: "CSK", net_change: false, profile_pic: "src/assets/CSK/MM_Ali.png" },
        { title: "S Dube", cur_price: 4000, team: "CSK", net_change: true, profile_pic: "src/assets/CSK/S_Dube.png" },
        { title: "TU Deshpande", cur_price: 3500, team: "CSK", net_change: false, profile_pic: "src/assets/CSK/TU_Deshpande.png" },
        { title: "Akash Singh", cur_price: 8000, team: "CSK", net_change: true, profile_pic: "src/assets/CSK/Akash_Singh.png" },
        { title: "M Pathirana", cur_price: 5500, team: "CSK", net_change: false, profile_pic: "src/assets/CSK/M_Pathirana.png" },
        { title: "M Theekshana", cur_price: 2500, team: "CSK", net_change: false, profile_pic: "src/assets/CSK/M_Theekshana.png" },
        { title: "AD Russell", cur_price: 9000, team: "KKR", net_change: false, profile_pic: "src/assets/KKR/AD_Russell.png" },
        { title: "N Jagadeesan", cur_price: 4000, team: "KKR", net_change: true, profile_pic: "src/assets/KKR/N_Jagadeesan.png" },
        { title: "RK Singh", cur_price: 3500, team: "KKR", net_change: false, profile_pic: "src/assets/KKR/RK_Singh.png" },
        { title: "JJ Roy", cur_price: 7500, team: "KKR", net_change: true, profile_pic: "src/assets/KKR/JJ_Roy.png" },
        { title: "CV Varun", cur_price: 5000, team: "KKR", net_change: false, profile_pic: "src/assets/KKR/CV_Varun.png" },
        { title: "D Wiese", cur_price: 4500, team: "KKR", net_change: true, profile_pic: "src/assets/KKR/D_Wiese.png" },
        { title: "K Khejroliya", cur_price: 3000, team: "KKR", net_change: false, profile_pic: "src/assets/KKR/K_Khejroliya.png" },
        { title: "N Rana", cur_price: 6000, team: "KKR", net_change: true, profile_pic: "src/assets/KKR/N_Rana.png" },
        { title: "SP Narine", cur_price: 7000, team: "KKR", net_change: false, profile_pic: "src/assets/KKR/SP_Narine.png" },
        { title: "Suyash Sharma", cur_price: 3500, team: "KKR", net_change: true, profile_pic: "src/assets/KKR/Suyash_Sharma.png" },
        { title: "VR Iyer", cur_price: 5500, team: "KKR", net_change: true, profile_pic: "src/assets/KKR/VR_Iyer.png" },
        { title: "UT Yadav", cur_price: 4000, team: "KKR", net_change: true, profile_pic: "src/assets/KKR/UT_Yadav.png" }
    ];


    const { isConnected, messages, sendMessage } = useWebSocket({
        url: 'ws://localhost:8080/ws'
      });

      console.log("Messages: ", messages);
    
    
      return (
        <div className="container mx-auto p-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cards.map((card, index) => (
                <CardLayout key={index} {...card} />
            ))}
          </div>
        </div>
      );
}