import axios from "axios";
import cloneDeep from "lodash/cloneDeep";
import { API } from "../Constants";
import {
  AbilityEntry,
  ActiveKey, CharacterEntry, EmptyArmor, EmptyWeapon, ItemEntry, StatName, modifiedCreature
} from "../Types";
import { CheckAbility } from "./ActivesFunction";
interface onDeleteProps {
  ability: AbilityEntry;
  character: CharacterEntry;
}

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

interface onAddCharacterProps {
  item: ItemEntry;
  character: CharacterEntry;
}

interface onAddAbilityProps {
  ability: AbilityEntry;
  character: CharacterEntry;
}

const generateRandomId = (length = 10) => {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length);
};

interface onUpdateActiveProps {
  active: ActiveKey;
  stat: string;
  character: CharacterEntry;
}

export function onUpdateActive({
  active,
  stat,
  character,
}: onUpdateActiveProps) {
  const updatedCharacter = {
    ...character,
  };

  updatedCharacter.actives[active].stat = stat as StatName;
  postSelectedCharacter(updatedCharacter);
  return updatedCharacter;
}

interface onChangeAbilityLevelProps {
  ability: AbilityEntry;
  level: string;
  character: CharacterEntry;
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

export const onAddCorruption = (character: CharacterEntry, value: number) => {
  let character_corruption = { ...character.corruption };
  const corruptionThreshold = Math.ceil(character.stats.resolute.value / 2);

  for (let i = 0; i < value; i++) {
    if (character_corruption.temporary === corruptionThreshold) {
      if (character_corruption.permanent === corruptionThreshold * 3) {
        return character;
      }
      character_corruption.permanent += 1;
    } else {
      character_corruption.temporary += 1;
    }
  }

  const updatedCharacter = {
    ...character,
    corruption: character_corruption,
  };

  postSelectedCharacter(updatedCharacter);
  return updatedCharacter;
};

export const onSubCorruption = (character: CharacterEntry, value: number) => {
  let character_corruption = character.corruption;

  character_corruption.temporary -= value;

  if (character_corruption.temporary < 0) {
    character_corruption.temporary = 0;
  }

  const updatedCharacter = {
    ...character,
    corruption: character_corruption,
  };
  postSelectedCharacter(updatedCharacter);
  return updatedCharacter;
};

export const onResetCorruption = (character: CharacterEntry) => {
  let character_corruption = character.corruption;

  character_corruption.temporary = 0;

  const updatedCharacter = {
    ...character,
    corruption: character_corruption,
  };
  postSelectedCharacter(updatedCharacter);
  return updatedCharacter;
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

export const setBaseModifier = (character: CharacterEntry, value: number) => {
  const character_details = character.details;
  character_details.modifier = value;

  const updatedCharacter = {
    ...character,
    details: character_details,
  };
  postSelectedCharacter(updatedCharacter);
  return updatedCharacter;
};

interface UnEquipProps {
  character: CharacterEntry;
  position: string;
}

interface EquipProps {
  character: CharacterEntry;
  item: ItemEntry;
  position: string;
}

export function onUnequipItem({ character, position }: UnEquipProps) {
  const newEquipment = cloneDeep(character.equipment);

  if (position === "MH") {
    newEquipment.main = EmptyWeapon;
  } else if (position === "OH") {
    newEquipment.off = EmptyWeapon;
  } else if (position === "2H") {
    newEquipment.main = EmptyWeapon;
    newEquipment.off = EmptyWeapon;
  } else if (position === "AR") {
    newEquipment.armor = EmptyArmor;
  }

  const updatedCharacter = {
    ...character,
    equipment: newEquipment,
  };
  postSelectedCharacter(updatedCharacter);
  return updatedCharacter;
}

export function onEquipItem({ character, item, position }: EquipProps) {
  const characterClone = cloneDeep(character);
  const equipment = cloneDeep(characterClone.equipment);

  const isItemInMainHand =
    "id" in equipment.main && equipment.main.id === item.id;
  const isItemInOffHand = "id" in equipment.off && equipment.off.id === item.id;
  const isMainHand2H = "id" in equipment.main && equipment.main.equip === "2H";

  // Check if the same item is already equipped in the Main Hand (MH)
  if (position === "OH" && (isItemInMainHand || isMainHand2H)) {
    equipment.main = EmptyWeapon;
  }

  if (position === "MH") {
    equipment.main = cloneDeep(item);
    if (isItemInOffHand) {
      equipment.off = EmptyWeapon;
    }
  } else if (position === "OH") {
    equipment.off = cloneDeep(item);
  } else if (position === "2H") {
    equipment.main = cloneDeep(item);
    equipment.off = EmptyWeapon;
  } else if (position === "AR") {
    equipment.armor = cloneDeep(item);
  }

  const updatedCharacter = {
    ...character,
    equipment: equipment,
  };
  postSelectedCharacter(updatedCharacter);
  return updatedCharacter;
}

interface onDeleteItemProps {
  id: string;
  character: CharacterEntry;
}

export function onDeleteItem({ id, character }: onDeleteItemProps) {
  if (!character) return;

  const updatedInventory = character.inventory.filter((item) => item.id !== id);

  // Clone the character's equipment
  const updatedEquipment = { ...character.equipment };

  // Check main equipment
  if (updatedEquipment.main.id === id) {
    updatedEquipment.main = EmptyWeapon;
  }

  // Check off equipment
  if (updatedEquipment.off.id === id) {
    updatedEquipment.off = EmptyWeapon;
  }

  // Check armor equipment
  if (updatedEquipment.armor.id === id) {
    updatedEquipment.armor = EmptyArmor;
  }

  // ... You can add more checks here if there are more equipment types ...

  const updatedCharacter = {
    ...character,
    inventory: updatedInventory,
    equipment: updatedEquipment, // update the equipment of the character
  };
  postSelectedCharacter(updatedCharacter);
  return updatedCharacter;
}

interface onChangeQuantityProps {
  id: string;
  count: number;
  character: CharacterEntry;
}

export function onChangeQuantity({
  id,
  count,
  character,
}: onChangeQuantityProps) {
  const characterClone = cloneDeep(character);
  const inventory = characterClone.inventory;
  const equipment = characterClone.equipment;

  inventory.forEach((item) => {
    if (item.id === id) {
      item.quantity.count = count;
    }
  });

  if (equipment.main.id === id) {
    equipment.main.quantity.count = count;
  } else if (equipment.off.id === id) {
    equipment.off.quantity.count = count;
  } else if (equipment.armor.id === id) {
    equipment.armor.quantity.count = count;
  }

  const updatedCharacter = {
    ...characterClone,
    inventory: inventory,
  };
  postSelectedCharacter(updatedCharacter);
  return updatedCharacter;
}

type Quantity = {
  count: number;
};

type EquipmentItem = {
  id: string;
  category: string;
  quantity: Quantity;
};

export function onUseAmmunition(character: CharacterEntry): {
  updatedCharacter: CharacterEntry;
  hasAmmunition: boolean;
} {
  let usedAmmunitionId = "";

  const { main, off, armor } = character.equipment;

  const slots: EquipmentItem[] = [main, off];

  const hasAmmunition = slots.some(
    (item) => item.category === "ammunition" && item.quantity.count > 0,
  );

  const updatedEquipmentSlots = slots.map((item) => {
    if (item.category === "ammunition" && item.quantity.count > 0) {
      usedAmmunitionId = item.id;
      const updatedItem = {
        ...item,
        quantity: {
          ...item.quantity,
          count: item.quantity.count - 1,
        },
      };
      return updatedItem;
    }
    return item;
  });

  const updatedInventory = character.inventory.map((item) =>
    item.id === usedAmmunitionId
      ? {
          ...item,
          quantity: {
            ...item.quantity,
            count: item.quantity.count - 1,
          },
        }
      : item,
  );

  const updatedCharacter: CharacterEntry = {
    ...character,
    equipment: {
      main: updatedEquipmentSlots[0] as ItemEntry,
      off: updatedEquipmentSlots[1] as ItemEntry,
      armor: armor,
    },
    inventory: updatedInventory,
  };

  postSelectedCharacter(updatedCharacter);
  return { updatedCharacter, hasAmmunition };
}

export function onAddToughness(character: CharacterEntry) {
  const characterClone = cloneDeep(character);
  const value_step = 1;

  if (characterClone.damage > 0) {
    characterClone.damage -= value_step;
    postSelectedCharacter(characterClone);
  }

  return characterClone;
}

export function onSubToughness(character: CharacterEntry) {
  const characterClone = cloneDeep(character);

  const maxToughness =
    characterClone.stats.strong.value < 10
      ? 10
      : characterClone.stats.strong.value;

  const value_step = 1;

  if (characterClone.damage === maxToughness) {
    return character;
  } else {
    characterClone.damage += value_step;
  }
  postSelectedCharacter(characterClone);
  return characterClone;
}

export function onAddPermCorruption(character: CharacterEntry) {
  const character_corruption = character.corruption;
  const corruptionThreshold = Math.ceil(character.stats.resolute.value / 2);

  const value_step = 1;

  if (character_corruption.permanent === corruptionThreshold * 3) {
    return character;
  } else {
    character_corruption.permanent += value_step;
  }

  const updatedCharacter = {
    ...character,
    corruption: character_corruption,
  };
  postSelectedCharacter(updatedCharacter);
  return updatedCharacter;
}

export function onSubPermCorruption(character: CharacterEntry) {
  const character_corruption = character.corruption;

  const value_step = 1;

  if (character_corruption.permanent === 0) {
    return character;
  } else {
    character_corruption.permanent -= value_step;
  }

  const updatedCharacter = {
    ...character,
    corruption: character_corruption,
  };
  postSelectedCharacter(updatedCharacter);
  return updatedCharacter;
}

export function onAddUnspentXp(character: CharacterEntry) {
  let character_xp_earned = character.details.xp_earned;

  const value_step = 1;
  character_xp_earned += value_step;

  const updatedCharacter = {
    ...character,
    details: {
      ...character.details,
      xp_earned: character_xp_earned,
    },
  };
  postSelectedCharacter(updatedCharacter);
  return updatedCharacter;
}

export function onSubUnspentXp(character: CharacterEntry) {
  let character_combined_xp =
    character.details.xp_earned - getCharacterXp(character);
  const value_step = 1;

  if (character_combined_xp <= 0) {
    return character;
  } else {
    character.details.xp_earned -= value_step;
  }

  const updatedCharacter = {
    ...character,
    details: {
      ...character.details,
      xp_earned: character.details.xp_earned,
    },
  };
  postSelectedCharacter(updatedCharacter);
  return updatedCharacter;
}

function RestFood(character: CharacterEntry) {
  const newRations = cloneDeep(character.rations);
  const burnRate = GetBurnRate(character);
  const hasFood = newRations.food >= burnRate;

  if (hasFood) {
    newRations.food -= burnRate;

    const updatedCharacter = {
      ...character,
      rations: newRations,
    };

    // Use the returned character from onAddToughness
    return onAddToughness(updatedCharacter);
  }

  return character;
}

function RestWater(character: CharacterEntry) {
  const newRations = cloneDeep(character.rations);
  const burnRate = GetBurnRate(character);
  const hasWater = newRations.water >= burnRate;

  if (hasWater === true) {
    newRations.water -= burnRate;
    const updatedCharacter = {
      ...character,
      rations: newRations,
    };
    onResetCorruption(updatedCharacter);
    return updatedCharacter;
  }
  return character;
}

export function RestCharacter(character: CharacterEntry) {
  const food_character = RestFood(character);
  const water_character = RestWater(food_character);

  return water_character;
}

export async function postSelectedCharacter(updatedCharacter: CharacterEntry) {
  try {
    const res = await axios.put(
      `${API}/api/characterlog/${updatedCharacter.name}`,
      updatedCharacter,
    );
    // Assuming res.data contains the updated character
  } catch (error) {
    const res = await axios.put(
      `${API}/api/creaturelog/${updatedCharacter.name}`,
      updatedCharacter,
    );
  }
}

export async function addNewCharacter(NewCharacterEntry: CharacterEntry) {
  return axios
    .post(`${API}/api/characterlog`, NewCharacterEntry)
    .then((res) => {
      return res;
    });
}

export async function addNewRoster(NewCharacterEntry: CharacterEntry) {
  return axios.post(`${API}/api/rosterlog`, NewCharacterEntry).then((res) => {
    return res;
  });
}

export async function deleteRosterCharacter(name: string, id: string) {
  const response = await axios.delete(`${API}/api/rosterlog/${id}/${name}`);
  return response.data;
}

export async function addNewCreature(NewCharacterEntry: CharacterEntry) {
  return axios.post(`${API}/api/creaturelog`, NewCharacterEntry).then((res) => {
    return res;
  });
}

export async function deleteCreature(name: string) {
  const response = await axios.delete(`${API}/api/creaturelog/${name}`);
  return response.data;
}

export function swapActives(
  character: CharacterEntry,
  source: string,
  target: string,
) {
  const characterActives = cloneDeep(character.actives);

  // Iterate over the keys (e.g., 'attack', 'defense', etc.)
  (Object.keys(characterActives) as ActiveKey[]).forEach((key) => {
    if (characterActives[key].stat === source.toLowerCase()) {
      characterActives[key].stat = target.toLowerCase() as StatName;
    } else if (characterActives[key].stat === target.toLowerCase()) {
      characterActives[key].stat = source.toLowerCase() as StatName;
    }
  });

  const updatedCharacter = {
    ...character,
    actives: characterActives,
  };
  postSelectedCharacter(updatedCharacter);
  return updatedCharacter;
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
  let burn_rate = 1;

  const storageModifiers = {
    "Storage 2": 1,
    "Storage 4": 2,
    "Storage 6": 3,
    "Storage 8": 4,
    "Storage 10": 5,
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

  character.entourage.forEach((member) => {
    if (member.resistance === "Weak") {
      burn_rate += 1;
    } else if (member.resistance === "Ordinary") {
      burn_rate += 2;
    } else if (member.resistance === "Challenging") {
      burn_rate += 3;
    } else if (member.resistance === "Strong") {
      burn_rate += 4;
    } else if (member.resistance === "Mighty") {
      burn_rate += 5;
    } else if (member.resistance === "Legendary") {
      burn_rate += 6;
    }
  });
  return burn_rate;
}
