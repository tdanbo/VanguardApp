import { createContext, useState } from "react";
import { CharacterEntry } from "../Types";

const defaultCharacter: CharacterEntry = {
  id: "",
  portrait: "",
  details: {
    name: "",
    xp_earned: 0,
    movement: 0,
    modifier: 0,
  },
  toughness: {
    damage: { value: 0, mod: 0 },
    max: { value: 0, mod: 0 },
    pain: { value: 0, mod: 0 },
  },
  stats: {
    cunning: { value: 0, mod: 0 },
    discreet: { value: 0, mod: 0 },
    persuasive: { value: 0, mod: 0 },
    quick: { value: 0, mod: 0 },
    resolute: { value: 0, mod: 0 },
    strong: { value: 0, mod: 0 },
    vigilant: { value: 0, mod: 0 },
    accurate: { value: 0, mod: 0 },
  },
  actives: {
    attack: { stat: "accurate", mod: 0 },
    defense: { stat: "quick", mod: 0 },
    casting: { stat: "resolute", mod: 0 },
    sneaking: { stat: "discreet", mod: 0 },
  },
  corruption: {
    permanent: 0,
    temporary: 0,
    threshold: 10,
  },
  money: 0,
  abilities: [],
  inventory: [],
  rations: { food: 0, water: 0 },
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
