import React from 'react';
import { MantineProvider, Container, Title, Card } from '@mantine/core';
import { Graph } from './components/Graph';
import { CardLayout } from './components/PlayerCard';
import { TradeScreen } from './screens/TradeScreen';
import RightFooter from './components/RightFooter.tsx';
import { LeftFooter } from './components/LeftFooter.tsx';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { LeaguesScreen } from './screens/LeaguesScreen';
import { CreateLeague } from './screens/CreateLeague';
import UserProfile from './screens/UserProfile';
import Header from './components/Header';
import MobileHeader from './components/MobileHeader';
import LoginScreen from './screens/LoginScreen';
import { MantineGraph } from './components/MantineGraph';
import { PortfolioScreen } from './screens/PortfolioScreen';


// Sample data for the player's performance

      

      const App: React.FC = () => {
        return (
          <MantineProvider>
              <Router>
                <div className="desktop-only">
              <Header />
                </div>
              <div className="mobile-only">
              <MobileHeader />
              </div>
              <div style={{
              display: 'flex',
              flexDirection: 'row',
              height: '100vh',
              width: '100%',
              backgroundColor: '#f0f0f0',
              }}>
              {/* <div className="desktop-only">
                <div style={{ marginLeft: '15px' }}>
                    <LeftFooter />
                  </div>
                    <div style={{ position: 'absolute', right: '0', marginRight: '15px' }}>
                    <RightFooter />
                    </div>
              </div> */}
                

              <Routes>
                <Route
                path="/profile"
                element={
                  <div className="center-container">
                    <UserProfile />
                    {/* Hello Worl This is Rithvik coming again... */}
                  </div>
                }
                />
                <Route
                path="/trade"
                element={
                  <div className="center-container">
                  <TradeScreen />
                  </div>
                }
                />
                <Route
                path="/trade/graph"
                element={
                  <div className="center-container">
                  <MantineGraph />
                  </div>
                }
                />
                <Route
                path="/leagues"
                element={
                  <div className="center-container">
                    <LeaguesScreen />
                  </div>
                }
              />
              <Route
                path="/portfolio"
                element={
                  <div className="center-container">
                    <PortfolioScreen />
                  </div>
                }
              />
            <Route
              path="/leagues/create"
              element={
                <div className="center-container">
                  <CreateLeague />
                </div>
              }
            />
                <Route path="/" element={
                <div className="center-container" >
                  <h1 style={{ textAlign: 'center', marginBottom: '20px'}}>Welcome to the Strategic Cricket App</h1>
                  <LoginScreen />
                </div>
                } />
              </Routes>

         
              </div>
              </Router>
          </MantineProvider>
        );
      };

export default App;
