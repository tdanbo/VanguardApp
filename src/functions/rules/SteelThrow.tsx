import { CharacterEntry, ItemEntry } from "../../Types";
import { CheckAbility } from "../ActivesFunction";

export function SteelThrow_dice(character: CharacterEntry, item: ItemEntry) {
  const ability = CheckAbility(character, "steel throw", "novice");

  let mod = 0;
  if (ability && item.type === "Throwing Weapon") {
    mod += 2;
  }
  return mod;
}
