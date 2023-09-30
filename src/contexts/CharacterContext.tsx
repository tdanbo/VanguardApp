import { createContext, useState } from "react";
import { CharacterEntry, EmptyArmor, EmptyWeapon } from "../Types";

const defaultCharacter: CharacterEntry = {
  name: "",
  id: "",
  portrait: "",
  details: {
    xp_earned: 0,
    movement: 0,
    modifier: 0,
  },
  damage: 0,
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
    attack: "accurate",
    defense: "quick",
    casting: "resolute",
    sneaking: "discreet",
  },
  corruption: {
    permanent: 0,
    temporary: 0,
  },
  money: 0,
  abilities: [],
  inventory: [],
  equipment: {
    main: EmptyWeapon,
    off: EmptyWeapon,
    armor: EmptyArmor,
  },
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
