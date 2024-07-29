import { CharacterEntry, ItemEntry, RollValueType } from "../../Types";
import { CheckAbility } from "../ActivesFunction";
import { IsArmor } from "../UtilityFunctions";

export function SurvivalInstinct_dice(
  character: CharacterEntry,
  item: ItemEntry,
): RollValueType {
  const name = "survival instinct";
  const roll_value_type: RollValueType = {
    source: name,
    value: 0,
  };

  const ability = CheckAbility(character, name, "novice");
  const ability_adept = CheckAbility(character, name, "adept");
  const ability_master = CheckAbility(character, name, "master");

  let mod = 0;

  if (IsArmor(item)) {
    if (ability_master) {
      console.log("Survival Instinct");
    } else if (ability_adept) {
      console.log("Survival Instinct");
      mod += 4;
    } else if (ability) {
      console.log("Survival Instinct");
    }
  }

  roll_value_type.value = mod;

  return roll_value_type;
}
