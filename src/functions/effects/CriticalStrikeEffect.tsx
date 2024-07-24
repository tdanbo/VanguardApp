import { CharacterEntry, ItemEntry } from "../../Types";
import { IsWeapon } from "../UtilityFunctions";
import { CheckEffect } from "../ActivesFunction";

export function CriticalStrikeEffect(
  character: CharacterEntry,
  item: ItemEntry,
) {
  let mod = 0;
  const found_effect = CheckEffect(character, "Critical Strike");
  if (found_effect && IsWeapon(item)) {
    mod += 6;
  }
  return mod;
}
