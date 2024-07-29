import { CharacterEntry, ItemEntry, RollValueType } from "../../Types";
import { CheckAbility } from "../ActivesFunction";

export function TwohandedForce_dice(
  character: CharacterEntry,
  item: ItemEntry,
): RollValueType {
  const name = "two-handed force";
  const roll_value_type: RollValueType = {
    source: name,
    value: 0,
  };

  const ability = CheckAbility(character, "two-handed force", "novice");
  let mod = 0;
  if (ability && item.static.category === "heavy weapon") {
    mod += 2;
  }

  roll_value_type.value = mod;

  return roll_value_type;
}
//
