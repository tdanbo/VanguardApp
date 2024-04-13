import { CharacterEntry, ItemEntry } from "../../Types";
import { CheckAbility } from "../ActivesFunction";
import { IsArmor } from "../UtilityFunctions";

export function SurvivalInstinct_dice(
  character: CharacterEntry,
  item: ItemEntry,
) {
  const ability_name = "Survival Instinct";
  const ability = CheckAbility(character, ability_name, "novice");
  const ability_adept = CheckAbility(character, ability_name, "adept");
  const ability_master = CheckAbility(character, ability_name, "master");

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
  return mod;
}
