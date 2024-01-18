import { CharacterEntry, ItemEntry } from "../../Types";
import { CheckAbility } from "../ActivesFunction";

export function NaturalWarrior_dice(
  character: CharacterEntry,
  item: ItemEntry,
) {
  const ability = CheckAbility(character, "Natural Warrior", "novice");
  const ability_adept = CheckAbility(character, "Natural Warrior", "adept");
  const ability_master = CheckAbility(character, "Natural Warrior", "master");

  let mod = 0;
  if (item.type === "Natural Weapon") {
    if (ability_master) {
      mod += 6;
    } else if (ability_adept) {
      mod += 2;
    } else if (ability) {
      mod += 2;
    }
  }
  return mod;
}
