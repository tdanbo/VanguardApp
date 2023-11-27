import { CharacterEntry, Actives } from "../../Types";
import { CheckAbility } from "../ActivesFunction";

export function NaturalWeapon(character: CharacterEntry, actives: Actives) {
  const ability = CheckAbility(character, "Natural Weapon", "novice");
  const ability_adept = CheckAbility(character, "Natural Weapon", "adept");
  const ability_master = CheckAbility(character, "Natural Weapon", "master");

  if (ability) {
    actives.attack.dice1 = 6;
    actives.attack.dice2 = 6;
  }

  if (ability_adept) {
    actives.attack.dice1 = 8;
    actives.attack.dice2 = 8;
  }

  if (ability_master) {
    actives.attack.dice1 = 10;
    actives.attack.dice2 = 10;
  }
  return actives;
}
