import { CharacterEntry, ItemEntry } from "../../Types";
import { CheckAbility, CheckEffect } from "../ActivesFunction";
import { IsWeapon } from "../UtilityFunctions";
export function WitchHammerEffect(character: CharacterEntry, item: ItemEntry) {
  const found_effect = CheckEffect(character, "Witch Hammer");
  const theurgy_master = CheckAbility(character, "Theurgy", "master");

  let mod = 0;

  const is_weapon = IsWeapon(item);

  if (found_effect && is_weapon) {
    mod +=
      found_effect.static.base_amount +
      found_effect.static.level_amount * (found_effect.level - 1);
  }

  if (theurgy_master) {
    mod += 4;
  }

  return mod;
}
