import { CharacterEntry } from "../Types";
import { CheckAbility } from "./ActivesFunction";
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

export function GetPainThreshold(character: CharacterEntry) {
  return Math.ceil(character.stats.strong.value / 2);
}

export const GetMovementSpeed = (character: CharacterEntry) => {
  const total_speed = Math.ceil(
    (5 +
      character.stats.quick.value -
      GetImpedingValue(character) -
      OverburdenValue(character)) /
      2,
  );
  return total_speed;
};

export const GetImpedingValue = (character: CharacterEntry) => {
  let impeding = 0;
  if (!CheckAbility(character, "Man-at-Arms", "adept")) {
    const negativeQualities: { [key: string]: number } = {
      "Impeding 1": 1,
      "Impeding 2": 2,
      "Impeding 3": 3,
      "Impeding 4": 4,
    };

    character.equipment.armor.quality.forEach((quality: string) => {
      const lowercasedQuality = quality;
      if (lowercasedQuality in negativeQualities) {
        impeding += negativeQualities[lowercasedQuality];
      }
    });
  }
  return impeding;
};

export const OverburdenValue = (character: CharacterEntry) => {
  const overburden = Math.min(
    0,
    GetMaxSlots(character) - GetUsedSlots(character),
  );
  return Math.abs(overburden);
};

export const GetCorruption = (character: CharacterEntry) => {
  const corruption =
    character.stats.resolute.value +
    Math.ceil(character.stats.resolute.value / 2);
  return corruption;
};

export const GetTemporaryCorruption = (character: CharacterEntry) => {
  const temporary_corruption = Math.ceil(character.stats.resolute.value / 2);
  return temporary_corruption;
};

export const GetPermanentCorruption = (character: CharacterEntry) => {
  const permanent_corruption = GetTemporaryCorruption(character) * 3;
  return permanent_corruption;
};

export function GetBurnRate(character: CharacterEntry) {
  const burn_rate =
    Math.ceil(character.details.xp_earned / 50) +
    GetStorageValue(character) / 3;

  return burn_rate;
}

export function GetPreciseValue(character: CharacterEntry) {
  let precise_value = 0;

  const preciseModifiers = {
    Precise: 1,
  };

  character.inventory.forEach((item) => {
    if (!item || !item.quality) return;

    item.quality.forEach((quality) => {
      Object.entries(preciseModifiers).forEach(([key, modifiers]) => {
        if (quality.includes(key)) {
          precise_value += modifiers;
        }
      });
    });
  });

  return precise_value;
}

export function GetStorageValue(character: CharacterEntry) {
  let storage_value = 0;

  const storageModifiers = {
    "Storage 3": 3,
    "Storage 6": 6,
    "Storage 9": 9,
    "Storage 12": 12,
    "Storage 15": 15,
  };

  character.inventory.forEach((item) => {
    if (!item || !item.quality) return;

    item.quality.forEach((quality) => {
      Object.entries(storageModifiers).forEach(([key, modifiers]) => {
        if (quality.includes(key)) {
          storage_value += modifiers;
        }
      });
    });
  });

  return storage_value;
}

export function GetUsedSlots(character: CharacterEntry) {
  let used_slots = character.inventory.length;

  const storageModifiers = [
    "Storage 2",
    "Storage 4",
    "Storage 6",
    "Storage 8",
    "Storage 10",
  ];

  character.inventory.forEach((item) => {
    if (!item || !item.quality) return;

    item.quality.forEach((quality) => {
      if (storageModifiers.includes(quality)) {
        used_slots -= 1;
      }
    });
  });

  return used_slots;
}

export function GetEquipmentCorruption(character: CharacterEntry) {
  let value_adjustment = 0;

  for (const item of character.inventory) {
    if (
      item.category === "artifact" ||
      item.category === "artifact_armor" ||
      item.category === "artifact_weapon"
    ) {
      value_adjustment += 1;
    }
  }

  return value_adjustment;
}

export function GetAbilityCorruption(character: CharacterEntry) {
  let value_adjustment = 0;

  const has_theurgy_novice = CheckAbility(character, "Theurgy", "novice");
  const has_theurgy_adept = CheckAbility(character, "Theurgy", "adept");
  const has_theurgy_master = CheckAbility(character, "Theurgy", "master");

  const has_wizardry_novice = CheckAbility(character, "Wizardry", "novice");
  const has_wizardry_adept = CheckAbility(character, "Wizardry", "adept");
  const has_wizardry_master = CheckAbility(character, "Wizardry", "master");

  for (const ability of character.abilities) {
    if (ability.type === "Mystical Power") {
      if (
        ability.level === "Novice" ||
        ability.level === "Adept" ||
        ability.level === "Master"
      ) {
        if (ability.tradition.includes("Theurgy") && has_theurgy_novice) {
          value_adjustment -= 1;
        } else if (
          ability.tradition.includes("Wizardry") &&
          has_wizardry_novice
        ) {
          value_adjustment -= 1;
        }
        value_adjustment += 1;
      }
      if (ability.level === "Adept" || ability.level === "Master") {
        if (ability.tradition.includes("Theurgy") && has_theurgy_adept) {
          value_adjustment -= 1;
        } else if (
          ability.tradition.includes("Wizardry") &&
          has_wizardry_adept
        ) {
          value_adjustment -= 1;
        }
        value_adjustment += 1;
      }

      if (ability.level === "Master") {
        if (ability.tradition.includes("Theurgy") && has_theurgy_master) {
          value_adjustment -= 1;
        } else if (
          ability.tradition.includes("Wizardry") &&
          has_wizardry_master
        ) {
          value_adjustment -= 1;
        }
        value_adjustment += 1;
      }
    }
  }

  return value_adjustment;
}
