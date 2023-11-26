import { CharacterEntry, Actives } from "../../Types";
import { CheckAbility } from "../ActivesFunction";

export function Robust(character: CharacterEntry, actives: Actives) {
  const ability = CheckAbility(character, "robust", "novice");
  const ability_adept = CheckAbility(character, "robust", "adept");
  const ability_master = CheckAbility(character, "robust", "master");

  if (ability) {
    actives.attack.dice1 += 4;
    actives.attack.dice2 += 4;
    actives.defense.value -= 2;
  }

  if (ability_adept) {
    actives.attack.dice1 += 6;
    actives.attack.dice2 += 6;
    actives.defense.value -= 3;
  }

  if (ability_master) {
    actives.attack.dice1 += 8;
    actives.attack.dice2 += 8;
    actives.defense.value -= 4;
  }
  return actives;
}
