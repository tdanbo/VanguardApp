import { CharacterEntry } from "../Types";

export function GetMaxSlots(character: CharacterEntry) {
  let max_slots = Math.max(
    Math.ceil(
      (character.stats.strong.value + character.stats.resolute.value) / 2,
    ),
    10,
  );

  const storageModifiers = {
    "Storage 2": 2,
    "Storage 4": 4,
    "Storage 6": 6,
    "Storage 8": 8,
    "Storage 10": 10,
  };

  character.inventory.forEach((item) => {
    if (!item || !item.quality) return;

    item.quality.forEach((quality) => {
      Object.entries(storageModifiers).forEach(([key, modifiers]) => {
        if (quality.includes(key)) {
          max_slots += modifiers;
        }
      });
    });
  });

  return max_slots;
}

export function GetMaxToughness(character: CharacterEntry) {
  return character.stats.strong.value < 10 ? 10 : character.stats.strong.value;
}
