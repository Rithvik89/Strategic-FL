import { Avatar, Card, Group, Text, Badge } from "@mantine/core";
import { FaArrowTrendUp } from "react-icons/fa6";

export interface MiniPortfolioProps {
    remaining_purse : number;
    returns : number;
}
const portfolio:MiniPortfolioProps = {
    remaining_purse: 1000,
    returns: 150,
};

export const MiniPortfolio: React.FC<MiniPortfolioProps> = ({ remaining_purse, returns}) => {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder style={{ width: '100%' }}>
            
            <Text  size="xl">Portfolio Analysis</Text>
            <Group align="apart" mt="md" mb="xs"> 
                <Text fw={500}>Purse Left:</Text>
                <Text style={{ color: "black" }}>{remaining_purse}</Text>
            </Group>
            <Group align="apart" mt="md" mb="xs"> 
                <Text fw={500}>Returns:</Text>
                <Text style={{ color: "green", display: 'flex'}}>{returns}<FaArrowTrendUp style={{ color: 'green' }} /></Text>
                
            </Group>
            <Group justify="space-between" mt="md" mb="xs"> 
                <Text fw={500}>Invested:</Text>
                <Text style={{ color: "black" }}>5500</Text>
                
            </Group>
        </Card>
    );
}