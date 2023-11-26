import { CharacterEntry, Actives } from "../../Types";
import { CheckAbility } from "../ActivesFunction";

export function TwohandedForce(character: CharacterEntry, actives: Actives) {
  const ability = CheckAbility(character, "two-handed force", "novice");
  const ability_adept = CheckAbility(character, "two-handed force", "adept");
  if (ability) {
    character.equipment.main.type === "Heavy Weapon" &&
      (actives.attack.dice1 = 12);
    character.equipment.off.type === "Heavy Weapon" &&
      (actives.attack.dice2 = 12);
  }

  if (ability_adept) {
    character.equipment.main.type === "Heavy Weapon" &&
      (actives.attack.attacks = 2);
    character.equipment.off.type === "Heavy Weapon" &&
      (actives.attack.attacks = 2);
  }
  return actives;
}
