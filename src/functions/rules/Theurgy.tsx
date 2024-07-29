import { AbilityEntry, CharacterEntry } from "../../Types";
import { CheckAbility } from "../ActivesFunction";

export function Theurgy_dice(character: CharacterEntry, ability: AbilityEntry) {
  const ability_master = CheckAbility(character, "Theurgy", "master");

  let mod = 0;

  if (ability_master && ability.static.tradition.includes("theurgy")) {
    mod += 5;
  }
  return mod;
}
