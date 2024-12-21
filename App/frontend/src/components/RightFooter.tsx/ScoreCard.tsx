import { Avatar, Card, Group, Text, Badge, Stack } from "@mantine/core";

export interface ScoreCardProps {
    TeamA : string;
    TeamB : string;
    Innings : string;
    BatFirstTeam : string;
    BatSecondTeam : string;
    TeamAScore : number;
    TeamBScore : number;
    TeamAWickets : number;
    TeamBWickets : number;
    TeamAOvers : string;
    TeamBOvers : string;
    Target: number;
    CRR : number;
    RRR : number;
}


export const ScoreCard: React.FC<ScoreCardProps> = ({...ScoreCard}) => {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="space-between" mt="md" mb="xs">
            <Text size="sm" style={{ textAlign: "center" }}>Match 1 IPL 2023</Text>
            <Text color="green">Live</Text>
            </Group>
            <Stack justify="space-between" mt="md" mb="xs">
                <Group justify="space-between" mt="md" mb="xs">
                    <Avatar size="lg"  />
                    <Text>{ScoreCard.TeamA}</Text>
                    <Text fw={500}>{ScoreCard.TeamAScore}/{ScoreCard.TeamAWickets} ({ScoreCard.TeamAOvers})</Text>
                    
                </Group>
                <Group justify="space-between" mt="md" mb="xs">
                    <Avatar size="lg"  />
                    <Text>{ScoreCard.TeamB}</Text>
                    <Text fw={500}>{ScoreCard.TeamBScore}/{ScoreCard.TeamBWickets} ({ScoreCard.TeamBOvers})</Text>
                
                </Group>
            </Stack>
        </Card>
    );
}