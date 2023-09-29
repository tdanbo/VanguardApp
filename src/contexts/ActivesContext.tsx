import { createContext, useState } from "react";
import { Actives } from "../Types";
import { CharacterContext } from "./CharacterContext";
import { useContext } from "react";

const defaultActive: Actives = {
  attack: {
    value: 0,
    dice1: 0,
    dice1_mod: 0,
    dice1_name: "",
    dice2: 0,
    dice2_mod: 0,
    dice2_name: "",
  },
  defense: {
    value: 0,
    dice: 0,
    dice_mod: 0,
    dice_name: "",
  },
  casting: {
    value: 0,
  },
  sneaking: {
    value: 0,
  },
};

interface ActiveContextType {
  actives: Actives;
  setActives: React.Dispatch<React.SetStateAction<Actives>>;
}

const defaultContextValue: ActiveContextType = {
  actives: defaultActive,
  setActives: () => {}, // dummy function for default context
};

interface ActivesProviderProps {
  children: React.ReactNode;
}

export const ActivesContext =
  createContext<ActiveContextType>(defaultContextValue);

const ActivesProvider: React.FC<ActivesProviderProps> = ({ children }) => {
  const { character } = useContext(CharacterContext);
  const [actives, internalSetActives] = useState<Actives>(defaultActive);
  const setActives = () => {
    console.log("Setting Actives");
    let updatedActives = { ...actives };

    updatedActives.attack.value =
      character.stats[character.actives["attack"]].value;
    updatedActives.defense.value =
      character.stats[character.actives["defense"]].value;
    updatedActives.casting.value =
      character.stats[character.actives["casting"]].value;
    updatedActives.sneaking.value =
      character.stats[character.actives["sneaking"]].value;

    updatedActives.attack.dice1 = character.equipment.main.roll.dice;
    updatedActives.attack.dice2 = character.equipment.off.roll.dice;
    updatedActives.defense.dice = character.equipment.armor.roll.dice;

    internalSetActives(updatedActives);
  };

  return (
    <ActivesContext.Provider
      value={{
        actives: actives,
        setActives: setActives,
      }}
    >
      {children}
    </ActivesContext.Provider>
  );
};

export default ActivesProvider;
