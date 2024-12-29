import { useState } from 'react';
import { TextInput, NumberInput, Select, Button, Stack, Box, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { randomId } from '@mantine/hooks';



export const LeagueForm: React.FC = () => { 
    const [players, setPlayers] = useState<{ player_id: string; base_price: number }[]>([]);
    const [totalBasePrice, setTotalBasePrice] = useState(0);
    const [poolSize, setPoolSize] = useState(0);

    const form = useForm({
        initialValues: {
            playerId: '',
            basePrice: 0,
            entryFee: 0,
            poolSize: 0,
        },
    });

    const addPlayer = () => {
        const newPlayer = { player_id: form.values.playerId, base_price: form.values.basePrice };
        setPlayers([...players, newPlayer]);
        setTotalBasePrice(totalBasePrice + newPlayer.base_price);
        setPoolSize(form.values.poolSize);
        form.setFieldValue('playerId', '');
        form.setFieldValue('basePrice', 0);
    };

    const submitLeagueDetails = () => {
        const leagueDetails = {
            players,
            entryFee: form.values.entryFee,
            poolSize,
            totalBasePrice,
        };
        console.log('League Details:', leagueDetails);
        fetch('http://localhost:8080/createLeague', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(leagueDetails),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <Stack> 
            <TextInput
                label="Player ID"
                placeholder="Player ID"
                {...form.getInputProps('playerId')}
            />
            <NumberInput
                mt="md"
                label="Base Price"
                placeholder="Base Price"
                {...form.getInputProps('basePrice')}
            />
  
            <Group justify="center" mt="xl">
                <Button onClick={addPlayer}>Add Player</Button>
            </Group>
            <Box mt="xl">
                <h3>Players</h3>
                {players.map((player, index) => (
                    <Box key={index} style={{ border: '1px solid #ccc', padding: '8px', borderRadius: '4px', marginBottom: '8px' }}>
                        {player.player_id} - {player.base_price}
                        <Button 
                            variant="outline" 
                            color="red" 
                            size="xs" 
                            style={{ marginLeft: '8px' }} 
                            onClick={() => {
                                const updatedPlayers = players.filter((_, i) => i !== index);
                                setPlayers(updatedPlayers);
                                setTotalBasePrice(updatedPlayers.reduce((total, p) => total + p.base_price, 0));
                            }}
                        >
                            Remove
                        </Button>
                    </Box>
                ))}
            </Box>
            <Box mt="xl">
            <NumberInput
                mt="md"
                label="Entry Fee"
                placeholder="Entry Fee"
                {...form.getInputProps('entryFee')}
            />
            <NumberInput
                mt="md"
                label="Pool Size"
                placeholder="Pool Size"
                {...form.getInputProps('poolSize')}
            />
            </Box>
            <Group justify="center" mt="xl">
                <Button onClick={submitLeagueDetails}>Submit League Details</Button>
            </Group>
        </Stack>
    );
};