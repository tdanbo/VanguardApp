import axios from "axios";
import cloneDeep from "lodash/cloneDeep";

import { CharacterEntry } from "../Types";
import {
  ItemEntry,
  AbilityEntry,
  ActiveKey,
  StatName,
  EquipEntry,
} from "../Types";
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
    `http://localhost:8000/api/characterlog/${selectedName}`,
  );
  return response.data;
}

interface OnEquipProps {
  id: string;
  item: ItemEntry;
  character: CharacterEntry;
  hand: string;
}

interface EquipProps {
  item: ItemEntry;
  character: CharacterEntry;
  equipItem: EquipEntry;
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
  console.log(id);
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

  postSelectedCharacter(updatedCharacter);
  return updatedCharacter;
}
export function onDeleteAbility({ id, character }: onDeleteProps) {
  if (!character) return;

  const updatedInventory = character.abilities.filter((item) => item.id !== id);

  const updatedCharacter = {
    ...character,
    abilities: updatedInventory,
  };
  postSelectedCharacter(updatedCharacter);
  return updatedCharacter;
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

  console.log("Speed Calculation");
  console.log(base_speed_sneaking);
  console.log(base_speed);

  console.log(calculated_speed);

  return calculated_speed;
};

export const onAddCorruption = (character: CharacterEntry, value: number) => {
  let character_corruption = { ...character.corruption };

  for (let i = 0; i < value; i++) {
    if (character_corruption.temporary === character_corruption.threshold) {
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

export const getActiveModifiers = (character: CharacterEntry) => {
  const character_actives = character.actives;
  const equippedItems = getEquippedItems(character);

  character_actives["attack"].mod = 0;
  character_actives["defense"].mod = 0;
  character_actives["casting"].mod = 0;
  character_actives["sneaking"].mod = 0;

  const overburden = character.stats.strong.value - character.inventory.length;

  if (overburden < 0) {
    console.log("Overburdened");
    character_actives["defense"].mod += overburden;
  } else {
    console.log("Not Overburdened");
  }

  equippedItems.forEach((item) => {
    if (!item.quality || item.quality.length === 0) {
      return;
    }

    item.quality.forEach((quality) => {
      if (quality.includes("Impeding -1")) {
        character_actives["casting"].mod -= 1;
        character_actives["sneaking"].mod -= 1;
        character_actives["defense"].mod -= 1;
      } else if (quality.includes("Impeding -2")) {
        character_actives["casting"].mod -= 2;
        character_actives["sneaking"].mod -= 2;
        character_actives["defense"].mod -= 2;
      } else if (quality.includes("Impeding -3")) {
        character_actives["casting"].mod -= 3;
        character_actives["sneaking"].mod -= 3;
        character_actives["defense"].mod -= 3;
      } else if (quality.includes("Impeding -4")) {
        character_actives["casting"].mod -= 4;
        character_actives["sneaking"].mod -= 4;
        character_actives["defense"].mod -= 4;
      } else if (quality.includes("Balanced 1")) {
        character_actives["defense"].mod += 1;
      } else if (quality.includes("Balanced 2")) {
        character_actives["defense"].mod += 2;
      } else if (quality.includes("Precise")) {
        character_actives["attack"].mod += 1;
      }
    });
  });
  const updatedCharacter = {
    ...character,
    actives: character_actives,
  };
  return updatedCharacter;
};

export const onAddAbilityItem = ({ character, ability }: onAddAbilityProps) => {
  console.log("Adding Ability");
  const abilityWithId = {
    ...ability,
    id: generateRandomId(),
  };

  const newAbilities: AbilityEntry[] = [...character.abilities, abilityWithId];

  const updatedCharacter = {
    ...character,
    abilities: newAbilities,
  };

  postSelectedCharacter(updatedCharacter);
  return updatedCharacter;
};

export const onAddInventoryItem = ({
  character,
  item,
}: onAddCharacterProps) => {
  console.log("Adding Item");

  const newInventory = cloneDeep(character.inventory);

  if (newInventory.length === Math.ceil(character.stats.strong.value * 2)) {
    console.log("Inventory is full");
    return;
  } else {
    console.log("Adding Item");
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

export function getEquippedItems(character: CharacterEntry) {
  const equippedItems = character.inventory.filter((item) =>
    item.equip.some((e) => e.equipped === true),
  );

  return equippedItems;
}

export function onUnequipItem({ character, item, equipItem }: EquipProps) {
  console.log("Unequipping Item");
  const newInventory = cloneDeep(character.inventory);

  newInventory.forEach((inventory_item) => {
    console.log(inventory_item.id);
    if (inventory_item.id === item.id) {
      inventory_item.equip.forEach((invItem) => {
        if (invItem.type === equipItem.type) {
          invItem.equipped = false;
        }
      });
    }
  });

  const updatedCharacter = {
    ...character,
    inventory: newInventory,
  };

  console.log(updatedCharacter.inventory);

  const updatedModifiersCharacter = getActiveModifiers(updatedCharacter);
  postSelectedCharacter(updatedModifiersCharacter);
  return updatedModifiersCharacter;
}

export function onEquipItem({ character, item, equipItem }: EquipProps) {
  console.log("Equipping Item");
  const newInventory = cloneDeep(character.inventory);

  // Each item can only be used for one equip, so we start by making sure it is fully unqeuipped before doing anything

  const typesToUnequip: { [key: string]: string[] } = {
    "2H": ["2H", "MH", "OH"],
    MH: ["2H", "MH"],
    OH: ["2H", "OH"],
    AR: ["AR"],
  };

  const unequipTypes = typesToUnequip[equipItem.type];

  if (unequipTypes) {
    newInventory.forEach((inventoryItem) => {
      inventoryItem.equip.forEach((invItem) => {
        if (unequipTypes.includes(invItem.type)) {
          invItem.equipped = false;
        }
      });
    });
  }

  newInventory.forEach((inventory_item) => {
    if (inventory_item.id === item.id) {
      inventory_item.equip.forEach((item) => {
        if (item.type === equipItem.type) {
          item.equipped = true;
        } else {
          item.equipped = false;
        }
      });
    }
  });

  const updatedCharacter = {
    ...character,
    inventory: newInventory,
  };

  const updatedModifiersCharacter = getActiveModifiers(updatedCharacter);
  postSelectedCharacter(updatedModifiersCharacter);
  return updatedModifiersCharacter;
}

export function onDeleteItem({ id, character }: onDeleteProps) {
  if (!character) return;

  const updatedInventory = character.inventory.filter((item) => item.id !== id);

  const updatedCharacter = {
    ...character,
    inventory: updatedInventory,
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

  console.log(count);

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
  console.log("Adding Toughness");
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
  console.log("Subtracting Toughness");
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
  console.log("Adding Corruption");
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
  console.log("Removing Corruption");
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
  console.log("Adding XP");
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
  console.log("Adding XP");
  let character_combined_xp =
    character.details.xp_earned - getCharacterXp(character);

  console.log(character_combined_xp);

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

export function postSelectedCharacter(updatedCharacter: CharacterEntry) {
  // selectedCharacter.inventory = inventory; THIS WILL UPDATE THE INVENTORY< BUT NOT PROC THE RE-RENDER
  axios
    .put(
      `http://localhost:8000/api/characterlog/${updatedCharacter.details.name}`,
      updatedCharacter,
    )
    .then((res) => console.log(res));
}

export async function addNewCharacter(NewCharacterEntry: CharacterEntry) {
  return axios
    .post("http://localhost:8000/api/characterlog/", NewCharacterEntry)
    .then((res) => {
      console.log(res);
      return res;
    });
}

export function swapActives(
  character: CharacterEntry,
  source: string,
  target: string,
) {
  console.log("Swapping Actives");
  const characterActives = cloneDeep(character.actives);

  forEach(characterActives, (active, key) => {
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

  // const sourceActive = updatedCharacter.actives[source];
  // const targetActive = updatedCharacter.actives[target];

  // const sourceStat = sourceActive.stat;
  // const targetStat = targetActive.stat;

  // sourceActive.stat = targetStat;
  // targetActive.stat = sourceStat;

  // postSelectedCharacter(updatedCharacter);
  // return updatedCharacter;
}
