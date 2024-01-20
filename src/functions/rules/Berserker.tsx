import { CharacterEntry, ActivesEntry, ItemEntry } from "../../Types";
import { CheckAbility } from "../ActivesFunction";

export function Berserker_active(
  character: CharacterEntry,
  actives: ActivesEntry,
) {
  const ability_name = "Berserker";
  const ability = CheckAbility(character, ability_name, "novice");
  const ability_adept = CheckAbility(character, ability_name, "adept");
  const ability_master = CheckAbility(character, ability_name, "master");

  if (ability_master) {
    return;
  } else if (ability_adept) {
    actives.defense.value = 5;
  } else if (ability) {
    actives.defense.value = 5;
  }
}

export function Berserker_dice(character: CharacterEntry, item: ItemEntry) {
  const ability_name = "Berserker";
  const ability = CheckAbility(character, ability_name, "novice");
  const ability_adept = CheckAbility(character, ability_name, "adept");
  const ability_master = CheckAbility(character, ability_name, "master");

  let mod = 0;

  if (ability_master) {
    if (item.category === "weapon") {
      mod += 6; // Berserker adds 4 to armor dice on armor
    } else {
      mod += 4; // Berserker adds 6 to attack dice on weapons
    }
  } else if (ability_adept) {
    if (item.category === "weapon") {
      mod += 6; // Berserker adds 4 to armor dice on armor
    } else {
      mod += 4; // Berserker adds 6 to attack dice on weapons
    }
  } else if (ability) {
    if (item.category === "weapon") {
      mod += 6;
    }
  }

  return mod;
}
