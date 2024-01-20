import { CharacterEntry, ActivesEntry } from "../../Types";
import { CheckAbility } from "../ActivesFunction";

export function Robust_active(
  character: CharacterEntry,
  actives: ActivesEntry,
) {
  const ability = CheckAbility(character, "Robust", "novice");
  const ability_adept = CheckAbility(character, "Robust", "adept");
  const ability_master = CheckAbility(character, "Robust", "master");

  if (ability_master) {
    actives.defense.value -= 4;
  } else if (ability_adept) {
    actives.defense.value -= 3;
  } else if (ability) {
    actives.defense.value -= 2;
  }
}

export function Robust_dice(character: CharacterEntry) {
  const ability = CheckAbility(character, "Robust", "novice");
  const ability_adept = CheckAbility(character, "Robust", "adept");
  const ability_master = CheckAbility(character, "Robust", "master");

  let mod = 0;
  if (ability_master) {
    mod += 8;
  } else if (ability_adept) {
    mod += 6;
  } else if (ability) {
    mod += 4;
  }

  return mod;
}
