import { CharacterEntry, ItemEntry } from "../../Types";
import { IsArmor } from "../UtilityFunctions";
import { CheckEffect } from "../ActivesFunction";

export function FlankedEffect(character: CharacterEntry, item: ItemEntry) {
  let mod = 0;
  const found_effect = CheckEffect(character, "Flanked");
  if (found_effect && IsArmor(item)) {
    mod -= 4;
  }
  return mod;
}
