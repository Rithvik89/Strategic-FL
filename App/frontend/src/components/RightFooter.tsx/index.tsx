import React from 'react';
import { MiniPortfolio } from './MiniPortfolio';
import {ScoreCard, ScoreCardProps} from './ScoreCard';
import { MiniPortfolioProps } from './MiniPortfolio';


const scoreCardData: ScoreCardProps = {
    TeamA: "CSK",
    TeamB: "KKR",
    Innings: "First",
    BatFirstTeam: "Team A",
    BatSecondTeam: "Team B",
    TeamAScore: 250,
    TeamBScore: 200,
    TeamAWickets: 5,
    TeamBWickets: 8,
    TeamAOvers: "50.0",
    TeamBOvers: "45.5",
    Target: 251,
    CRR: 5.0,
    RRR: 6.0
};

const portfolio:MiniPortfolioProps = {
    remaining_purse: 1000,
    returns: 11150,
};

const RightFooter: React.FC = () => {
    return (
        <div className="container p-4 mr-6" style={{ width: '100%'}}>
            <div className="mb-4">
            <MiniPortfolio remaining_purse={portfolio.remaining_purse} returns={portfolio.returns} />
            </div>
            <div className="mu-4">
            <ScoreCard 
                TeamA={scoreCardData.TeamA} 
                TeamB={scoreCardData.TeamB} 
                Innings={scoreCardData.Innings} 
                BatFirstTeam={scoreCardData.BatFirstTeam} 
                BatSecondTeam={scoreCardData.BatSecondTeam} 
                TeamAScore={scoreCardData.TeamAScore} 
                TeamBScore={scoreCardData.TeamBScore} 
                TeamAWickets={scoreCardData.TeamAWickets} 
                TeamBWickets={scoreCardData.TeamBWickets} 
                TeamAOvers={scoreCardData.TeamAOvers} 
                TeamBOvers={scoreCardData.TeamBOvers} 
                Target={scoreCardData.Target} 
                CRR={scoreCardData.CRR} 
                RRR={scoreCardData.RRR} 
            />
            </div>
        </div>
    );
};

export default RightFooter;