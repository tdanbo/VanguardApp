import { CharacterEntry, ItemEntry, ActivesEntry } from "../../Types";
import { CheckAbility } from "../ActivesFunction";
import { GetDatabaseEquipment } from "../UtilityFunctions";

function hasShield(character: CharacterEntry, equipment: ItemEntry[]) {
  for (const item of character.inventory) {
    const item_database = GetDatabaseEquipment(item, equipment);
    if (item.equipped && item_database.category === "shield") {
      return true;
    }
  }
}

export function ShieldFighter_active(
  character: CharacterEntry,
  actives: ActivesEntry,
  equipment: ItemEntry[],
) {
  const ability = CheckAbility(character, "Shield Fighter", "novice");
  let mod = 0;
  if (ability) {
    if (hasShield(character, equipment)) {
      mod += 1;
    }
  }
  actives.defense.value += mod;
}

export function ShieldFighter_dice(
  character: CharacterEntry,
  item: ItemEntry,
  equipment: ItemEntry[],
) {
  const ability = CheckAbility(character, "Shield Fighter", "novice");
  let mod = 0;
  if (ability) {
    if (
      hasShield(character, equipment) &&
      ["short weapon", "one-hand weapon"].includes(item.category)
    ) {
      mod += 2;
    }
  }
  return mod;
}
