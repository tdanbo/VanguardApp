import { CharacterEntry, ItemEntry } from "../../Types";
import { IsMeleeWeapon } from "../UtilityFunctions";
import { CheckEffect } from "../ActivesFunction";

export function IronFistEffect(character: CharacterEntry, item: ItemEntry) {
  let mod = 0;
  const found_effect = CheckEffect(character, "Iron Fist");
  if (found_effect && IsMeleeWeapon(item)) {
    mod += 5;
  }
  return mod;
}
