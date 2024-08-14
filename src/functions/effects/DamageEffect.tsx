import { CharacterEntry, ItemEntry, RollValueType } from "../../Types";
import { CheckEffect } from "../ActivesFunction";
import { IsWeapon } from "../UtilityFunctions";

export function DamageEffect(
  character: CharacterEntry,
  item: ItemEntry,
): RollValueType {
  const name = "damage effect";
  const roll_value_type: RollValueType = {
    source: name,
    type: "buff",
    value: 0,
  };
  let mod = 0;
  const found_effect = CheckEffect(character, "Damage");
  if (found_effect && IsWeapon(item)) {
    mod += found_effect.level;
  }
  roll_value_type.value = mod;
  return roll_value_type;
}
