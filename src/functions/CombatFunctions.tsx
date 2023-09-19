import axios from "axios";
import { CombatEntry } from "../Types";
import { useContext } from "react";
import { CharacterContext } from "../contexts/CharacterContext";
import { setBaseModifier } from "./CharacterFunctions";
import { SessionContext } from "../contexts/SessionContext";

export async function getCombatLog(id: string): Promise<CombatEntry[]> {
  const response = await axios.get<CombatEntry[]>(
    `http://localhost:8000/api/combatlog/${id}`,
  );
  return response.data;
}

interface RollDiceProps {
  dice: string;
  type: string;
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

  return ({ dice, count, target, type, add_mod }: RollDiceProps) => {
    let total = 0;

    const diceValues = extractDiceValue(dice);
    if (!diceValues) {
      throw new Error("Invalid dice string format");
    }

    const { dice: dice_number, modifier: dice_modifier } = diceValues;

    character.details.modifier += dice_modifier;

    for (let i = 0; i < count; i++) {
      total += Math.floor(Math.random() * dice_number) + 1;
    }

    console.log(total);

    if (add_mod == true) {
      total += character.details.modifier;
    }

    console.log("add mod:", add_mod);
    console.log(total);

    const roll_result = total;

    let success = true;
    if (roll_result > target) {
      success = false;
    }

    console.log(roll_result);

    const NewCombatEntry: CombatEntry = {
      id: session.id,
      character: character.details.name,
      type: type,
      dice: dice,
      result: roll_result,
      target: target,
      success: success,
      modifier: character.details.modifier,
      add: add_mod,
    };

    const updated_character = setBaseModifier(character, 0);
    setCharacter(updated_character);

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
