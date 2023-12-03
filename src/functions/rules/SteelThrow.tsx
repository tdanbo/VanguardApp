import { CharacterEntry, Actives } from "../../Types";
import { CheckAbility } from "../ActivesFunction";

export function SteelThrow(character: CharacterEntry, actives: Actives) {
  const ability = CheckAbility(character, "steel throw", "novice");

  if (ability) {
    character.equipment.main.type === "Throwing Weapon" &&
      (actives.attack.dice1 = 8);
    character.equipment.off.type === "Throwing Weapon" &&
      (actives.attack.dice2 = 8);
  }

  return actives;
}
