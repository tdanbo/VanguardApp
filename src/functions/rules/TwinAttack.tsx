import { CharacterEntry, Actives } from "../../Types";
import { CheckAbility } from "../ActivesFunction";

export function TwinAttack(character: CharacterEntry, actives: Actives) {
  const ability_name = "Twin Attack";
  const ability = CheckAbility(character, ability_name, "novice");
  const ability_adept = CheckAbility(character, ability_name, "adept");
  const ability_master = CheckAbility(character, ability_name, "master");

  if (ability_master) {
    if (character.equipment.main.type === "One-hand Weapon") {
      actives.attack.dice1 += 2;
    }
    if (character.equipment.off.type === "Short Weapon") {
      actives.attack.dice2 += 2;
    }
    actives.attack.attacks += 1;
    actives.defense.value += 1;
  } else if (ability_adept) {
    if (character.equipment.off.type === "Short Weapon") {
      actives.attack.dice2 += 2;
    }
    actives.attack.attacks += 1;
    actives.defense.value += 1;
  } else if (ability) {
    actives.attack.attacks += 1;
    actives.defense.value += 1;
  }
  return actives;
}
