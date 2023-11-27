import { CharacterEntry, Actives } from "../../Types";
import { CheckAbility } from "../ActivesFunction";

export function Robust(character: CharacterEntry, actives: Actives) {
  const ability = CheckAbility(character, "Robust", "novice");
  const ability_adept = CheckAbility(character, "Robust", "adept");
  const ability_master = CheckAbility(character, "Robust", "master");

  if (ability_master) {
    actives.attack.dice1 += 8;
    actives.attack.dice2 += 8;
    actives.defense.dice += 8;
    actives.defense.value -= 4;
  } else if (ability_adept) {
    actives.attack.dice1 += 6;
    actives.attack.dice2 += 6;
    actives.defense.dice += 6;
    actives.defense.value -= 3;
  } else if (ability) {
    actives.attack.dice1 += 4;
    actives.attack.dice2 += 4;
    actives.defense.dice += 4;
    actives.defense.value -= 2;
  }

  return actives;
}
