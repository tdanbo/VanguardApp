import { CharacterEntry, ItemEntry } from "../../Types";
import { CheckAbility } from "../ActivesFunction";
import { GetMaxToughness } from "../RulesFunctions";
import { IsMeleeWeapon } from "../UtilityFunctions";

export function FeatOfStrength_dice(
  character: CharacterEntry,
  item: ItemEntry,
) {
  const ability = CheckAbility(character, "feat of strength", "master");
  let mod = 0;
  if (
    ability &&
    character.health.damage >= GetMaxToughness(character) / 2 &&
    IsMeleeWeapon(item)
  ) {
    mod += 4;
  }

  return mod;
}
//
