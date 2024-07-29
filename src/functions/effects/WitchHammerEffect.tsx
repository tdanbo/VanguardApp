import { CharacterEntry, ItemEntry, RollValueType } from "../../Types";
import { CheckEffect } from "../ActivesFunction";
import { IsWeapon } from "../UtilityFunctions";
export function WitchHammerEffect(
  character: CharacterEntry,
  item: ItemEntry,
): RollValueType {
  const name = "Witch Hammer";
  const roll_value_type: RollValueType = {
    source: name,
    type: "buff",
    value: 0,
  };

  const found_effect = CheckEffect(character, name);
  const is_weapon = IsWeapon(item);

  let mod = 0;

  if (found_effect && is_weapon) {
    mod +=
      found_effect.static.base_amount +
      found_effect.static.level_amount * (found_effect.level - 1);
  }

  roll_value_type.value = mod;

  return roll_value_type;
}
