import { useEffect, useRef } from "react";
import { Socket, io } from "socket.io-client";
import { SessionEntry } from "./Types";

function useSocketIO(
  api: string,
  setSession: React.Dispatch<React.SetStateAction<SessionEntry>>,
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>,
): Socket {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Initialize socket only once
    socketRef.current = io(api, {
      path: "/sessions",
    });

    socketRef.current.on('connect', () => {
      setIsConnected(true);
    });

    socketRef.current.on('disconnect', () => {
      setIsConnected(false);
    });

    socketRef.current.on('join', (data: SessionEntry) => {
      console.log(data);
      setSession(data);
    });

    socketRef.current.on('update', (data: SessionEntry) => { // Replace 'any' with an appropriate type
        
        console.log('Update response:', data);
        
        setSession(data)
        
        // Additional logic based on the response
    });

    // Cleanup function
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [api, setIsConnected, setSession]); // Dependencies

  return socketRef.current!;
}

export default useSocketIO;
