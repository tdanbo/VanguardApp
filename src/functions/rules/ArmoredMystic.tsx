import { CharacterEntry, Actives } from "../../Types";
import { CheckAbility } from "../ActivesFunction";

export function ArmoredMystic(character: CharacterEntry, actives: Actives) {
  const abilityNovice = CheckAbility(character, "armored mystic", "novice");
  const abilityAdept = CheckAbility(character, "armored mystic", "adept");

  if (abilityNovice) {
    const negativeQualities: { [key: string]: number } = {
      "casting -1": 1,
      "casting -2": 2,
      "casting -3": 3,
      "casting -4": 4,
    };

    if (character.equipment.armor.type === "Medium Armor") {
      character.equipment.armor.quality.forEach((quality: string) => {
        const lowercasedQuality = quality.toLowerCase();
        if (lowercasedQuality in negativeQualities) {
          actives.casting.value += negativeQualities[lowercasedQuality];
        }
      });
    }
  }

  if (abilityAdept) {
    const negativeQualities: { [key: string]: number } = {
      "casting -1": 1,
      "casting -2": 2,
      "casting -3": 3,
      "casting -4": 4,
    };

    if (character.equipment.armor.type === "Heavy Armor") {
      character.equipment.armor.quality.forEach((quality: string) => {
        const lowercasedQuality = quality.toLowerCase();
        if (lowercasedQuality in negativeQualities) {
          actives.casting.value += negativeQualities[lowercasedQuality];
        }
      });
    }
  }
  return actives;
}
