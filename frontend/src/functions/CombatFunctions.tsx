import axios from "axios";
import { CombatEntry } from "../Types";

export async function getCombatLog(): Promise<CombatEntry[]> {
  const response = await axios.get<CombatEntry[]>(
    "http://localhost:8000/api/combatlog",
  );
  return response.data;
}
