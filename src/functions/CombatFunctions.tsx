import axios from "axios";
import { CharacterEntry, CombatEntry, SessionEntry } from "../Types";
import { useContext } from "react";
import { API } from "../Constants";
import { v4 as uuidv4 } from "uuid";
export async function getCombatLog(id: string): Promise<CombatEntry[]> {
  const response = await axios.get<CombatEntry[]>(`${API}/api/combatlog/${id}`);
  return response.data;
}

interface RollDiceProps {
  dice: number;
  active: string;
  source: string;
  modifier: number;
  count: number;
  target: number;
  add_mod: boolean;
  character: CharacterEntry;
  session: SessionEntry;
}

export function useRoll() {
  // const { sendRequest } = useWebSocket();

  return async ({
    dice,
    count,
    target,
    active,
    source,
    modifier,
    character,
    session,
  }: RollDiceProps) => {
    let roll = 0;
    let total = 0;

    for (let i = 0; i < count; i++) {
      roll += Math.floor(Math.random() * dice) + 1;
    }

    if (source === "Skill Test") {
      total += roll;
    } else {
      total += modifier + roll;
    }

    const roll_result = total;

    let success = true;
    if (target === 0) {
      success = true;
    } else if (roll_result > target) {
      success = false;
    }

    const NewCombatEntry: CombatEntry = {
      id: session.id,
      portrait: character.portrait,
      character: character.name,
      source: source,
      active: active,
      dice: dice,
      result: roll_result,
      success: success,
      roll: roll,
      modifier: modifier,
      target: target,
      uuid: uuidv4(),
    };

    // const updated_character = setBaseModifier(character, 0);
    // setCharacter(updated_character);
    await postCombatLog(NewCombatEntry);
    // sendRequest("combatlog"); // asking websocket to update session combatlog for all clients
    return roll_result;
  };
}

export async function postCombatLog(NewCombatEntry: CombatEntry) {
  try {
    const response = await axios.post(`${API}/api/combatlog/`, NewCombatEntry);
    return response.data;
  } catch (error) {
    console.error("Error posting combat log:", error);
    throw error; // or handle the error as you see fit
  }
}
