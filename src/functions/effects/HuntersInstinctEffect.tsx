import { CharacterEntry, ItemEntry, RollValueType } from "../../Types";
import { CheckAbility } from "../ActivesFunction";
import { IsRangedWeapon } from "../CharacterFunctions";

export function HuntersInstinct_dice(
  character: CharacterEntry,
  item: ItemEntry,
): RollValueType {
  const name = "Hunter's Instinct";
  const roll_value_type: RollValueType = {
    source: name,
    type: "buff",
    value: 0,
  };

  let mod = 0;
  const found_ability = CheckAbility(character, name, "adept");
  if (found_ability && IsRangedWeapon(item)) {
    mod += 5;
  }

  roll_value_type.value = mod;
  return roll_value_type;
}
