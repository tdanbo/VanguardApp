import { CharacterEntry, ActivesEntry, ItemEntry } from "../../Types";
import { CheckAbility } from "../ActivesFunction";

export function ManAtArms_active(
  character: CharacterEntry,
  character_actives: ActivesEntry,
) {
  const abilityAdept = CheckAbility(character, "man-at-arms", "adept");
  for (const armor of character.inventory) {
    if (armor.category === "armor" && abilityAdept && armor.equip.equipped) {
      const negativeQualities: { [key: string]: number } = {
        "Impeding 1": 1,
        "Impeding 2": 2,
        "Impeding 3": 3,
        "Impeding 4": 4,
      };
      armor.quality.forEach((quality: string) => {
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
  if (abilityNovice && item.category === "armor") {
    mod += 2;
  }
  return mod;
}
