import React from 'react';
import { MantineProvider, Container, Title, Card } from '@mantine/core';
import { Graph } from './components/Graph';
import { CardLayout } from './components/PlayerCard';
import { TradeScreen } from './screens/TradeScreen';

// Sample data for the player's performance

const App: React.FC = () => {
  return (
    <MantineProvider >

      <div style={{
          display: 'flex',
          justifyContent: 'center', // Centers horizontally
          alignItems: 'center',      // Centers vertically
          height: '100vh', 
          width:'100vw',          // Full viewport height
          backgroundColor: '#f0f0f0', // Optional: Adds a background color
        }}>

        <TradeScreen/> 
          
       {/* <Graph/> */}

      </div>
       
   

     
    </MantineProvider>
  );
};

export default App;
