import { CharacterEntry, ItemEntry, RollValueType } from "../../Types";
import { CheckEffect } from "../ActivesFunction";
import { IsRangedWeapon } from "../CharacterFunctions";

export function HuntersInstinctEffect(
  character: CharacterEntry,
  item: ItemEntry,
): RollValueType {
  const name = "Hunter's Instinct";
  const roll_value_type: RollValueType = {
    source: name,
    type: "buff",
    value: 0,
  };

  let mod = 0;
  const found_effect = CheckEffect(character, name);
  if (found_effect && found_effect.level > 1 && IsRangedWeapon(item)) {
    mod += 5;
  }

  roll_value_type.value = mod;
  return roll_value_type;
}
