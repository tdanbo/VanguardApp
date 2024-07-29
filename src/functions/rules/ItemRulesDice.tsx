import { CharacterEntry, ItemEntry, RollValueType } from "../../Types";
import { IsArmor } from "../UtilityFunctions";
function HasItem(character: CharacterEntry, item: string) {
  for (const i of character.inventory) {
    if (i.name.toLowerCase() === item.toLowerCase() && i.equipped) {
      return true;
    }
  }
}

export function ItemRulesDice(
  character: CharacterEntry,
  item: ItemEntry,
): RollValueType {
  const name = "the haganor skin";
  const roll_value_type: RollValueType = {
    source: name,
    value: 0,
  };

  let mod = 0;
  if (HasItem(character, name)) {
    if (IsArmor(item)) {
      mod += 4;
    }
  }

  roll_value_type.value = mod;

  return roll_value_type;
}
