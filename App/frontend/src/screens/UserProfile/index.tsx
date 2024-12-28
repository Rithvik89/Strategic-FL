import React from 'react';
import { Avatar, Text, Stack, Box, Title, Card, List, ThemeIcon } from '@mantine/core';
import axios from 'axios';
import { IconCircleCheck } from '@tabler/icons-react';
import { useEffect, useState } from 'react';


export interface ProfileData {
  user_id: number;
  user_name: string;
  mail_id: string;
  profile_pic: number;
}

export const UserProfile: React.FC = () => {

  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log('Fetching profile data...');
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/profile', {
          headers: {
              Authorization: `Bearer ${token}`
          }
            });
        const data = response.data;
        setProfileData(data as ProfileData);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
}




  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder style={{ width: '100%' }}>
      <Stack gap={8} align="center">
        <Avatar src={profileData?.profile_pic?.toString()} size={100} radius="xl" />
        <Title order={3}>{profileData?.user_name}</Title>
        <Text color="dimmed">{profileData?.mail_id}</Text>
      </Stack>

      <Box mt="xl">
        <Text size="lg" fw={500}>
          Wallet: ${2300}
        </Text>
      </Box>

      <Box mt="lg">
        <Text size="md" fw={500} mb="sm">
          Leagues Participated
        </Text>
        <List spacing="xs" center icon={<ThemeIcon color="blue" size={24} radius="xl"><IconCircleCheck size={14} /></ThemeIcon>}>
          {/* {userData.leagues.map((league) => (
            <List.Item key={league}>{league}</List.Item>
          ))} */}
        </List>
      </Box>
    </Card>
  );
};

export default UserProfile;