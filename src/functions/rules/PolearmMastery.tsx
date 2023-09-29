import { CharacterEntry, Actives } from "../../Types";
import { CheckAbility } from "../ActivesFunction";

export function PolearmMastery(character: CharacterEntry, actives: Actives) {
  const ability = CheckAbility(character, "polearm mastery", "novice");

  if (ability) {
    character.equipment.main.type === "Long Weapon" &&
      (actives.attack.dice1 += 2);

    character.equipment.off.type === "Long Weapon" &&
      (actives.attack.dice2 += 2);
  }
  return actives;
}
