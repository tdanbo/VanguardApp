import { createContext, useContext, useState } from "react";
import axios from "axios";
import { CharacterEntry } from "../Types";

const defaultCharacter: CharacterEntry = {
  details: {
    name: "",
    xp: 0,
    unspent: 0,
    movement: 0,
  },
  toughness: {
    damage: 0,
    max: 0,
    pain: 0,
  },
  stats: {
    cunning: 0,
    discreet: 0,
    persuasive: 0,
    quick: 0,
    resolute: 0,
    strong: 0,
    vigilant: 0,
    accurate: 0,
  },
  corruption: {},
  abilities: [],
  inventory: [],
  equipment: [],
};

interface CharacterContextType {
  character: CharacterEntry;
  setCharacter: React.Dispatch<React.SetStateAction<CharacterEntry>>;
}

const defaultContextValue: CharacterContextType = {
  character: defaultCharacter,
  setCharacter: () => {}, // dummy function for default context
};

interface CharacterProviderProps {
  children: React.ReactNode;
}

export const CharacterContext =
  createContext<CharacterContextType>(defaultContextValue);

const CharacterProvider: React.FC<CharacterProviderProps> = ({ children }) => {
  const [selectedCharacter, setSelectedCharacter] =
    useState<CharacterEntry>(defaultCharacter);

  return (
    <CharacterContext.Provider
      value={{
        character: selectedCharacter,
        setCharacter: setSelectedCharacter,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

export default CharacterProvider;
