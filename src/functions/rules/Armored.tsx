import { CharacterEntry, Actives } from "../../Types";
import { CheckAbility } from "../ActivesFunction";

export function Armored(character: CharacterEntry, actives: Actives) {
  const ability_name = "Armored";
  const ability = CheckAbility(character, ability_name, "novice");
  const ability_adept = CheckAbility(character, ability_name, "adept");
  const ability_master = CheckAbility(character, ability_name, "master");

  if (ability_master) {
    actives.defense.dice += 8;
  } else if (ability_adept) {
    actives.defense.dice += 6;
  } else if (ability) {
    actives.defense.dice += 4;
  }
  return actives;
}
