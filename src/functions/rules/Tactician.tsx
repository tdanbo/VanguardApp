import { CharacterEntry, Actives } from "../../Types";
import { CheckAbility } from "../ActivesFunction";

export function Tactician(character: CharacterEntry, actives: Actives) {
  const ability_name = "Tactician";
  const ability = CheckAbility(character, ability_name, "novice");
  const ability_adept = CheckAbility(character, ability_name, "adept");
  const ability_master = CheckAbility(character, ability_name, "master");

  if (ability_master) {
    console.log("Tactician");
  } else if (ability_adept) {
    console.log("Tactician");
  } else if (ability) {
    console.log("Tactician");
  }
  return actives;
}
