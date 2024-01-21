import { ActivesEntry, CharacterEntry, ItemEntry } from "../../Types";
import { CheckAbility } from "../ActivesFunction";
import { IsArmor } from "../UtilityFunctions";
export function ArmoredMystic_active(
  character: CharacterEntry,
  character_actives: ActivesEntry,
) {
  const abilityNovice = CheckAbility(character, "armored mystic", "novice");
  const abilityAdept = CheckAbility(character, "armored mystic", "adept");

  const negativeQualities: { [key: string]: number } = {
    "Impeding 1": 1,
    "Impeding 2": 2,
    "Impeding 3": 3,
    "Impeding 4": 4,
  };

  for (const armor of character.inventory) {
    if (
      abilityAdept &&
      armor.equip.equipped &&
      armor.category === "heavy armor"
    ) {
      armor.quality.forEach((quality: string) => {
        const lowercasedQuality = quality;
        if (lowercasedQuality in negativeQualities) {
          character_actives.casting.value +=
            negativeQualities[lowercasedQuality];
        }
      });
    } else if (
      abilityNovice &&
      armor.equip.equipped &&
      ["medium armor", "light armor"].includes(armor.category)
    ) {
      armor.quality.forEach((quality: string) => {
        const lowercasedQuality = quality;
        if (lowercasedQuality in negativeQualities) {
          character_actives.casting.value +=
            negativeQualities[lowercasedQuality];
        }
      });
    }
  }
}

export function ArmoredMystic_dice(character: CharacterEntry, item: ItemEntry) {
  const abilityMaster = CheckAbility(character, "armored mystic", "master");

  let mod = 0;
  if (abilityMaster && IsArmor(item)) {
    mod += 4;
  }
  return mod;
}
