import { CharacterEntry, ItemEntry } from "../Types";
import cloneDeep from "lodash/cloneDeep";

export function updateAbilityModifiers(
  character: CharacterEntry,
): CharacterEntry {
  console.log("Updating Ability Modifiers");
  const modifiers = [
    ManAtArms,
    Marksman,
    PolearmMastery,
    ShieldFighter1,
    ShieldFighter2,
  ];
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

export function Marksman(character: CharacterEntry): CharacterEntry {
  console.log("Updating Polearm Mastery");
  const updatedCharacter = cloneDeep(character);
  const ability = CheckAbility(updatedCharacter, "marksman", "novice");
  const equipmentKeys: Array<keyof typeof updatedCharacter.equipment> = [
    "main",
    "off",
  ];

  for (let key of equipmentKeys) {
    const item = updatedCharacter.equipment[key];

    if (isItemEntry(item)) {
      if (item.type.toLowerCase() === "ranged weapon") {
        const originalInventoryItem = InventoryItem(
          updatedCharacter,
          item.id,
        ) as ItemEntry;

        if (ability) {
          originalInventoryItem.roll.dice += 2; // modify the inventory clone
          updatedCharacter.equipment[key] = originalInventoryItem; // set it to equipment
        } else {
          updatedCharacter.equipment[key] = originalInventoryItem; // just set the original to equipment without any modification
        }
      }
    }
  }

  return updatedCharacter;
}

export function PolearmMastery(character: CharacterEntry): CharacterEntry {
  console.log("Updating Polearm Mastery");
  const updatedCharacter = cloneDeep(character);
  const ability = CheckAbility(updatedCharacter, "polearm mastery", "novice");
  const equipmentKeys: Array<keyof typeof updatedCharacter.equipment> = [
    "main",
    "off",
  ];

  for (let key of equipmentKeys) {
    const item = updatedCharacter.equipment[key];

    if (isItemEntry(item)) {
      if (item.type.toLowerCase() === "long weapon") {
        const originalInventoryItem = InventoryItem(
          updatedCharacter,
          item.id,
        ) as ItemEntry;

        if (ability) {
          originalInventoryItem.roll.dice += 2; // modify the inventory clone
          updatedCharacter.equipment[key] = originalInventoryItem; // set it to equipment
        } else {
          updatedCharacter.equipment[key] = originalInventoryItem; // just set the original to equipment without any modification
        }
      }
    }
  }

  return updatedCharacter;
}

export function ShieldFighter1(character: CharacterEntry): CharacterEntry {
  console.log("Updating Shield Fighter");
  const updatedCharacter = cloneDeep(character);
  const ability = CheckAbility(updatedCharacter, "shield fighter", "novice");

  const equipmentKeys: Array<keyof typeof updatedCharacter.equipment> = [
    "main",
    "off",
  ];

  for (let key of equipmentKeys) {
    const item = updatedCharacter.equipment[key];

    if (isItemEntry(item)) {
      if (
        ["steel shield", "buckler", "shield"].includes(item.name.toLowerCase())
      ) {
        const originalInventoryItem = InventoryItem(
          updatedCharacter,
          item.id,
        ) as ItemEntry;

        if (ability) {
          const upgradeDict: { [key: string]: string } = {
            "Balanced 1": "Balanced 2",
            "Balanced 2": "Balanced 3",
          };

          originalInventoryItem.quality = originalInventoryItem.quality.map(
            (quality) => {
              const lowercasedQuality = quality;
              return lowercasedQuality in upgradeDict
                ? upgradeDict[lowercasedQuality]
                : quality;
            },
          );

          console.log("Updated Shield: ", originalInventoryItem);

          updatedCharacter.equipment[key] = originalInventoryItem;
        } else {
          updatedCharacter.equipment[key] = originalInventoryItem;
        }
      }
    }
  }

  return updatedCharacter;
}

export function ShieldFighter2(character: CharacterEntry): CharacterEntry {
  const updatedCharacter = cloneDeep(character);
  const ability = CheckAbility(updatedCharacter, "shield fighter", "novice");

  const equipmentKeys: Array<keyof typeof updatedCharacter.equipment> = [
    "main",
    "off",
  ];

  for (let key of equipmentKeys) {
    const item = updatedCharacter.equipment[key];

    if (isItemEntry(item)) {
      if (
        ["short weapon", "one-hand weapon"].includes(item.type.toLowerCase())
      ) {
        // Determine the opposite key and retrieve the opposite item
        const oppositeKey = key === "main" ? "off" : "main";
        const oppositeItem = updatedCharacter.equipment[oppositeKey];
        // Check if the opposite item has a name in the specified list
        if (
          isItemEntry(oppositeItem) &&
          ["steel shield", "buckler", "shield"].includes(
            oppositeItem.name.toLowerCase(),
          )
        ) {
          const originalInventoryItem = InventoryItem(
            updatedCharacter,
            item.id,
          ) as ItemEntry;

          if (ability) {
            // ... any other operations you want when ability is present ...
            originalInventoryItem.roll.dice += 2;
            console.log("Updated Shield2: ", originalInventoryItem);
            updatedCharacter.equipment[key] = originalInventoryItem;
          } else {
            // ... any other operations you want when ability is absent ...
            updatedCharacter.equipment[key] = originalInventoryItem;
          }
        }
      }
    }
  }

  return updatedCharacter;
}

export function KnifePlay(character: CharacterEntry): CharacterEntry {
  // Modify character based on KnifePlay rules and return modified character
  return character;
}

function InventoryItem(updatedCharacter: CharacterEntry, id: string) {
  const inventory = updatedCharacter.inventory;
  const item = inventory.find((item) => item.id === id);
  return cloneDeep(item);
}

export function CheckAbility(
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
