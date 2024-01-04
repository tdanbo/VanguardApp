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
  const overburden = Math.min(
    0,
    GetMaxSlots(character) - GetUsedSlots(character),
  );

  let impeding = 0;
  if (!CheckAbility(character, "Man-at-Arms", "adept")) {
    const negativeQualities: { [key: string]: number } = {
      "Impeding 1": -1,
      "Impeding 2": -2,
      "Impeding 3": -3,
      "Impeding 4": -4,
    };

    character.equipment.armor.quality.forEach((quality: string) => {
      const lowercasedQuality = quality;
      if (lowercasedQuality in negativeQualities) {
        impeding += negativeQualities[lowercasedQuality];
      }
    });
  }

  const total_speed = Math.ceil(
    (5 + character.stats.quick.value + impeding + overburden) / 2,
  );
  return total_speed;
};

// export const GetMovementSpeed = (character: CharacterEntry) => {
//   const movement: { [key: number]: number } = {
//     5: -10,
//     6: -5,
//     7: -5,
//     8: -5,
//     9: 0,
//     10: 0,
//     11: 0,
//     12: 5,
//     13: 5,
//     14: 5,
//     15: 10,
//   };

//   let speed_modifier;

//   if (character.stats.quick.value <= 5) {
//     speed_modifier = -10;
//   } else if (character.stats.quick.value >= 15) {
//     speed_modifier = 10;
//   } else {
//     speed_modifier = movement[character.stats.quick.value];
//   }

//   let sneaking_mod = 0;
//   if (!CheckAbility(character, "Man-at-Arms", "adept")) {
//     const negativeQualities: { [key: string]: number } = {
//       "Impeding 1": -1,
//       "Impeding 2": -2,
//       "Impeding 3": -3,
//       "Impeding 4": -4,
//     };

//     character.equipment.armor.quality.forEach((quality: string) => {
//       const lowercasedQuality = quality;
//       if (lowercasedQuality in negativeQualities) {
//         sneaking_mod += negativeQualities[lowercasedQuality];
//       }
//     });
//   }

//   const base_speed_sneaking = sneaking_mod * 5;
//   const base_speed = 40 + speed_modifier;
//   const calculated_speed = base_speed + base_speed_sneaking;
//   return calculated_speed;
// };

export const GetCorruption = (character: CharacterEntry) => {
  const corruption =
    character.stats.resolute.value +
    Math.ceil(character.stats.resolute.value / 2);
  return corruption;
};

export function GetBurnRate(character: CharacterEntry) {
  let burn_rate = 0;

  const storageModifiers = {
    "Storage 2": 0,
    "Storage 4": 1,
    "Storage 6": 2,
    "Storage 8": 3,
    "Storage 10": 4,
  };

  character.inventory.forEach((item) => {
    if (!item || !item.quality) return;

    item.quality.forEach((quality) => {
      Object.entries(storageModifiers).forEach(([key, modifiers]) => {
        if (quality.includes(key)) {
          burn_rate += modifiers;
        }
      });
    });
  });

  if (character.details.xp_earned === 0) {
    burn_rate += 0;
  } else if (character.details.xp_earned <= 50) {
    burn_rate += 1;
  } else if (character.details.xp_earned <= 150) {
    burn_rate += 2;
  } else if (character.details.xp_earned <= 300) {
    burn_rate += 3;
  } else if (character.details.xp_earned <= 600) {
    burn_rate += 4;
  } else {
    burn_rate += 5;
  }

  return burn_rate;
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

export function CorruptionAdjust(character: CharacterEntry) {
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

  for (const ability of character.abilities) {
    if (ability.type === "Mystical Power") {
      if (ability.level === "Novice") {
        value_adjustment += 1;
      } else if (ability.level === "Adept") {
        value_adjustment += 2;
      } else if (ability.level === "Master") {
        value_adjustment += 3;
      }
    }
  }

  return value_adjustment;
}
