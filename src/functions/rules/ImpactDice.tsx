import { ItemEntry, RollValueType } from "../../Types";
import { IsWeapon } from "../UtilityFunctions";

export function Impact_dice(item: ItemEntry): RollValueType {
  const name = "Impact";
  const roll_value_type: RollValueType = {
    source: name,
    value: 0,
  };

  const is_weapon = IsWeapon(item);

  let mod = 0;

  if (item.static.quality.includes(name) && is_weapon) {
    mod += 2;
  }

  roll_value_type.value = mod;

  return roll_value_type;
}
