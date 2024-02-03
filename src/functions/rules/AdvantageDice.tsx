import { AdvantageType, ItemEntry } from "../../Types";
import { IsArmor, IsWeapon } from "../UtilityFunctions";

export function AdvantageDice(item: ItemEntry, advantage: AdvantageType) {
  let mod = 0;
  if (advantage === "advantage" && IsWeapon(item)) {
    mod += 4;
  } else if (advantage === "disadvantage" && IsArmor(item)) {
    mod -= 4;
  }
  return mod;
}
