import { CharacterEntry, ActivesEntry, ItemEntry } from "../../Types";
import { CheckAbility } from "../ActivesFunction";
import { IsArmor } from "../UtilityFunctions";
export function ManAtArms_active(
  character: CharacterEntry,
  character_actives: ActivesEntry,
) {
  const abilityAdept = CheckAbility(character, "man-at-arms", "adept");
  for (const item of character.inventory) {
    if (IsArmor(item) && abilityAdept && item.equipped) {
      const negativeQualities: { [key: string]: number } = {
        "Imp 1": 1,
        "Imp 2": 2,
        "Imp 3": 3,
        "Imp 4": 4,
      };
      item.static.quality.forEach((quality: string) => {
        const lowercasedQuality = quality;
        if (lowercasedQuality in negativeQualities) {
          character_actives.defense.value +=
            negativeQualities[lowercasedQuality];
          character_actives.sneaking.value +=
            negativeQualities[lowercasedQuality];
        }
      });
    }
  }
}

export function ManAtArms_dice(character: CharacterEntry, item: ItemEntry) {
  const abilityNovice = CheckAbility(character, "man-at-arms", "novice");
  let mod = 0;
  if (abilityNovice && IsArmor(item)) {
    mod += 2;
  }
  return mod;
}
