import { CharacterEntry, ItemEntry, RollValueType } from "../../Types";
import { CheckAbility } from "../ActivesFunction";
import { IsMeleeWeapon } from "../UtilityFunctions";
export function IronFist_dice(
  character: CharacterEntry,
  item: ItemEntry,
): RollValueType {
  const name = "iron fist";
  const roll_value_type: RollValueType = {
    source: name,
    type: "buff",
    value: 0,
  };

  const ability = CheckAbility(character, name, "novice");
  const ability_adept = CheckAbility(character, name, "adept");

  let mod = 0;
  if (!IsMeleeWeapon(item)) {
    return roll_value_type;
  }

  if (ability_adept) {
    mod += 4;
  } else if (ability) {
    return roll_value_type;
  }

  roll_value_type.value = mod;

  return roll_value_type;
}
