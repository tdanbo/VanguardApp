import axios from "axios";
import { CharacterEntry, CombatEntry } from "../Types";
import { useEffect, useState, useContext } from "react";
import { CharacterContext } from "../contexts/CharacterContext";

export async function getCombatLog(): Promise<CombatEntry[]> {
  const response = await axios.get<CombatEntry[]>(
    "http://localhost:8000/api/combatlog",
  );
  return response.data;
}

interface RollDiceProps {
  dice: string;
  type: string;
  count: number;
  target: number;
}

function extractDiceValue(str: string) {
  const match = str.match(/d(\d+)/);
  return match ? parseInt(match[1], 10) : null;
}

export function useRoll() {
  const { character, setCharacter } = useContext(CharacterContext);

  return ({ dice, count, target, type }: RollDiceProps) => {
    const dice_number = extractDiceValue(dice);

    if (!dice_number) {
      throw new Error("Invalid dice string format");
    }

    let total = 0;
    for (let i = 0; i < count; i++) {
      total += Math.floor(Math.random() * dice_number) + 1;
    }

    const roll_result = total;

    let success = true;
    if (roll_result > target) {
      success = false;
    }

    console.log(roll_result);

    const NewCombatEntry: CombatEntry = {
      character: character.details.name,
      type: type,
      dice: dice,
      result: roll_result,
      success: success,
      modifier: character.details.modifier,
    };

    postCombatLog(NewCombatEntry);

    return roll_result;
  };
}

export function postCombatLog(NewCombatEntry: CombatEntry) {
  console.log("Updating Combat Log");
  // selectedCharacter.inventory = inventory; THIS WILL UPDATE THE INVENTORY< BUT NOT PROC THE RE-RENDER
  axios
    .post("http://localhost:8000/api/combatlog/", NewCombatEntry)
    .then((res) => console.log(res));
}
