import React, { createContext, useContext, useState, useEffect } from "react";
import { SessionContext } from "./SessionContext";
import { CharacterEntry, SessionEntry, CombatEntry } from "../Types";
import { WEBSOCKET } from "../Constants";
interface WebSocketContextValue {
  charactersResponse: CharacterEntry[] | null;
  sessionsResponse: SessionEntry[] | null;
  combatlogResponse: CombatEntry[] | null;
  sendRequest: (req: string) => void;
}

const WebSocketContext = createContext<WebSocketContextValue | undefined>(
  undefined,
);

interface WebsocketProps {
  children: React.ReactNode;
}

export const WebSocketProvider: React.FC<WebsocketProps> = ({
  children,
}: WebsocketProps) => {
  const [charactersResponse, setCharacterResponse] = useState<
    CharacterEntry[] | null
  >(null);

  const [sessionsResponse, setSessionResponse] = useState<
    SessionEntry[] | null
  >(null);

  const [combatlogResponse, setCombatlogResponse] = useState<
    CombatEntry[] | null
  >(null);

  const [_request, setRequest] = useState<string | null>(null);
  const { session } = useContext(SessionContext);
  const [ws, setWs] = useState<WebSocket | null>(null); // <-- State for the WebSocket
  let heartbeatInterval: NodeJS.Timeout;
  // Set up the WebSocket here and its event listeners
  useEffect(() => {
    if (!session.id) return; // Skip if there's no session ID

    console.log("connecting to websocket server: " + session.id);
    const websocket = new WebSocket(`${WEBSOCKET}/ws/${session.id}`);

    websocket.onopen = () => {
      console.log("Successfully connected to the WebSocket.");

      // Setting up the heartbeat interval after WebSocket is open
      heartbeatInterval = setInterval(() => {
        if (websocket.readyState === WebSocket.OPEN) {
          websocket.send("heartbeat"); // Just send the string "heartbeat"
        }
      }, 10000); // Send a heartbeat every 10 seconds
    };

    websocket.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    websocket.onmessage = (e: MessageEvent) => {
      try {
        const data = JSON.parse(e.data);

        switch (data.type) {
          case "characters":
            setCharacterResponse(data.characters);
            break;
          case "sessions":
            setSessionResponse(data.session);
            break;
          case "combatlog":
            setCombatlogResponse(data.combatlog);
            break;
          default:
            console.warn("Unhandled WebSocket message type:", data.type);
        }
      } catch (error) {
        if (e.data === "heartbeat-ack") {
          console.log("...");
        } else {
          console.error("Error parsing WebSocket message:", error);
        }
      }
    };

    setWs(websocket); // <-- Store the WebSocket instance in state

    return () => {
      console.log("Closing WebSocket for session: " + session.id);
      websocket.close(); // Close the WebSocket when cleaning up
      clearInterval(heartbeatInterval);
    };
  }, [session.id]);

  const sendRequest = (req: string) => {
    // Convert the request into a string format, if required
    if (ws) {
      // <-- Ensure ws exists before trying to use it
      ws.send(req);
      setRequest(req);
    }
  };

  return (
    <WebSocketContext.Provider
      value={{
        charactersResponse,
        sessionsResponse,
        combatlogResponse,
        sendRequest,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = (): WebSocketContextValue => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};
