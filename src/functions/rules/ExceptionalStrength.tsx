import { cloneDeep } from "lodash";
import { CharacterEntry, Actives } from "../../Types";
import { CheckAbility } from "../ActivesFunction";

export function ExceptionalStrength(
  character: CharacterEntry,
  actives: Actives,
) {
  const ability = CheckAbility(character, "exceptional strength", "novice");
  const newChar = cloneDeep(character);
  if (ability) {
    newChar.stats.strong.value += 1;
  }
  return newChar;
}
