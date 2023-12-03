import { CharacterEntry, Actives } from "../../Types";
import { CheckAbility } from "../ActivesFunction";

export function NaturalWarrior(character: CharacterEntry, actives: Actives) {
  const ability = CheckAbility(character, "Natural Warrior", "novice");
  const ability_adept = CheckAbility(character, "Natural Warrior", "adept");
  const ability_master = CheckAbility(character, "Natural Warrior", "master");

  if (ability_master) {
    actives.attack.dice1 += 6;
    actives.attack.dice2 += 6;
    actives.attack.attacks = 2;
  } else if (ability_adept) {
    actives.attack.dice1 += 2;
    actives.attack.dice2 += 2;
    actives.attack.attacks = 2;
  } else if (ability) {
    actives.attack.dice1 += 2;
    actives.attack.dice2 += 2;
  }
  return actives;
}
