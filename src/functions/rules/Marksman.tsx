import { CharacterEntry, ItemEntry, RollValueType } from "../../Types";
import { CheckAbility } from "../ActivesFunction";

export function Marksman_dice(character: CharacterEntry, item: ItemEntry) {
  const name = "marksman";
  const roll_value_type: RollValueType = {
    source: name,
    value: 0,
  };

  const ability = CheckAbility(character, name, "novice");
  let mod = 0;
  if (ability && item.static.category === "ranged weapon") {
    mod += 2;
  }

  roll_value_type.value = mod;
  return roll_value_type;
}
