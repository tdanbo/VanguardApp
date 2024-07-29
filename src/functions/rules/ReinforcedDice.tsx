import { ItemEntry, RollValueType } from "../../Types";
import { IsArmor } from "../UtilityFunctions";

export function Reinforced_dice(item: ItemEntry): RollValueType {
  const name = "Reinforced";
  const roll_value_type: RollValueType = {
    source: name,
    value: 0,
  };

  const is_armor = IsArmor(item);

  let mod = 0;

  if (item.static.quality.includes(name) && is_armor) {
    mod += 2;
  }

  roll_value_type.value = mod;

  return roll_value_type;
}
