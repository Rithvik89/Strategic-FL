import { Table, Text } from "@mantine/core";
import { LeaderBoard, LeaderBoardProps, LeaderBoardPropsList } from "./LeaderBoard";



const users: LeaderBoardProps[] = [
  { UserName: 'Alice', Points: 120 },
  { UserName: 'Bob', Points: 95 },
  { UserName: 'Charlie', Points: 110 },
  { UserName: 'David', Points: 85 },
  { UserName: 'Eve', Points: 130 },
  { UserName: 'Frank', Points: 75 },
  { UserName: 'Grace', Points: 105 },
  { UserName: 'Heidi', Points: 90 },
  { UserName: 'Ivan', Points: 100 },
  { UserName: 'Judy', Points: 115 },
  { UserName: 'Karl', Points: 80 },
  { UserName: 'Laura', Points: 125 },
  { UserName: 'Mallory', Points: 70 },
  { UserName: 'Niaj', Points: 135 },
  { UserName: 'Olivia', Points: 65 },
  { UserName: 'Peggy', Points: 140 },
  { UserName: 'Quentin', Points: 60 },
  { UserName: 'Rupert', Points: 145 },
  { UserName: 'Sybil', Points: 55 },
  { UserName: 'Trent', Points: 150 },
];

export const LeftFooter: React.FC = () => {
   return (
    <div className="container p-4 mr-6" style={{}} >
      
      <LeaderBoard LeaderBoard={users}/>
    </div>
   )
}