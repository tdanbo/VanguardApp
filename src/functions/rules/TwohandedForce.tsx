import { CharacterEntry, Actives } from "../../Types";
import { CheckAbility } from "../ActivesFunction";

export function TwohandedForce(character: CharacterEntry, actives: Actives) {
  const ability = CheckAbility(character, "two-handed force", "novice");

  if (ability) {
    character.equipment.main.type === "Heavy Weapon" &&
      (actives.attack.dice1 += 2);

    character.equipment.off.type === "Heavy Weapon" &&
      (actives.attack.dice2 += 2);
  }
  return actives;
}
