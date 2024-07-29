import { CharacterEntry, ItemEntry, RollValueType } from "../../Types";
import { CheckAbility } from "../ActivesFunction";

export function PolearmMastery_dice(
  character: CharacterEntry,
  item: ItemEntry,
) {
  const name = "polearm mastery";
  const roll_value_type: RollValueType = {
    source: name,
    type: "buff",
    value: 0,
  };

  const ability = CheckAbility(character, "polearm mastery", "novice");
  let mod = 0;
  if (ability && item.static.category === "long weapon") {
    mod += 2;
  }

  roll_value_type.value = mod;
  return roll_value_type;
}
