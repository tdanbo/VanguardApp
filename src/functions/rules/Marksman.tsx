import { CharacterEntry, Actives } from "../../Types";
import { CheckAbility } from "../ActivesFunction";

export function Marksman(character: CharacterEntry, actives: Actives) {
  const ability = CheckAbility(character, "marksman", "novice");

  if (ability) {
    character.equipment.main.type === "Ranged Weapon" &&
      (actives.attack.dice1 += 2);

    character.equipment.off.type === "Ranged Weapon" &&
      (actives.attack.dice2 += 2);
  }
  return actives;
}
