import axios from "axios";
import { CharacterEntry, CombatEntry } from "../Types";
import { useEffect, useState } from "react";

export async function getCombatLog(): Promise<CombatEntry[]> {
  const response = await axios.get<CombatEntry[]>(
    "http://localhost:8000/api/combatlog",
  );
  return response.data;
}

interface RollDiceProps {
  character: CharacterEntry;
  dice: string;
  count: number;
  modifier: number;
}

function extractDiceValue(str: string) {
  const match = str.match(/d(\d+)/);
  return match ? parseInt(match[1], 10) : null;
}

export function Roll({ character, dice, count, modifier }: RollDiceProps) {
  const dice_number = extractDiceValue(dice);

  if (!dice_number) {
    throw new Error("Invalid dice string format");
  }

  let total = 0;
  for (let i = 0; i < count; i++) {
    total += Math.floor(Math.random() * dice_number) + 1;
  }

  const roll_result = total + (modifier || 0);

  console.log(roll_result);

  const NewCombatEntry: CombatEntry = {
    character: character.details.name,
    result: roll_result,
    active: "attack",
    type: "attack",
    details: "string",
  };

  postCombatLog(NewCombatEntry);

  return roll_result;
}

export function postCombatLog(NewCombatEntry: CombatEntry) {
  console.log("Updating Combat Log");
  // selectedCharacter.inventory = inventory; THIS WILL UPDATE THE INVENTORY< BUT NOT PROC THE RE-RENDER
  axios
    .post("http://localhost:8000/api/combatlog/", NewCombatEntry)
    .then((res) => console.log(res));
}
