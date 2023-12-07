import { useState, useEffect } from "react";

function useWebSocket(url: string) {
  const [websocket, setWebsocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    if (!websocket) {
      const ws = new WebSocket(url);
      setWebsocket(ws);
    }

    return () => {
      if (websocket && websocket.readyState === WebSocket.OPEN) {
        websocket.close();
      }
    };
  }, [url, websocket]);

  return websocket;
}

export default useWebSocket;
