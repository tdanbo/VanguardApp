import { CharacterEntry, ItemEntry, RollValueType } from "../../Types";
import { CheckAbility } from "../ActivesFunction";

export function SteelThrow_dice(character: CharacterEntry, item: ItemEntry) {
  const name = "steel throw";
  const roll_value_type: RollValueType = {
    source: name,
    value: 0,
  };

  const ability = CheckAbility(character, "steel throw", "novice");

  let mod = 0;
  if (ability && item.static.category === "throwing weapon") {
    mod += 2;
  }

  roll_value_type.value = mod;

  return roll_value_type;
}
