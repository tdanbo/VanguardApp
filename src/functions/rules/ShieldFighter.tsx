import { CharacterEntry, ItemEntry, RollValueType } from "../../Types";
import { CheckAbility } from "../ActivesFunction";

function hasShield(character: CharacterEntry) {
  for (const item of character.inventory) {
    if (item.equipped && item.static.category === "shield") {
      return true;
    }
  }
}

export function ShieldFighter_active(character: CharacterEntry) {
  const ability = CheckAbility(character, "Shield Fighter", "novice");
  let mod = 0;
  if (ability) {
    if (hasShield(character)) {
      mod += 1;
    }
  }
  character.stats.defense.mod += mod;
}

export function ShieldFighter_dice(
  character: CharacterEntry,
  item: ItemEntry,
): RollValueType {
  const name = "shield fighter";
  const roll_value_type: RollValueType = {
    source: name,
    value: 0,
  };

  const ability = CheckAbility(character, name, "novice");
  let mod = 0;
  if (ability) {
    if (
      hasShield(character) &&
      ["short weapon", "one-hand weapon"].includes(item.static.category)
    ) {
      mod += 2;
    }
  }

  roll_value_type.value = mod;

  return roll_value_type;
}
