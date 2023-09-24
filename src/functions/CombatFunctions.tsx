import axios from "axios";
import { CombatEntry } from "../Types";
import { useContext } from "react";
import { CharacterContext } from "../contexts/CharacterContext";
import { setBaseModifier } from "./CharacterFunctions";
import { SessionContext } from "../contexts/SessionContext";
import { useWebSocket } from "../contexts/WebSocketContext";

export async function getCombatLog(id: string): Promise<CombatEntry[]> {
  const response = await axios.get<CombatEntry[]>(
    `http://localhost:8000/api/combatlog/${id}`,
  );
  return response.data;
}

interface RollDiceProps {
  dice: string;
  active: string;
  source: string;
  modifier: number;
  count: number;
  target: number;
  add_mod: boolean;
}

function extractDiceValue(
  str: string,
): { dice: number; modifier: number } | null {
  const match = str.match(/d(\d+)([+-]\d+)?/);
  if (!match) return null;

  const dice = parseInt(match[1], 10);
  const modifier = match[2] ? parseInt(match[2], 10) : 0;

  return { dice, modifier };
}

export function useRoll() {
  const { character, setCharacter } = useContext(CharacterContext);
  const { session } = useContext(SessionContext);
  const { sendRequest } = useWebSocket();

  return async ({
    dice,
    count,
    target,
    active,
    source,
    modifier,
    add_mod,
  }: RollDiceProps) => {
    let total = 0;
    let newModifier = modifier;

    const diceValues = extractDiceValue(dice);
    if (!diceValues) {
      throw new Error("Invalid dice string format");
    }

    const { dice: dice_number, modifier: dice_modifier } = diceValues;

    newModifier += dice_modifier;

    for (let i = 0; i < count; i++) {
      total += Math.floor(Math.random() * dice_number) + 1;
    }

    if (add_mod == true) {
      total += character.details.modifier;
    }

    const roll_result = total;

    let success = true;
    if (roll_result > target) {
      success = false;
    }

    const NewCombatEntry: CombatEntry = {
      id: session.id,
      portrait: character.portrait,
      character: character.details.name,
      source: source,
      active: active,
      dice: dice,
      result: roll_result,
      success: success,
      modifier: newModifier,
    };

    const updated_character = setBaseModifier(character, 0);
    setCharacter(updated_character);
    await postCombatLog(NewCombatEntry);
    sendRequest("combatlog"); // asking websocket to update session combatlog for all clients
    return roll_result;
  };
}

export async function postCombatLog(NewCombatEntry: CombatEntry) {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/combatlog/",
      NewCombatEntry,
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error posting combat log:", error);
    throw error; // or handle the error as you see fit
  }
}
