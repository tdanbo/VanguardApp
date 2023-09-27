import { CharacterEntry, ItemEntry } from "../Types";
import cloneDeep from "lodash/cloneDeep";

export function updateAbilityModifiers(
  character: CharacterEntry,
): CharacterEntry {
  console.log("Updating Ability Modifiers");
  const modifiers = [ManAtArms];
  return modifiers.reduce((char, modifierFn) => modifierFn(char), character);
}

function isItemEntry(equipment: ItemEntry | {}): equipment is ItemEntry {
  return "quality" in equipment;
}

export function ManAtArms(character: CharacterEntry): CharacterEntry {
  // Clone the character using lodash's cloneDeep to avoid direct mutation
  const updatedCharacter = cloneDeep(character);
  const armor = updatedCharacter.equipment.armor;

  if (CheckAbility(updatedCharacter, "man-at-arms", "novice")) {
    if (isItemEntry(armor)) {
      if (armor.type.toLowerCase() === "light armor") {
        armor.roll.dice = 6;
      } else if (armor.type.toLowerCase() === "medium armor") {
        armor.roll.dice = 8;
      } else if (armor.type.toLowerCase() === "heavy armor") {
        armor.roll.dice = 10;
      }
    }
  } else {
    if (isItemEntry(armor)) {
      if (armor.type.toLowerCase() === "light armor") {
        armor.roll.dice = 4;
      } else if (armor.type.toLowerCase() === "medium armor") {
        armor.roll.dice = 6;
      } else if (armor.type.toLowerCase() === "heavy armor") {
        armor.roll.dice = 8;
      }
    }
  }

  if (CheckAbility(updatedCharacter, "man-at-arms", "adept")) {
    const negativeQualities: { [key: string]: number } = {
      "defense -1": 1,
      "defense -2": 2,
      "defense -3": 3,
      "defense -4": 4,
    };

    if (isItemEntry(armor)) {
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
