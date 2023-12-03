import { CharacterEntry, Actives } from "../../Types";
import { CheckAbility } from "../ActivesFunction";

export function Berserker(character: CharacterEntry, actives: Actives) {
  const ability_name = "Berserker";
  const ability = CheckAbility(character, ability_name, "novice");
  const ability_adept = CheckAbility(character, ability_name, "adept");
  const ability_master = CheckAbility(character, ability_name, "master");

  if (ability_master) {
    actives.attack.dice1 += 6;
    actives.attack.dice2 += 6;
    actives.defense.dice += 4;
  } else if (ability_adept) {
    actives.attack.dice1 += 6;
    actives.attack.dice2 += 6;
    actives.defense.dice += 4;
    actives.defense.value = 5;
  } else if (ability) {
    actives.attack.dice1 += 6;
    actives.attack.dice2 += 6;
    actives.defense.value = 5;
  }

  return actives;
}
