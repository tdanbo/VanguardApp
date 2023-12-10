import React, { useRef } from "react";
import { SessionEntry } from "./Types";
import { set } from "lodash";
import * as Constant from "./Constants";

function useWebSocket(
  url: string,
  setSession: React.Dispatch<React.SetStateAction<SessionEntry>>,
) {
  const base_url = Constant.WEBSOCKET + "BaseSession";
  const websocketRef = useRef<WebSocket>(new WebSocket(base_url));
  const storedUrlRef = useRef<string>(base_url);

  function connectWebSocket() {
    if (url !== storedUrlRef.current) {
      const ws = new WebSocket(url);

      ws.onopen = () => {
        console.log("WebSocket connection opened.");
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        // You can add reconnection logic here, for example, with a delay
        setTimeout(connectWebSocket, 1000); // Retry after 1 second
      };

      ws.onmessage = (event) => {
        console.log("WebSocket message received");
        setSession(JSON.parse(event.data));
      };

      ws.onclose = (event) => {
        console.log("WebSocket connection closed:", event);
        // You can add reconnection logic here as well
        setTimeout(connectWebSocket, 1000); // Retry after 1 second
      };

      // Store the WebSocket instance and URL in the refs
      websocketRef.current = ws;
      storedUrlRef.current = url;
    }
  }

  // Call connectWebSocket when the component first mounts
  if (!websocketRef.current || url !== storedUrlRef.current) {
    connectWebSocket();
  } else {
    if (websocketRef.current.readyState === WebSocket.OPEN) {
      console.log("WebSocket is already open!");
    }
  }

  return websocketRef.current;
}

export default useWebSocket;
