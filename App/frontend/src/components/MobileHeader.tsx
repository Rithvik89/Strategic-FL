import React, { useState } from 'react';
import { Box, Burger, Drawer, Text, Group, Stack } from '@mantine/core';

import { useNavigate } from 'react-router-dom';



  const handleLogout = () => {
    // Add your logout logic here, e.g., clearing tokens, etc.
    console.log('Logout clicked');
    const token :string|null = localStorage.getItem('token');
    fetch('http://localhost:8080/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Logout failed');
        }
        return response.json();
      })
      .then(data => {
        console.log('Logout successful', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    localStorage.removeItem('token');
    window.location.href = '/';
  };


const MobileHeader: React.FC = () => {
  const [opened, setOpened] = useState(false);

  return (
    <Box
      style={{
        height: 60,
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        justifyContent: 'space-between',
        borderBottom: '1px solid #eaeaea',
      }}
    >
      {/* Leftmost - Hamburger */}
      <Burger
        opened={opened}
        onClick={() => setOpened((prev) => !prev)}
        size="sm"
      />

      {/* Center - Title or Logo */}
      <Text fw={700} size="lg">
      Khelo Dimag Se
      </Text>

      {/* Rightmost - Logout */}
      <Text
        color="red"
        style={{ cursor: 'pointer' }}
        onClick={() => {
          // Add your logout logic here
          console.log('Logout clicked');
          handleLogout();
        }}
      >
        Logout
      </Text>

      {/* Drawer for Menu Items */}
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Menu"
        padding="md"
        size="sm"
      >
        <Stack gap={16}>
          <Text component="a" href="/leagues">Leagues</Text>
          <Text component="a" href="/portfolio">My Portfolio</Text>
          <Text component="a" href="/profile">Profile</Text>
        </Stack>
      </Drawer>
    </Box>
  );
};

export default MobileHeader;