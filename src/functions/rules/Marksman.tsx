import { CharacterEntry, ItemEntry } from "../../Types";
import { CheckAbility } from "../ActivesFunction";

export function Marksman_dice(character: CharacterEntry, item: ItemEntry) {
  const ability = CheckAbility(character, "marksman", "novice");
  let mod = 0;
  if (ability && item.static.category === "ranged weapon") {
    mod += 2;
  }
  return mod;
}
