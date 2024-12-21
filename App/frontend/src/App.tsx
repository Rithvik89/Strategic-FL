import React from 'react';
import { MantineProvider, Container, Title, Card } from '@mantine/core';
import { Graph } from './components/Graph';
import { CardLayout } from './components/PlayerCard';
import { TradeScreen } from './screens/TradeScreen';
import RightFooter from './components/RightFooter.tsx';
import { LeftFooter } from './components/LeftFooter.tsx';


// Sample data for the player's performance

const App: React.FC = () => {
  return (
    <MantineProvider >

      <div style={{
          display: 'flex',
          flexDirection: 'row',
          // justifyContent: 'center', // Centers horizontally
          // alignItems: 'center', // Centers vertically
          height: '100vh', 
          width:'100%',          // Full viewport height
          backgroundColor: '#f0f0f0', // Optional: Adds a background color
          marginTop: '60px', // Fix margin top to 25px
        }}>

    <div className="desktop-only" style={{ marginLeft: '15px'}}>
          <RightFooter />
        </div>

        <TradeScreen /> 
        <div className="desktop-only" style={{ marginLeft: '15px'}}>
          <LeftFooter />
          </div>
        

      </div>
       
   

     
    </MantineProvider>
  );
};

export default App;
