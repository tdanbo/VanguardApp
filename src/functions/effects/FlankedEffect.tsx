import { CharacterEntry, ItemEntry, RollValueType } from "../../Types";
import { IsArmor } from "../UtilityFunctions";
import { CheckEffect } from "../ActivesFunction";

export function FlankedEffect(
  character: CharacterEntry,
  item: ItemEntry,
): RollValueType {
  const name = "Flanked";
  const roll_value_type: RollValueType = {
    source: name,
    type: "buff",
    value: 0,
  };
  let mod = 0;
  const found_effect = CheckEffect(character, "Flanked");
  if (found_effect && IsArmor(item)) {
    mod -= 4;
  }

  roll_value_type.value = mod;
  return roll_value_type;
}
