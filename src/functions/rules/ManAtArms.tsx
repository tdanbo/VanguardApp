import { CharacterEntry, Actives } from "../../Types";
import { CheckAbility } from "../ActivesFunction";

export function ManAtArms(character: CharacterEntry, actives: Actives) {
  const abilityNovice = CheckAbility(character, "man-at-arms", "novice");
  const abilityAdept = CheckAbility(character, "man-at-arms", "adept");

  if (abilityNovice) {
    actives.defense.dice += 2;
  }

  if (abilityAdept) {
    const negativeQualities: { [key: string]: number } = {
      "defense -1": 1,
      "defense -2": 2,
      "defense -3": 3,
      "defense -4": 4,
    };

    character.equipment.armor.quality.forEach((quality: string) => {
      const lowercasedQuality = quality.toLowerCase();
      if (lowercasedQuality in negativeQualities) {
        actives.defense.value += negativeQualities[lowercasedQuality];
        actives.sneaking.value += negativeQualities[lowercasedQuality];
      }
    });
  }
  return actives;
}
