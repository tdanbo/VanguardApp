import { CharacterEntry, Actives } from "../../Types";
import { CheckAbility } from "../ActivesFunction";

export function IronFist(character: CharacterEntry, actives: Actives) {
  const ability_name = "Iron Fist";
  const ability = CheckAbility(character, ability_name, "novice");
  const ability_adept = CheckAbility(character, ability_name, "adept");
  const ability_master = CheckAbility(character, ability_name, "master");

  if (ability_master) {
    actives.attack.dice1 += 8;
    actives.attack.dice2 += 8;
  } else if (ability_adept) {
    actives.attack.dice1 += 4;
    actives.attack.dice2 += 4;
  } else if (ability) {
    console.log("Iron Fist");
  }

  return actives;
}
