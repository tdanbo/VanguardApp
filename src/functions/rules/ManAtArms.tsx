import { CharacterEntry, ItemEntry, RollValueType } from "../../Types";
import { CheckAbility } from "../ActivesFunction";
import { IsArmor } from "../UtilityFunctions";

const IsNotAccessory = (item: ItemEntry) => {
  return (
    item.static.category !== "armor accessory" &&
    item.static.category !== "weapon accessory"
  );
};

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
        if (
          lowercasedQuality in negativeQualities &&
          abilityMaster &&
          IsNotAccessory(item)
        ) {
          character.stats.defense.mod += negativeQualities[lowercasedQuality];
          character.stats.accurate.mod += negativeQualities[lowercasedQuality];
          character.stats.quick.mod += negativeQualities[lowercasedQuality];
          character.stats.discreet.mod += negativeQualities[lowercasedQuality];
        } else if (
          lowercasedQuality in negativeQualities &&
          abilityAdept &&
          IsNotAccessory(item)
        ) {
          character.stats.defense.mod += negativeQualities[lowercasedQuality];
          character.stats.accurate.mod += negativeQualities[lowercasedQuality];
          character.stats.quick.mod += negativeQualities[lowercasedQuality];
        }
      });
    }
  }
}

export function ManAtArms_dice(
  character: CharacterEntry,
  item: ItemEntry,
): RollValueType {
  const name = "man-at-arms";
  const roll_value_type: RollValueType = {
    source: name,
    value: 0,
  };

  const abilityNovice = CheckAbility(character, name, "novice");
  let mod = 0;
  if (abilityNovice && IsArmor(item)) {
    mod += 2;
  }

  roll_value_type.value = mod;

  return roll_value_type;
}
