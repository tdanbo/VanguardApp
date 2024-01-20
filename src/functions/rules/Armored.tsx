import { CharacterEntry, ItemEntry } from "../../Types";
import { CheckAbility } from "../ActivesFunction";

export function Armored_dice(character: CharacterEntry, item: ItemEntry) {
  const ability_name = "Armored";
  const ability = CheckAbility(character, ability_name, "novice");
  const ability_adept = CheckAbility(character, ability_name, "adept");
  const ability_master = CheckAbility(character, ability_name, "master");

  let mod = 0;
  if (item.type !== "Natural Armor") {
    return mod;
  }

  if (ability_master) {
    mod += 8;
  } else if (ability_adept) {
    mod += 6;
  } else if (ability) {
    mod += 4;
  }
  return mod;
}
