import { CharacterEntry, ItemEntry } from "../Types";
import cloneDeep from "lodash/cloneDeep";

export function updateAbilityModifiers(
  character: CharacterEntry,
): CharacterEntry {
  console.log("Updating Ability Modifiers");
  const modifiers = [ManAtArms];
  return modifiers.reduce((char, modifierFn) => modifierFn(char), character);
}

export function ManAtArms(character: CharacterEntry): CharacterEntry {
  // Clone the character using lodash's cloneDeep to avoid direct mutation
  const updatedCharacter = cloneDeep(character);
  const armor = getArmor(updatedCharacter);
  //   if (CheckAbility(updatedCharacter, "man-at-arms", "novice")) {
  //     updatedCharacter.inventory.forEach((item: ItemEntry) => {
  //       const itemType = item.type.toLowerCase();

  //       if (itemType === "light armor") {
  //         item.roll.dice = 6;
  //       } else if (itemType === "medium armor") {
  //         item.roll.dice = 8;
  //       } else if (itemType === "heavy armor") {
  //         item.roll.dice = 10;
  //       }
  //     });
  //   }
  if (CheckAbility(updatedCharacter, "man-at-arms", "adept")) {
    const negativeQualities: { [key: string]: number } = {
      "defense -1": 1,
      "defense -2": 2,
      "defense -3": 3,
      "defense -4": 4,
    };

    if (armor) {
      armor.quality.forEach((quality: string) => {
        const lowercasedQuality = quality.toLowerCase();
        if (lowercasedQuality in negativeQualities) {
          updatedCharacter.actives["defense"].mod +=
            negativeQualities[lowercasedQuality];
          updatedCharacter.actives["sneaking"].mod +=
            negativeQualities[lowercasedQuality];
        }
      });
    }
  }

  console.log("Updating Man At Arms");
  return updatedCharacter;
}

export function ShieldFighter(character: CharacterEntry): CharacterEntry {
  // Modify character based on ShieldFighter rules and return modified character
  return character;
}

export function KnifePlay(character: CharacterEntry): CharacterEntry {
  // Modify character based on KnifePlay rules and return modified character
  return character;
}

function CheckAbility(
  character: CharacterEntry,
  name: string,
  level: string,
): boolean {
  const abilities = character.abilities;

  const levels: Record<string, string[]> = {
    novice: ["novice", "adept", "master"],
    adept: ["adept", "master"],
    master: ["master"],
  };

  const approved_levels = levels[level.toLowerCase()];

  return abilities.some(
    (ability) =>
      ability.name.toLowerCase() === name.toLowerCase() &&
      approved_levels.includes(ability.level.toLowerCase()),
  );
}

export function getArmor(character: CharacterEntry): ItemEntry | undefined {
  const equippedArmor = character.inventory.find((item) =>
    item.equip.some((e) => e.equipped === true && e.type === "AR"),
  );
  return equippedArmor;
}
