import { CharacterEntry, Actives } from "../../Types";
import { CheckAbility } from "../ActivesFunction";

export function ArmoredMystic(character: CharacterEntry, actives: Actives) {
  const abilityNovice = CheckAbility(character, "armored mystic", "novice");
  const abilityAdept = CheckAbility(character, "armored mystic", "adept");

  if (abilityNovice) {
    const negativeQualities: { [key: string]: number } = {
      "Impeding 1": 1,
      "Impeding 2": 2,
      "Impeding 3": 3,
      "Impeding 4": 4,
    };

    if (
      ["Medium Armor", "Light Armor"].includes(character.equipment.armor.type)
    ) {
      character.equipment.armor.quality.forEach((quality: string) => {
        const lowercasedQuality = quality;
        if (lowercasedQuality in negativeQualities) {
          actives.casting.value += negativeQualities[lowercasedQuality];
        }
      });
    }
  }

  if (abilityAdept) {
    const negativeQualities: { [key: string]: number } = {
      "Impeding 1": 1,
      "Impeding 2": 2,
      "Impeding 3": 3,
      "Impeding 4": 4,
    };

    if (character.equipment.armor.type === "Heavy Armor") {
      character.equipment.armor.quality.forEach((quality: string) => {
        const lowercasedQuality = quality;
        if (lowercasedQuality in negativeQualities) {
          actives.casting.value += negativeQualities[lowercasedQuality];
        }
      });
    }
  }
  return actives;
}
