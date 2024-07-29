import { CharacterEntry, RollValueType } from "../../Types";
import { CheckAbility } from "../ActivesFunction";

export function Robust_active(character: CharacterEntry) {
  const ability = CheckAbility(character, "Robust", "novice");
  const ability_adept = CheckAbility(character, "Robust", "adept");
  const ability_master = CheckAbility(character, "Robust", "master");

  if (ability_master) {
    character.stats.defense.mod -= 4;
  } else if (ability_adept) {
    character.stats.defense.mod -= 3;
  } else if (ability) {
    character.stats.defense.mod -= 2;
  }
}

export function Robust_dice(character: CharacterEntry): RollValueType {
  const name = "robust";
  const roll_value_type: RollValueType = {
    source: name,
    type: "buff",
    value: 0,
  };

  const ability = CheckAbility(character, name, "novice");
  const ability_adept = CheckAbility(character, name, "adept");
  const ability_master = CheckAbility(character, name, "master");

  let mod = 0;
  if (ability_master) {
    mod += 8;
  } else if (ability_adept) {
    mod += 6;
  } else if (ability) {
    mod += 4;
  }

  roll_value_type.value = mod;

  return roll_value_type;
}
