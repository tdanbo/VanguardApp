import axios from "axios";
import { API } from "../Constants";
import { CharacterEntry, modifiedCreature } from "../Types";
import { CheckAbility } from "./ActivesFunction";

export async function getCharacterEntry(
  selectedName: string,
): Promise<CharacterEntry> {
  // Fetch the character using axios or any other method
  const response = await axios.get<CharacterEntry>(
    `${API}/api/characterlog/${selectedName}`,
  );
  return response.data;
}

export async function getNpcEntry(name: string): Promise<CharacterEntry> {
  // Fetch the character using axios or any other method
  const response = await axios.get<CharacterEntry>(
    `${API}/api/characterlog/npc/${name}`,
  );
  return response.data;
}

export async function getCreatureEntry(name: string): Promise<CharacterEntry> {
  // Fetch the character using axios or any other method
  const response = await axios.get<CharacterEntry>(
    `${API}/api/creaturelog/${name}`,
  );
  return response.data;
}

export const getCreatureMovement = (creature: modifiedCreature) => {
  const movement: { [key: number]: number } = {
    5: -10,
    6: -5,
    7: -5,
    8: -5,
    9: 0,
    10: 0,
    11: 0,
    12: 5,
    13: 5,
    14: 5,
    15: 10,
  };

  let speed_modifier;

  if (creature.stats.quick <= 5) {
    speed_modifier = -10;
  } else if (creature.stats.quick >= 15) {
    speed_modifier = 10;
  } else {
    speed_modifier = movement[creature.stats.quick];
  }

  let sneaking_mod = 0;
  for (const armor of creature.armor.quality) {
    if (armor === "Impeding 1") {
      sneaking_mod += -1;
    } else if (armor === "Impeding 2") {
      sneaking_mod += -2;
    } else if (armor === "Impeding 3") {
      sneaking_mod += -3;
    } else if (armor === "Impeding 4") {
      sneaking_mod += -4;
    }
  }

  const base_speed_sneaking = sneaking_mod * 5;
  const base_speed = 40 + speed_modifier;
  const calculated_speed = base_speed + base_speed_sneaking;
  return calculated_speed / 5;
};

export const getCharacterMovement = (character: CharacterEntry) => {
  const movement: { [key: number]: number } = {
    5: -10,
    6: -5,
    7: -5,
    8: -5,
    9: 0,
    10: 0,
    11: 0,
    12: 5,
    13: 5,
    14: 5,
    15: 10,
  };

  let speed_modifier;

  if (character.stats.quick.value <= 5) {
    speed_modifier = -10;
  } else if (character.stats.quick.value >= 15) {
    speed_modifier = 10;
  } else {
    speed_modifier = movement[character.stats.quick.value];
  }

  let sneaking_mod = 0;
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
        sneaking_mod += negativeQualities[lowercasedQuality];
      }
    });
  }

  const base_speed_sneaking = sneaking_mod * 5;
  const base_speed = 40 + speed_modifier;
  const calculated_speed = base_speed + base_speed_sneaking;
  return calculated_speed;
};

export const getCharacterXp = (character: CharacterEntry) => {
  let xp_spent = 0;

  character.abilities.forEach((ability) => {
    if (ability.type.toLocaleLowerCase() === "trait") {
      return;
    } else if (ability.type.toLocaleLowerCase() === "burden") {
      return;
    }

    if (ability.level === "Novice") {
      xp_spent += 10;
    } else if (ability.level === "Adept") {
      xp_spent += 30;
    } else if (ability.level === "Master") {
      xp_spent += 60;
    }
  });
  return xp_spent;
};

export async function addNewCreature(NewCharacterEntry: CharacterEntry) {
  return axios.post(`${API}/api/creaturelog`, NewCharacterEntry).then((res) => {
    return res;
  });
}

export async function deleteCreature(name: string) {
  const response = await axios.delete(`${API}/api/creaturelog/${name}`);
  return response.data;
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
