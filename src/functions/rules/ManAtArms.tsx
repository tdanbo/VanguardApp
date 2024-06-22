import { CharacterEntry, ItemEntry } from "../../Types";
import { CheckAbility } from "../ActivesFunction";
import { IsArmor } from "../UtilityFunctions";
export function ManAtArms_active(character: CharacterEntry) {
  const abilityAdept = CheckAbility(character, "man-at-arms", "adept");
  const abilityMaster = CheckAbility(character, "man-at-arms", "master");
  for (const item of character.inventory) {
    if (IsArmor(item) && item.equipped) {
      const negativeQualities: { [key: string]: number } = {
        "Imp 1": 1,
        "Imp 2": 2,
        "Imp 3": 3,
        "Imp 4": 4,
      };
      item.static.quality.forEach((quality: string) => {
        const lowercasedQuality = quality;
        if (lowercasedQuality in negativeQualities && abilityMaster) {
          character.stats.defense.mod += negativeQualities[lowercasedQuality];
          character.stats.accurate.mod += negativeQualities[lowercasedQuality];
          character.stats.quick.mod += negativeQualities[lowercasedQuality];
          character.stats.discreet.mod += negativeQualities[lowercasedQuality];
        } else if (lowercasedQuality in negativeQualities && abilityAdept) {
          character.stats.defense.mod += negativeQualities[lowercasedQuality];
          character.stats.accurate.mod += negativeQualities[lowercasedQuality];
          character.stats.quick.mod += negativeQualities[lowercasedQuality];
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
