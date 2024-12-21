import { Card, Table, Text } from "@mantine/core";


export interface LeaderBoardProps {
    UserName : string;
    Points : number;
}

export interface LeaderBoardPropsList {
    LeaderBoard: LeaderBoardProps[];
}

export const LeaderBoard: React.FC<LeaderBoardPropsList> = ({...LeaderBoard}) => {
    const header = (
        <Table.Tr>
          <Table.Th>Rank</Table.Th>
          <Table.Th>User</Table.Th>
          <Table.Th>Points</Table.Th>
        </Table.Tr>
      );
    return (
    <Card shadow="sm" padding="lg" radius="md" withBorder style={{}}>
        <Text size="xl" style={{ textAlign: 'center', marginBottom : '10px'}}>Leaderboard</Text>
        <Table  withColumnBorders>
            <Table.Thead>{header}</Table.Thead>
            <Table.Tbody>
                {LeaderBoard.LeaderBoard.map((user, index) => (
                    <Table.Tr key={index}>
                        <Table.Td>{index + 1}</Table.Td>
                        <Table.Td>{user.UserName}</Table.Td>
                        <Table.Td>{user.Points}</Table.Td>
                    </Table.Tr>
                ))}
            </Table.Tbody>
        </Table>
    </Card>
    )
}