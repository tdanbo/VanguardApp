import { CharacterEntry, ItemEntry, RollValueType } from "../../Types";
import { CheckAbility } from "../ActivesFunction";

export function Medicus_dice(
  character: CharacterEntry,
  item: ItemEntry,
): RollValueType {
  const name = "medicus";
  const roll_value_type: RollValueType = {
    source: name,
    type: "buff",
    value: 0,
  };

  const ability = CheckAbility(character, "medicus", "novice");
  let mod = 0;
  if (ability && item.name.includes("Herbal Cure")) {
    mod += 2;
  }

  roll_value_type.value = mod;

  return roll_value_type;
}
//
