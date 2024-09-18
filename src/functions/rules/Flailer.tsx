import { CharacterEntry, ItemEntry, RollValueType } from "../../Types";
import { CheckAbility } from "../ActivesFunction";

export function Flailer_dice(
  character: CharacterEntry,
  item: ItemEntry,
): RollValueType {
  const name = "flailer";
  const roll_value_type: RollValueType = {
    source: name,
    type: "buff",
    value: 0,
  };

  const ability = CheckAbility(character, "flailer", "adept");
  let mod = 0;
  if (ability && item.static.quality.includes("Jointed")) {
    mod += 2;
  }

  roll_value_type.value = mod;

  return roll_value_type;
}
//
