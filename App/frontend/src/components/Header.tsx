import React from 'react';
import { Box, Group, Text } from '@mantine/core';

const Header: React.FC = () => {
  return (
    <Box 
      style={{
        height: 60,
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        justifyContent: 'space-between',
        borderBottom: '1px solid #eaeaea',
        border: '1px solid black',
      }}
    >
      {/* Left side - Logo */}
    <Text fw={700} size="lg" px={16}>
      Khelo Dimag Se
    </Text>

      {/* Right side - Navigation */}
      <Group gap="xl">
        <Text component="a" href="/">Home</Text>
        <Text component="a" href="/leagues">Leagues</Text>
        <Text component="a" href="/portfolio">My Portfolio</Text>
        <Text component="a" href="/profile">Profile</Text>
      <Text 
        color="red" 
        onClick={() => {
          // Add your logout logic here
          console.log('User logged out');
        }}
      >
        Logout
      </Text>
      </Group>
    </Box>
  );
};

export default Header;