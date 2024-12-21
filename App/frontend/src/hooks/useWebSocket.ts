// src/hooks/useWebSocket.ts
import { useState, useEffect, useCallback } from 'react';

interface UseWebSocketProps {
  url: string;
}

export const useWebSocket = ({ url }: UseWebSocketProps) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const websocket = new WebSocket(url);

    websocket.onopen = () => {
      setIsConnected(true);
      console.log('Connected to WebSocket');
    };

    websocket.onclose = () => {
      setIsConnected(false);
      console.log('Disconnected from WebSocket');
    };

    websocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prev) => [...prev, message]);
    };

    setWs(websocket);

    return () => {
      websocket.close();
    };
  }, [url]);

  const sendMessage = useCallback((message: any) => {
    if (ws && isConnected) {
      ws.send(JSON.stringify(message));
    }
  }, [ws, isConnected]);

  return { isConnected, messages, sendMessage };
};