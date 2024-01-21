import { CharacterEntry, ItemEntry } from "../../Types";
import { IsArmor } from "../UtilityFunctions";
function HasItem(character: CharacterEntry, item: string) {
  for (const i of character.inventory) {
    if (i.name === item && i.equip.equipped) {
      return true;
    }
  }
}

export function ItemRulesDice(character: CharacterEntry, item: ItemEntry) {
  let mod = 0;
  if (HasItem(character, "The Haganor Skin")) {
    if (IsArmor(item)) {
      mod += 4;
    }
  }
  return mod;
}
