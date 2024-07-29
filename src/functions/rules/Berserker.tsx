import { CharacterEntry, ItemEntry, RollValueType } from "../../Types";
import { CheckAbility } from "../ActivesFunction";
import { IsWeapon } from "../UtilityFunctions";
export function Berserker_active(character: CharacterEntry) {
  const ability_name = "Berserker";
  const ability = CheckAbility(character, ability_name, "novice");
  const ability_adept = CheckAbility(character, ability_name, "adept");
  const ability_master = CheckAbility(character, ability_name, "master");

  const defense = character.stats.defense.value + character.stats.defense.mod;

  if (ability_master) {
    return;
  } else if (ability_adept) {
    character.stats.defense.mod = 5 - defense;
  } else if (ability) {
    character.stats.defense.mod = 5 - defense;
  }
}

export function Berserker_dice(
  character: CharacterEntry,
  item: ItemEntry,
): RollValueType {
  const name = "berserker";
  const roll_value_type: RollValueType = {
    source: name,
    value: 0,
  };

  const ability = CheckAbility(character, name, "novice");
  const ability_adept = CheckAbility(character, name, "adept");
  const ability_master = CheckAbility(character, name, "master");

  let mod = 0;

  const is_weapon = IsWeapon(item);

  if (ability_master) {
    if (is_weapon) {
      mod += 6; // Berserker adds 4 to armor dice on armor
    } else {
      mod += 4; // Berserker adds 6 to attack dice on weapons
    }
  } else if (ability_adept) {
    if (is_weapon) {
      mod += 6; // Berserker adds 4 to armor dice on armor
    } else {
      mod += 4; // Berserker adds 6 to attack dice on weapons
    }
  } else if (ability) {
    if (is_weapon) {
      mod += 6;
    }
  }

  roll_value_type.value = mod;

  return roll_value_type;
}
