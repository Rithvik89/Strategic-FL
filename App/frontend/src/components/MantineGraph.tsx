import { LineChart } from '@mantine/charts';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';




export function MantineGraph() {

    const [searchParams] = useSearchParams();
    const league_id = searchParams.get('league_id') || '';
    const player_id = searchParams.get('player_id') || '';
    const [timeSeriesData, setTimeSeriesData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`http://localhost:8080/points?league_id=${league_id}&player_id=${player_id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Pass the token from localStorage
                    },
                });
                const data = await response.json();
                const formattedData = data.map((item: string) => {
                    const [timestamp, points] = item.split(',');
                    return {
                        date: new Date(parseInt(timestamp)).toLocaleDateString(),
                        Apples: parseInt(points),
                    };
                });
                console.log('Data:', formattedData);``
                setTimeSeriesData(formattedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div style={{ marginTop: '50px' }}>
            <LineChart
            h={300}
            data={timeSeriesData}
            dataKey="date"
            series={[{ name: 'Apples', color: 'indigo.6' }]}
            curveType="linear"
            connectNulls
            yAxisProps={{
                type: 'number',
                domain: ['auto', 'auto'],
                tickCount: 5,
            }}
            />
        </div>
    );
}