import React, { useState } from 'react';
import { Card, TextInput, PasswordInput, Button } from '@mantine/core';

const LoginScreen: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Handle login logic here
        console.log('Username:', username);
        console.log('Password:', password);
        fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_name: username, password: password }),
        })
            .then((response) => response.json())
            .then((data) => {
                const { token } = data;
                localStorage.setItem('token', token);
                console.log('Success:', data);
                window.location.href = '/leagues';
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <Card shadow="sm" padding="lg">
            <form onSubmit={handleSubmit}>
                <TextInput
                    label="Username"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(event) => setUsername(event.currentTarget.value)}
                    required
                />
                <PasswordInput
                    label="Password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) => setPassword(event.currentTarget.value)}
                    required
                    mt="md"
                />
                <Button type="submit" fullWidth mt="xl">
                    Submit
                </Button>
            </form>
        </Card>
    );
};

export default LoginScreen;