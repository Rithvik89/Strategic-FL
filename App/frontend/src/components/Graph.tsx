import { MantineProvider, Container, Title, Card } from '@mantine/core';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


const playerData = [
    { match: 'Match 1', value: 120 },
    { match: 'Match 2', value: 150 },
    { match: 'Match 3', value: 180 },
    { match: 'Match 4', value: 160 },
    { match: 'Match 5', value: 200 },
    { match: 'Match 6', value: 240 },
    { match: 'Match 7', value: 220 },
    { match: 'Match 8', value: 120 },
    { match: 'Match 9', value: 150 },
    { match: 'Match 10', value: 180 },
    { match: 'Match 11', value: 160 },
    { match: 'Match 12', value: 200 },
    { match: 'Match 13', value: 240 },
    { match: 'Match 14', value: 220 },
    { match: 'Match 7', value: 220 },
    { match: 'Match 8', value: 120 },
    { match: 'Match 9', value: 150 },
    { match: 'Match 10', value: 180 },
    { match: 'Match 11', value: 160 },
    { match: 'Match 12', value: 200 },
    { match: 'Match 13', value: 240 },
    { match: 'Match 14', value: 220 },
    { match: 'Match 12', value: 200 },
    { match: 'Match 13', value: 240 },
    { match: 'Match 14', value: 220 },
    { match: 'Match 7', value: 220 },
    { match: 'Match 8', value: 120 },
    { match: 'Match 9', value: 150 },
    { match: 'Match 10', value: 180 },
    { match: 'Match 11', value: 160 },
    { match: 'Match 12', value: 200 },
    { match: 'Match 13', value: 240 },
    { match: 'Match 14', value: 220 },
    { match: 'Match 12', value: 200 },
    { match: 'Match 13', value: 240 },
    { match: 'Match 14', value: 220 },
    { match: 'Match 7', value: 220 },
    { match: 'Match 8', value: 120 },
    { match: 'Match 9', value: 150 },
    { match: 'Match 10', value: 180 },
    { match: 'Match 11', value: 160 },
    { match: 'Match 12', value: 200 },
    { match: 'Match 13', value: 240 },
    { match: 'Match 14', value: 220 },
    { match: 'Match 12', value: 200 },
    { match: 'Match 13', value: 240 },
    { match: 'Match 14', value: 220 },
    { match: 'Match 7', value: 220 },
    { match: 'Match 8', value: 120 },
    { match: 'Match 9', value: 150 },
    { match: 'Match 10', value: 180 },
    { match: 'Match 11', value: 160 },
    { match: 'Match 12', value: 200 },
    { match: 'Match 13', value: 240 },
    { match: 'Match 14', value: 220 },
    { match: 'Match 12', value: 200 },
    { match: 'Match 13', value: 240 },
    { match: 'Match 14', value: 220 },
    { match: 'Match 7', value: 220 },
    { match: 'Match 8', value: 120 },
    { match: 'Match 9', value: 150 },
    { match: 'Match 10', value: 180 },
    { match: 'Match 11', value: 160 },
    { match: 'Match 12', value: 200 },
    { match: 'Match 13', value: 240 },
    { match: 'Match 14', value: 220 },
    { match: 'Match 12', value: 200 },
    { match: 'Match 13', value: 240 },
    { match: 'Match 14', value: 220 },
    { match: 'Match 7', value: 220 },
    { match: 'Match 8', value: 120 },
    { match: 'Match 9', value: 150 },
    { match: 'Match 10', value: 180 },
    { match: 'Match 11', value: 160 },
    { match: 'Match 12', value: 200 },
    { match: 'Match 13', value: 240 },
    { match: 'Match 14', value: 220 },
    { match: 'Match 12', value: 200 },
    { match: 'Match 13', value: 240 },
    { match: 'Match 14', value: 220 },
    { match: 'Match 7', value: 220 },
    { match: 'Match 8', value: 120 },
    { match: 'Match 9', value: 150 },
    { match: 'Match 10', value: 180 },
    { match: 'Match 11', value: 160 },
    { match: 'Match 12', value: 200 },
    { match: 'Match 13', value: 240 },
    { match: 'Match 14', value: 220 },
    { match: 'Match 12', value: 200 },
    { match: 'Match 13', value: 240 },
    { match: 'Match 14', value: 220 },
    { match: 'Match 7', value: 220 },
    { match: 'Match 8', value: 120 },
    { match: 'Match 9', value: 150 },
    { match: 'Match 10', value: 180 },
    { match: 'Match 11', value: 160 },
    { match: 'Match 12', value: 200 },
    { match: 'Match 13', value: 240 },
    { match: 'Match 14', value: 220 },
    { match: 'Match 12', value: 200 },
    { match: 'Match 13', value: 40 },
    { match: 'Match 14', value: 220 },
    { match: 'Match 7', value: 220 },
    { match: 'Match 8', value: 120 },
    { match: 'Match 9', value: 150 },
    { match: 'Match 10', value: 180 },
    { match: 'Match 14', value: 220 },
    { match: 'Match 7', value: 220 },
    { match: 'Match 8', value: 120 },
    { match: 'Match 9', value: 150 },
    { match: 'Match 11', value: 160 },
    { match: 'Match 12', value: 200 },
    { match: 'Match 13', value: 240 },
    { match: 'Match 14', value: 220 },
    { match: 'Match 12', value: 200 },
    { match: 'Match 10', value: 180 },
    { match: 'Match 11', value: 160 },
    { match: 'Match 12', value: 200 },
    { match: 'Match 13', value: 240 },
    { match: 'Match 14', value: 220 },
    { match: 'Match 12', value: 200 },
    { match: 'Match 13', value: 240 },
    { match: 'Match 14', value: 220 },
    { match: 'Match 7', value: 200 },
    { match: 'Match 8', value: 200 },
    { match: 'Match 9', value: 200 },
    { match: 'Match 10', value: 200 },
    { match: 'Match 11', value: 160 },
    { match: 'Match 12', value: 160 },
    { match: 'Match 13', value: 160 },
    { match: 'Match 14', value: 160 },
  ];
  


export const Graph = function() {
    return (
        <ResponsiveContainer width="90%" height={300}>
        <div>
          <Title order={2} style={{ textAlign: 'center', padding: '15px'}} mb="lg">
            Player Performance Graph
          </Title>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={playerData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="match" hide />
                <YAxis />
                <Tooltip />
                <Line type="linear" dataKey="value" stroke="#4dabf7" strokeWidth={2} dot={false}  />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </ResponsiveContainer>
    )
    
}