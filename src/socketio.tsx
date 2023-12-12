import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { SessionEntry } from "./Types";

function useSocketIO(
  url: string,
  setSession: React.Dispatch<React.SetStateAction<SessionEntry>>,
) {
  const socket = io(url);

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [sessionMessageEvents, setSessionMessageEvents] = useState([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onMessage(value: SessionEntry) {
      setSession(value);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("sessionMessage", onMessage);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("sessionMessage", onMessage);
    };
  }, []);

  return socket;
}

export default useSocketIO;
