import { CharacterEntry, ItemEntry } from "../../Types";
import { IsWeapon } from "../UtilityFunctions";
import { CheckEffect } from "../ActivesFunction";

export function FlankingEffect(character: CharacterEntry, item: ItemEntry) {
  let mod = 0;
  const found_effect = CheckEffect(character, "Flanking");
  if (found_effect && IsWeapon(item)) {
    mod += 4;
  }
  return mod;
}
