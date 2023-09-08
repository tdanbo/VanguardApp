import { createContext, useState } from "react";

const defaultSession: String = "";

interface SessionContextType {
  session: String;
  setSession: React.Dispatch<React.SetStateAction<String>>;
}

const defaultContextValue: SessionContextType = {
  session: defaultSession,
  setSession: () => {}, // dummy function for default context
};

interface SessionProviderProps {
  children: React.ReactNode;
}

export const SessionContext =
  createContext<SessionContextType>(defaultContextValue);

const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
  const [selectedSession, setSelectedSession] =
    useState<String>(defaultSession);

  return (
    <SessionContext.Provider
      value={{
        session: selectedSession,
        setSession: setSelectedSession,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
