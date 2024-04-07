import { CharacterEntry, ItemEntry } from "../../Types";
import { CheckAbility } from "../ActivesFunction";

export function TwohandedForce_dice(
  character: CharacterEntry,
  item: ItemEntry,
) {
  const ability = CheckAbility(character, "two-handed force", "novice");
  let mod = 0;
  if (ability && item.static.category === "heavy weapon") {
    mod += 2;
  }

  return mod;
}
//
