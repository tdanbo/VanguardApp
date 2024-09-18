import { CharacterEntry, ItemEntry, RollValueType } from "../../Types";
import { CheckEffect } from "../ActivesFunction";
import { IsArmor } from "../UtilityFunctions";

export function ArmorEffect(
  character: CharacterEntry,
  item: ItemEntry,
): RollValueType {
  const name = "armor effect";
  const roll_value_type: RollValueType = {
    source: name,
    type: "buff",
    value: 0,
  };
  let mod = 0;
  const found_effect = CheckEffect(character, "Armor");
  if (found_effect && IsArmor(item)) {
    mod += found_effect.level;
  }
  roll_value_type.value = mod;
  return roll_value_type;
}
