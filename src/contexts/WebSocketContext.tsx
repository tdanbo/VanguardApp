import React, { createContext, useContext, useState, useEffect } from "react";
import { SessionContext } from "./SessionContext";
import { UserContext } from "./UserContext";
import { CharacterEntry, SessionEntry } from "../Types";
interface WebSocketContextValue {
  charactersResponse: CharacterEntry[] | null;
  sessionsResponse: SessionEntry[] | null;
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

  const [response, setResponse] = useState<any>(null);
  const [request, setRequest] = useState<string | null>(null);
  const { session } = useContext(SessionContext);
  const { user } = useContext(UserContext);
  const [ws, setWs] = useState<WebSocket | null>(null); // <-- State for the WebSocket

  // Set up the WebSocket here and its event listeners
  useEffect(() => {
    if (!session.id) return; // Skip if there's no session ID

    console.log("connecting to websocket server: " + session.id);
    const websocket = new WebSocket(`ws://localhost:8000/ws/${session.id}`);

    websocket.onopen = (event) => {
      console.log("Successfully connected to the WebSocket.");
    };

    websocket.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    websocket.onmessage = (e: MessageEvent) => {
      const data = JSON.parse(e.data);

      switch (data.type) {
        case "characters":
          setCharacterResponse(data.characters);
          break;

        case "sessions":
          setSessionResponse(data.session);
          break;

        default:
          console.warn("Unhandled WebSocket message type:", data.type);
      }
    };

    setWs(websocket); // <-- Store the WebSocket instance in state

    return () => {
      console.log("Closing WebSocket for session: " + session.id);
      websocket.close(); // Close the WebSocket when cleaning up
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
      value={{ charactersResponse, sessionsResponse, sendRequest }}
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

// Dummy code to implement

// const handleButtonClick = () => {
//   sendRequest("characters"); // asking websocket to update session characters for all clients
// };

// useEffect(() => {
//   if (charactersResponse) {
//     setCharacterLog(charactersResponse);
//   }
// }, [charactersResponse]);
