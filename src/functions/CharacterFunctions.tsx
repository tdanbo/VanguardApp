import axios from "axios";
import cloneDeep from "lodash/cloneDeep";
import { API } from "../Constants";
import { CharacterEntry } from "../Types";
import { updateAbilityModifiers } from "./AbilityFunctions";
import { ItemEntry, AbilityEntry, ActiveKey, StatName } from "../Types";
import { forEach } from "lodash";
interface onDeleteProps {
  id: string;
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
  id: string;
  level: string;
  character: CharacterEntry;
}

export function onChangeAbilityLevel({
  id,
  level,
  character,
}: onChangeAbilityLevelProps) {
  if (!character) return;

  const updatedAbilities = character.abilities.map((ability) => {
    if (ability.id === id) {
      return {
        ...ability,
        level: level,
      };
    } else {
      return ability;
    }
  });

  const updatedCharacter = {
    ...character,
    abilities: updatedAbilities,
  };

  const updatedModifiersCharacter = getActiveModifiers(updatedCharacter);

  postSelectedCharacter(updatedModifiersCharacter);
  return updatedModifiersCharacter;
}
export function onDeleteAbility({ id, character }: onDeleteProps) {
  if (!character) return;

  const updatedInventory = character.abilities.filter((item) => item.id !== id);

  const updatedCharacter = {
    ...character,
    abilities: updatedInventory,
  };
  const updatedModifiersCharacter = getActiveModifiers(updatedCharacter);

  postSelectedCharacter(updatedModifiersCharacter);
  return updatedModifiersCharacter;
}

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

  const base_speed_sneaking = character.actives.sneaking.mod * 5;
  const base_speed = 40 + speed_modifier;
  const calculated_speed = base_speed + base_speed_sneaking;

  return calculated_speed;
};

export const onAddCorruption = (character: CharacterEntry, value: number) => {
  let character_corruption = { ...character.corruption };

  for (let i = 0; i < value; i++) {
    if (character_corruption.temporary === character_corruption.threshold) {
      if (
        character_corruption.permanent ===
        character_corruption.threshold * 3
      ) {
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

function isItemEntry(equipment: ItemEntry | {}): equipment is ItemEntry {
  return "quality" in equipment;
}

export const getActiveModifiers = (character: CharacterEntry) => {
  const updatedAbilities = updateAbilityModifiers(character);

  const character_actives = updatedAbilities.actives;

  const equippedItems = [
    updatedAbilities.equipment.main,
    updatedAbilities.equipment.off,
    updatedAbilities.equipment.armor,
  ].filter((item) => Object.keys(item).length !== 0);

  character_actives["attack"].mod = 0;
  character_actives["defense"].mod = 0;
  character_actives["casting"].mod = 0;
  character_actives["sneaking"].mod = 0;

  // Minus two because food and water has been taken out of the inventory
  const overburden =
    character.stats.strong.value - 2 - character.inventory.length;

  if (overburden < 0) {
    character_actives["defense"].mod += overburden;
  } else {
  }

  equippedItems.forEach((item) => {
    if (isItemEntry(item)) {
      if (!item.quality || item.quality.length === 0) {
        return;
      }

      const qualityModifiers = {
        "Defense -1": { sneaking: -1, defense: -1 },
        "Defense -2": { sneaking: -2, defense: -2 },
        "Defense -3": { sneaking: -3, defense: -3 },
        "Defense -4": { sneaking: -4, defense: -4 },
        "Casting -1": { casting: -1 },
        "Casting -2": { casting: -2 },
        "Casting -3": { casting: -3 },
        "Casting -4": { casting: -4 },
        "Balanced 1": { defense: 1 },
        "Balanced 2": { defense: 2 },
        "Balanced 3": { defense: 3 },
        Precise: { attack: 1 },
      };

      // Impeding
      item.quality.forEach((quality) => {
        Object.entries(qualityModifiers).forEach(([key, modifiers]) => {
          if (quality.includes(key)) {
            Object.entries(modifiers).forEach(([action, value]) => {
              character_actives[action as keyof typeof character_actives].mod +=
                value;
            });
          }
        });
      });
    }
  });

  const updatedCharacter = {
    ...character,
    actives: character_actives,
  };

  return updatedCharacter;
};

export const onAddAbilityItem = ({ character, ability }: onAddAbilityProps) => {
  const abilityWithId = {
    ...ability,
    id: generateRandomId(),
  };

  const newAbilities: AbilityEntry[] = [...character.abilities, abilityWithId];

  const updatedCharacter = {
    ...character,
    abilities: newAbilities,
  };

  const updatedModifiersCharacter = getActiveModifiers(updatedCharacter);

  postSelectedCharacter(updatedModifiersCharacter);
  return updatedModifiersCharacter;
};

export const onAddInventoryItem = ({
  character,
  item,
}: onAddCharacterProps) => {
  const newInventory = cloneDeep(character.inventory);

  if (newInventory.length === Math.ceil(character.stats.strong.value * 2)) {
    return;
  } else {
    const itemWithId = {
      ...item,
      id: generateRandomId(),
    };

    const newUpdatedInventory: ItemEntry[] = [...newInventory, itemWithId];

    const updatedCharacter = {
      ...character,
      inventory: newUpdatedInventory,
    };

    const updatedModifiersCharacter = getActiveModifiers(updatedCharacter);

    postSelectedCharacter(updatedModifiersCharacter);
    return updatedModifiersCharacter;
  }
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
    newEquipment.main = {};
  } else if (position === "OH") {
    newEquipment.off = {};
  } else if (position === "2H") {
    newEquipment.main = {};
    newEquipment.off = {};
  } else if (position === "AR") {
    newEquipment.armor = {};
  }

  const updatedCharacter = {
    ...character,
    equipment: newEquipment,
  };

  const updatedModifiersCharacter = getActiveModifiers(updatedCharacter);
  postSelectedCharacter(updatedModifiersCharacter);
  return updatedModifiersCharacter;
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
    equipment.main = {};
  }

  if (position === "MH") {
    equipment.main = cloneDeep(item);
    if (isItemInOffHand) {
      equipment.off = {};
    }
  } else if (position === "OH") {
    equipment.off = cloneDeep(item);
  } else if (position === "2H") {
    equipment.main = cloneDeep(item);
    equipment.off = {};
  } else if (position === "AR") {
    equipment.armor = cloneDeep(item);
  }

  const updatedCharacter = {
    ...character,
    equipment: equipment,
  };

  const updatedModifiersCharacter = getActiveModifiers(updatedCharacter);
  postSelectedCharacter(updatedModifiersCharacter);
  return updatedModifiersCharacter;
}

export function onDeleteItem({ id, character }: onDeleteProps) {
  if (!character) return;

  const updatedInventory = character.inventory.filter((item) => item.id !== id);

  // Clone the character's equipment
  const updatedEquipment = { ...character.equipment };

  // Check main equipment
  if ("id" in updatedEquipment.main && updatedEquipment.main.id === id) {
    updatedEquipment.main = {};
  }

  // Check off equipment
  if ("id" in updatedEquipment.off && updatedEquipment.off.id === id) {
    updatedEquipment.off = {};
  }

  // Check armor equipment
  if ("id" in updatedEquipment.armor && updatedEquipment.armor.id === id) {
    updatedEquipment.armor = {};
  }

  // ... You can add more checks here if there are more equipment types ...

  const updatedCharacter = {
    ...character,
    inventory: updatedInventory,
    equipment: updatedEquipment, // update the equipment of the character
  };

  const updatedModifiersCharacter = getActiveModifiers(updatedCharacter);

  postSelectedCharacter(updatedModifiersCharacter);
  return updatedModifiersCharacter;
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
  const inventory = character.inventory;

  inventory.forEach((item) => {
    if (item.id === id) {
      item.quantity.count = count;
    }
  });

  const updatedCharacter = {
    ...character,
    inventory: inventory,
  };

  postSelectedCharacter(updatedCharacter);
  return updatedCharacter;
}

export function onUseAmmunition(character: CharacterEntry): {
  updatedCharacter: CharacterEntry;
  hasAmmunition: boolean;
} {
  const inventory = character.inventory;

  const hasAmmunition = inventory.some(
    (item) =>
      item.equip.some((e) => e.equipped === true) &&
      item.category === "ammunition" &&
      item.quantity.count > 0,
  );

  const updatedInventory = inventory.map((item) => {
    if (
      item.equip.some((e) => e.equipped === true) &&
      item.category === "ammunition" &&
      item.quantity.count > 0
    ) {
      item.quantity.count -= 1;
    }
    return item;
  });

  const updatedCharacter = {
    ...character,
    inventory: updatedInventory,
  };

  postSelectedCharacter(updatedCharacter);

  return { updatedCharacter, hasAmmunition };
}

export function onAddToughness(character: CharacterEntry) {
  const character_toughness = character.toughness;

  const value_step = 1;

  if (character_toughness.damage.value === 0) {
    return character;
  } else {
    character_toughness.damage.value -= value_step;
  }

  const updatedCharacter = {
    ...character,
    toughness: character_toughness,
  };

  postSelectedCharacter(updatedCharacter);
  return updatedCharacter;
}

export function onSubToughness(character: CharacterEntry) {
  console.log("Subtracting toughness");
  const character_toughness = character.toughness;

  const value_step = 1;

  if (character_toughness.damage.value === character_toughness.max.value) {
    return character;
  } else {
    character_toughness.damage.value += value_step;
  }

  const updatedCharacter = {
    ...character,
    toughness: character_toughness,
  };

  postSelectedCharacter(updatedCharacter);
  return updatedCharacter;
}

export function onAddPermCorruption(character: CharacterEntry) {
  const character_corruption = character.corruption;

  const value_step = 1;

  if (character_corruption.permanent === character_corruption.threshold * 3) {
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

  const hasFood = newRations.food > 0;

  if (hasFood === true) {
    newRations.food -= 1;

    const updatedCharacter = {
      ...character,
      rations: newRations,
    };
    onAddToughness(updatedCharacter);
    return updatedCharacter;
  }
  return character;
}

function RestWater(character: CharacterEntry) {
  const newRations = cloneDeep(character.rations);

  const hasWater = newRations.water > 0;

  if (hasWater === true) {
    newRations.water -= 1;
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
  // selectedCharacter.inventory = inventory; THIS WILL UPDATE THE INVENTORY< BUT NOT PROC THE RE-RENDER
  axios
    .put(
      `${API}/api/characterlog/${updatedCharacter.details.name}`,
      updatedCharacter,
    )
    .then((res) => console.log(res));
}

export async function addNewCharacter(NewCharacterEntry: CharacterEntry) {
  return axios
    .post(`${API}/api/characterlog/`, NewCharacterEntry)
    .then((res) => {
      return res;
    });
}

export function swapActives(
  character: CharacterEntry,
  source: string,
  target: string,
) {
  const characterActives = cloneDeep(character.actives);

  forEach(characterActives, (active) => {
    if (active.stat === source.toLowerCase()) {
      active.stat = target.toLowerCase() as StatName;
    } else if (active.stat === target.toLowerCase()) {
      active.stat = source.toLowerCase() as StatName;
    }
  });

  const updatedCharacter = {
    ...character,
    actives: characterActives,
  };

  postSelectedCharacter(updatedCharacter);
  return updatedCharacter;
}

export function UpdateResources(
  character: CharacterEntry,
  food: number,
  water: number,
  money: number,
) {
  const newCharacter = cloneDeep(character);

  newCharacter.rations.food = food;
  newCharacter.rations.water = water;
  newCharacter.money = money;

  postSelectedCharacter(newCharacter);
  return newCharacter;
}
