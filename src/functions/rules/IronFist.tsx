import { CharacterEntry, ItemEntry } from "../../Types";
import { CheckAbility } from "../ActivesFunction";
import { IsMeleeWeapon } from "../UtilityFunctions";
export function IronFist_dice(character: CharacterEntry, item: ItemEntry) {
  const ability_name = "Iron Fist";
  const ability = CheckAbility(character, ability_name, "novice");
  const ability_adept = CheckAbility(character, ability_name, "adept");

  let mod = 0;
  if (!IsMeleeWeapon(item)) {
    return mod;
  }

  if (ability_adept) {
    mod += 4;
  } else if (ability) {
    return mod;
  }

  return mod;
}
