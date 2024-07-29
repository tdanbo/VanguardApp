import { CharacterEntry, ItemEntry, RollValueType } from "../../Types";
import { CheckAbility } from "../ActivesFunction";

function dualWielding(character: CharacterEntry) {
  let count = 0;
  for (const item of character.inventory) {
    if (
      item.equipped &&
      ["short weapon", "one-hand weapon"].includes(item.static.category)
    ) {
      count += 1;
    }
    if (count >= 2) {
      return true;
    }
  }
}

function equipList(character: CharacterEntry) {
  let equipList: ItemEntry[] = [];
  for (const item of character.inventory) {
    if (item.equipped) {
      equipList.push(item);
    }
  }
  return equipList;
}

export function TwinAttack_active(character: CharacterEntry) {
  const ability_name = "Twin Attack";
  const ability_master = CheckAbility(character, ability_name, "master");

  if (!dualWielding(character)) {
    return;
  }

  if (ability_master) {
    character.stats.defense.mod += 1;
  }
}

export function TwinAttack_dice(
  character: CharacterEntry,
  item: ItemEntry,
): RollValueType {
  const name = "twin attack";
  const roll_value_type: RollValueType = {
    source: name,
    value: 0,
  };

  const ability = CheckAbility(character, name, "novice");
  const ability_adept = CheckAbility(character, name, "adept");
  const ability_master = CheckAbility(character, name, "master");

  let mod = 0;
  if (!dualWielding(character)) {
    return roll_value_type;
  }

  if (!item.equipped) {
    return roll_value_type;
  }

  const equipment_list = equipList(character);

  if (ability_master) {
    for (const [index, equip_item] of equipment_list.entries()) {
      if (
        equip_item.id === item.id &&
        item.static.category === "one-hand weapon"
      ) {
        if (index === 0) {
          mod += 2;
        } else {
          mod += 0;
        }
      } else if (
        equip_item.id === item.id &&
        item.static.category === "short weapon"
      ) {
        if (index === 0) {
          mod += 4;
        } else {
          mod += 2;
        }
      }
    }
  } else if (ability_adept) {
    for (const [index, equip_item] of equipment_list.entries()) {
      if (
        equip_item.id === item.id &&
        item.static.category === "one-hand weapon"
      ) {
        if (index === 0) {
          mod += 0;
        } else {
          mod += 0;
        }
      } else if (
        equip_item.id === item.id &&
        item.static.category === "short weapon"
      ) {
        if (index === 0) {
          mod += 2;
        } else {
          mod += 2;
        }
      }
    }
  } else if (ability) {
    for (const [index, equip_item] of equipment_list.entries()) {
      if (
        equip_item.id === item.id &&
        item.static.category === "one-hand weapon"
      ) {
        if (index === 0) {
          mod += 0;
        } else {
          mod -= 2;
        }
      } else if (
        equip_item.id === item.id &&
        item.static.category === "short weapon"
      ) {
        if (index === 0) {
          mod += 2;
        } else {
          mod += 0;
        }
      }
    }
  }

  roll_value_type.value = mod;

  return roll_value_type;
}
