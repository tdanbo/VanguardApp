import { CharacterEntry, ItemEntry } from "../../Types";
import { CheckAbility } from "../ActivesFunction";

export function HuntersInstinct_dice(
  character: CharacterEntry,
  item: ItemEntry,
) {
  const ability = CheckAbility(character, "hunter's instinct", "adept");
  let mod = 0;
  if (ability && item.static.category === "ranged weapon") {
    mod += 4;
  }
  return mod;
}
