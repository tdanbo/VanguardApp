import { CharacterEntry, ItemEntry, ActivesEntry } from "../../Types";
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

export function TwinAttack_active(
  character: CharacterEntry,
  actives: ActivesEntry,
) {
  const ability_name = "Twin Attack";
  const ability_master = CheckAbility(character, ability_name, "master");

  if (!dualWielding(character)) {
    return;
  }

  if (ability_master) {
    actives.defense.value += 1;
  }
}

export function TwinAttack_dice(character: CharacterEntry, item: ItemEntry) {
  const ability_name = "Twin Attack";
  const ability = CheckAbility(character, ability_name, "novice");
  const ability_adept = CheckAbility(character, ability_name, "adept");
  const ability_master = CheckAbility(character, ability_name, "master");

  let mod = 0;
  if (!dualWielding(character)) {
    return mod;
  }

  if (!item.equipped) {
    return mod;
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
  return mod;
}
