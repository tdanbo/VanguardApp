import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import { API } from "../Constants";
import { EffectEntry, ItemEntry, AbilityEntry, CharacterEntry } from "../Types";

// Updated GameContentContextType with separated data fields
interface GameContentContextType {
  equipment: ItemEntry[];
  abilities: AbilityEntry[];
  effects: EffectEntry[];
  creatures: CharacterEntry[];
  updateCreatureData: () => Promise<void>;
}

// Default values for each part of the context
const defaultContextValue: GameContentContextType = {
  equipment: [],
  abilities: [],
  effects: [],
  creatures: [],
  updateCreatureData: async () => {}, // Placeholder function
};

// Creating the context with the default value
const GameContentContext =
  createContext<GameContentContextType>(defaultContextValue);

export const GetGameData = () => useContext(GameContentContext);

export const GameContentProvider = ({ children }: { children: ReactNode }) => {
  const [equipment, setEquipment] = useState<ItemEntry[]>([]);
  const [abilities, setAbilities] = useState<AbilityEntry[]>([]);
  const [effects, setEffects] = useState<EffectEntry[]>([]);
  const [creatures, setCreatures] = useState<CharacterEntry[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const equipmentPromise = axios.get(`${API}/api/equipment`);
        const abilitiesPromise = axios.get(`${API}/api/abilities`);
        const effectsPromise = axios.get(`${API}/api/effects`);
        const creaturesPromise = axios.get(`${API}/api/creatures`);

        const [
          equipmentResponse,
          abilitiesResponse,
          effectsResponse,
          creatureResponse,
        ] = await Promise.all([
          equipmentPromise,
          abilitiesPromise,
          effectsPromise,
          creaturesPromise,
        ]);

        setEquipment(equipmentResponse.data);
        setAbilities(abilitiesResponse.data);
        setEffects(effectsResponse.data);
        setCreatures(creatureResponse.data);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchData();
  }, []);

  const updateCreatureData = async () => {
    try {
      const creatureResponse = await axios.get(`${API}/api/creatures`);
      setCreatures(creatureResponse.data);
    } catch (error) {
      console.error("Failed to fetch creatures", error);
    }
  };

  // Updated context value to match the new structure
  const value = {
    equipment,
    abilities,
    effects,
    creatures,
    updateCreatureData,
  };

  return (
    <GameContentContext.Provider value={value}>
      {children}
    </GameContentContext.Provider>
  );
};
