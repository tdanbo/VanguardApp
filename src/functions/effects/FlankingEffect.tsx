import { CharacterEntry, ItemEntry, RollValueType } from "../../Types";
import { IsWeapon } from "../UtilityFunctions";
import { CheckEffect } from "../ActivesFunction";

export function FlankingEffect(
  character: CharacterEntry,
  item: ItemEntry,
): RollValueType {
  const name = "Flanking";
  const roll_value_type: RollValueType = {
    source: name,
    type: "buff",
    value: 0,
  };

  let mod = 0;
  const found_effect = CheckEffect(character, "Flanking");
  if (found_effect && IsWeapon(item)) {
    mod += 4;
  }

  roll_value_type.value = mod;

  return roll_value_type;
}
