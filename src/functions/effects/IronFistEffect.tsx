import { CharacterEntry, ItemEntry, RollValueType } from "../../Types";
import { IsMeleeWeapon } from "../UtilityFunctions";
import { CheckEffect } from "../ActivesFunction";

export function IronFistEffect(
  character: CharacterEntry,
  item: ItemEntry,
): RollValueType {
  const name = "iron fist effect";
  const roll_value_type: RollValueType = {
    source: name,
    value: 0,
  };
  let mod = 0;
  const found_effect = CheckEffect(character, "Iron Fist");
  if (found_effect && IsMeleeWeapon(item)) {
    mod += 5;
  }
  roll_value_type.value = mod;
  return roll_value_type;
}
