import { CharacterEntry } from "../../Types";
import { CheckAbility } from "../ActivesFunction";

function hasWeakStaff(character: CharacterEntry) {
  for (const item of character.inventory) {
    if (item.equipped && ["Rune Staff", "Wooden Staff"].includes(item.name)) {
      return true;
    }
  }
}

function hasStrongStaff(character: CharacterEntry) {
  for (const item of character.inventory) {
    if (
      item.equipped &&
      ["Sturdy Staff", "Quarterstaff", "Chain Staff"].includes(item.name)
    ) {
      return true;
    }
  }
}

export function StaffFighting_active(character: CharacterEntry) {
  const ability = CheckAbility(character, "Staff Fighting", "novice");
  let mod = 0;
  if (ability) {
    if (hasWeakStaff(character)) {
      mod += 1;
    } else if (hasStrongStaff(character)) {
      mod += 2;
    }
  }
  character.stats.defense.mod += mod;
}
