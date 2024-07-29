import { CharacterEntry, ItemEntry, RollValueType } from "../../Types";
import { CheckAbility, CheckEffect } from "../ActivesFunction";
import { IsArmor } from "../UtilityFunctions";
export function BlessedShieldEffect(
  character: CharacterEntry,
  item: ItemEntry,
): RollValueType {
  const name = "Blessed Shield";
  const roll_value_type: RollValueType = {
    source: name,
    type: "buff",
    value: 0,
  };

  const found_effect = CheckEffect(character, name);
  const theurgy_master = CheckAbility(character, "Theurgy", "master");
  const is_armor = IsArmor(item);

  let mod = 0;

  if (found_effect && is_armor) {
    mod +=
      found_effect.static.base_amount +
      found_effect.static.level_amount * (found_effect.level - 1);

    if (theurgy_master) {
      mod += 5;
    }
  }

  roll_value_type.value = mod;

  return roll_value_type;
}
