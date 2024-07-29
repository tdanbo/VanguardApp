import { CharacterEntry, ItemEntry, RollValueType } from "../../Types";
import { IsWeapon } from "../UtilityFunctions";
import { CheckEffect } from "../ActivesFunction";

export function CriticalStrikeEffect(
  character: CharacterEntry,
  item: ItemEntry,
): RollValueType {
  const name = "Critical Strike";
  const roll_value_type: RollValueType = {
    source: name,
    type: "buff",
    value: 0,
  };

  let mod = 0;
  const found_effect = CheckEffect(character, "Critical Strike");
  if (found_effect && IsWeapon(item)) {
    mod += 6;
  }

  roll_value_type.value = mod;

  return roll_value_type;
}
