import { AdvantageType, ItemEntry } from "../../Types";
import { IsArmor, IsWeapon } from "../UtilityFunctions";

export function AdvantageDice(item: ItemEntry, advantage: AdvantageType) {
  let mod = 0;
  if (advantage === "flanking" && IsWeapon(item)) {
    mod += 4;
  } else if (advantage === "flanked" && IsArmor(item)) {
    mod -= 4;
  }
  console.log("AdvantageDice", mod);
  return mod;
}
