import { CharacterEntry, ItemEntry } from "../../Types";
import { CheckAbility } from "../ActivesFunction";

export function PolearmMastery_dice(
  character: CharacterEntry,
  item: ItemEntry,
) {
  const ability = CheckAbility(character, "polearm mastery", "novice");
  let mod = 0;
  if (ability && item.static.category === "long weapon") {
    mod += 2;
  }
  return mod;
}
