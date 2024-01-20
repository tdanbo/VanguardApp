import { CharacterEntry, ItemEntry, ActivesEntry } from "../../Types";
import { CheckAbility } from "../ActivesFunction";

function hasShield(character: CharacterEntry) {
  for (const item of character.inventory) {
    if (
      item.equip.equipped &&
      ["Steel Shield", "Buckler", "Shield"].includes(item.name)
    ) {
      return true;
    }
  }
}

export function ShieldFighter_active(
  character: CharacterEntry,
  actives: ActivesEntry,
) {
  const ability = CheckAbility(character, "Shield Fighter", "novice");
  let mod = 0;
  if (ability) {
    if (hasShield(character)) {
      mod += 1;
    }
  }
  actives.defense.value += mod;
}

export function ShieldFighter_dice(character: CharacterEntry, item: ItemEntry) {
  const ability = CheckAbility(character, "Shield Fighter", "novice");
  let mod = 0;
  if (ability) {
    if (
      hasShield(character) &&
      ["Short Weapon", "One-hand Weapon"].includes(item.type)
    ) {
      mod += 2;
    }
  }
  return mod;
}
