import { ItemEntry } from "../../Types";
import { IsWeapon, IsArmor } from "../UtilityFunctions";

export function Quality_dice(item: ItemEntry) {
  const is_weapon = IsWeapon(item);
  const is_armor = IsArmor(item);

  let mod = 0;

  if (item.static.quality.includes("Impact") && is_weapon) {
    mod += 2;
  }

  if (item.static.quality.includes("Reinforced") && is_armor) {
    mod += 2;
  }

  return mod;
}
