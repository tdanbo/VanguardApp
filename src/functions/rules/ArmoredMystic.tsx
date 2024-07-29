import { CharacterEntry, ItemEntry, RollValueType } from "../../Types";
import { CheckAbility } from "../ActivesFunction";
import { IsArmor } from "../UtilityFunctions";
export function ArmoredMystic_active(character: CharacterEntry) {
  const abilityNovice = CheckAbility(character, "armored mystic", "novice");
  const abilityAdept = CheckAbility(character, "armored mystic", "adept");

  const negativeQualities: { [key: string]: number } = {
    "Imp 1": 1,
    "Imp 2": 2,
    "Imp 3": 3,
    "Imp 4": 4,
  };

  for (const armor of character.inventory) {
    if (
      abilityAdept &&
      armor.equipped &&
      armor.static.category === "heavy armor"
    ) {
      armor.static.quality.forEach((quality: string) => {
        const lowercasedQuality = quality;
        if (lowercasedQuality in negativeQualities) {
          character.stats.resolute.mod += negativeQualities[lowercasedQuality];
        }
      });
    } else if (
      abilityNovice &&
      armor.equipped &&
      ["medium armor", "light armor"].includes(armor.static.category)
    ) {
      armor.static.quality.forEach((quality: string) => {
        const lowercasedQuality = quality;
        if (lowercasedQuality in negativeQualities) {
          character.stats.resolute.mod += negativeQualities[lowercasedQuality];
        }
      });
    }
  }
}

export function ArmoredMystic_dice(
  character: CharacterEntry,
  item: ItemEntry,
): RollValueType {
  const name = "armored mystic";
  const roll_value_type: RollValueType = {
    source: name,
    type: "buff",
    value: 0,
  };

  const abilityMaster = CheckAbility(character, name, "master");

  let mod = 0;
  if (abilityMaster && IsArmor(item)) {
    mod += 4;
  }

  roll_value_type.value = mod;

  return roll_value_type;
}
