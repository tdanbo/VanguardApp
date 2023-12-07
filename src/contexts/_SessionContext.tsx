import { createContext, useState } from "react";
import { SessionEntry } from "../Types";

const defaultSession: SessionEntry = {
  name: "",
  id: "",
  date: "",
  owner: "",
  travel: {
    day: 0,
    time: 0,
    distance: 0,
    weather: "",
  },
  characters: [],
  combatlog: [],
};

interface SessionContextType {
  session: SessionEntry;
  setSession: React.Dispatch<React.SetStateAction<SessionEntry>>;
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
    useState<SessionEntry>(defaultSession);

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
