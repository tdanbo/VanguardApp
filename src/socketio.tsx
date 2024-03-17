import { useEffect, useRef } from "react";
import { Socket, io } from "socket.io-client";
import { SessionEntry } from "./Types";

function useSocketIO(
  api: string,
  setSession: React.Dispatch<React.SetStateAction<SessionEntry>>,
): Socket {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Initialize socket only once
    socketRef.current = io(api, {
      path: "/sessions",
    });

    socketRef.current.on("connect", () => {
      console.log("Connected to server");
    });

    socketRef.current.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    socketRef.current.on("join", (data: SessionEntry) => {
      setSession(data);
    });

    socketRef.current.on("update", (data: SessionEntry) => {
      // Replace 'any' with an appropriate type
      console.log("Update Received", data);
      setSession(data);

      // Additional logic based on the response
    });

    // Cleanup function
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [api, setSession]); // Dependencies

  return socketRef.current!;
}

export default useSocketIO;
