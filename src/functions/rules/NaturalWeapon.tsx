import { CharacterEntry, ItemEntry } from "../../Types";
import { CheckAbility } from "../ActivesFunction";

export function NaturalWeapon_dice(character: CharacterEntry, item: ItemEntry) {
  const ability = CheckAbility(character, "Natural Weapon", "novice");
  const ability_adept = CheckAbility(character, "Natural Weapon", "adept");
  const ability_master = CheckAbility(character, "Natural Weapon", "master");

  let mod = 0;

  if (item.category === "natural weapon") {
    if (ability_master) {
      mod += 6;
    } else if (ability_adept) {
      mod += 4;
    } else if (ability) {
      mod += 2;
    }
  }

  return mod;
}
