import { CharacterEntry, ItemEntry } from "../../Types";
import { CheckAbility, CheckEffect } from "../ActivesFunction";
import { IsArmor } from "../UtilityFunctions";
export function BlessedShieldEffect(
  character: CharacterEntry,
  item: ItemEntry,
) {
  const found_effect = CheckEffect(character, "Blessed Shield");
  const theurgy_master = CheckAbility(character, "Theurgy", "master");

  let mod = 0;

  const is_armor = IsArmor(item);

  if (found_effect && is_armor) {
    mod +=
      found_effect.static.base_amount +
      found_effect.static.level_amount * (found_effect.level - 1);
  }

  if (theurgy_master) {
    mod += 4;
  }

  return mod;
}
