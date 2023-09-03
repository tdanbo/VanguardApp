import axios from "axios";
import { CharacterEntry } from "../Types";
import { createContext, useState } from "react";
import { ItemEntry, AbilityEntry, ActiveKey } from "../Types";
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

interface OnUnequipProps {
  item: ItemEntry;
  character: CharacterEntry;
  equipped: string;
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

  updatedCharacter.actives[active].stat = stat;
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
  // const character_corruption = character.corruption;
  // let count = 0;
  // Object.keys(character_corruption).forEach((key) => {
  //   if (count === value) {
  //     return;
  //   }
  //   if (character_corruption[key] === 0) {
  //     character_corruption[key] = 1;
  //     count += 1;
  //   } else {
  //     return;
  //   }
  // });
  // Object.keys(character_corruption).forEach((key) => {
  //   if (count === value) {
  //     return;
  //   }
  //   if (character_corruption[key] === 1) {
  //     character_corruption[key] = 2;
  //     count += 1;
  //   } else {
  //     return;
  //   }
  // });
  // const updatedCharacter = {
  //   ...character,
  //   corruption: character_corruption,
  // };
  // postSelectedCharacter(updatedCharacter);
  return character;
};

export const onResetCorruption = (character: CharacterEntry) => {
  return character;
  // const character_corruption = character.corruption;
  // Object.keys(character_corruption).forEach((key) => {
  //   if (character_corruption[key] === 1) {
  //     character_corruption[key] = 0;
  //   }
  // });
  // const updatedCharacter = {
  //   ...character,
  //   corruption: character_corruption,
  // };
  // postSelectedCharacter(updatedCharacter);
  // return updatedCharacter;
};

// export const onChangeCorruptionLevel = (
//   character: CharacterEntry,
//   state: string,
// ) => {
//   const character_details = character.details;

//   if (state === "add") {
//     if (character_details.corruption >= 3) {
//       character_details.corruption = 3;
//     } else {
//       character_details.corruption += 1;
//     }
//   } else {
//     if (character_details.corruption <= 1) {
//       character_details.corruption = 1;
//     } else {
//       character_details.corruption -= 1;
//     }
//   }

//   const updatedCharacter = {
//     ...character,
//     details: character_details,
//   };

//   postSelectedCharacter(updatedCharacter);
//   return updatedCharacter;
// };

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

  character.equipment.forEach((item) => {
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
  if (
    character.inventory.length === Math.ceil(character.stats.strong.value * 2)
  ) {
    console.log("Inventory is full");
    return;
  } else {
    console.log("Adding Item");
    const itemWithId = {
      ...item,
      id: generateRandomId(),
    };

    const newInventory: ItemEntry[] = [...character.inventory, itemWithId];

    const updatedCharacter = {
      ...character,
      inventory: newInventory,
    };

    const updatedModifiersCharacter = getActiveModifiers(updatedCharacter);

    postSelectedCharacter(updatedModifiersCharacter);
    return updatedModifiersCharacter;
  }
};

export function onUnequipItem({ item, equipped, character }: OnUnequipProps) {
  if (equipped === "AR") {
    character.equipment[0] = {} as ItemEntry;
  } else if (equipped === "MH") {
    character.equipment[1] = {} as ItemEntry;
  } else if (equipped === "OH") {
    character.equipment[2] = {} as ItemEntry;
  } else if (equipped === "2H") {
    character.equipment[1] = {} as ItemEntry;
  }
  const updatedCharacter = onAddInventoryItem({ item, character });
  if (!updatedCharacter) return;
  const updatedModifiersCharacter = getActiveModifiers(updatedCharacter);
  postSelectedCharacter(updatedModifiersCharacter);
  return updatedModifiersCharacter;
}

export function onEquipItem({ id, item, hand, character }: OnEquipProps) {
  const currentlyEquipped = (slot: ItemEntry) => {
    if (Object.keys(slot).length === 0) {
      return false;
    } else {
      character.inventory.push(slot);
      return true;
    }
  };

  if (hand === "AR") {
    currentlyEquipped(character.equipment[0]);
    character.equipment[0] = item;
  } else if (hand === "MH") {
    currentlyEquipped(character.equipment[1]);
    character.equipment[1] = item;
  } else if (hand === "OH") {
    currentlyEquipped(character.equipment[2]);
    character.equipment[2] = item;
  } else if (hand === "2H") {
    currentlyEquipped(character.equipment[1]);
    currentlyEquipped(character.equipment[2]);
    character.equipment[1] = item;
    character.equipment[2] = {} as ItemEntry;
  }
  const updatedCharacter = onDeleteItem({ id, character });
  if (!updatedCharacter) return;

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
  const equipment = character.equipment;

  console.log(count);

  inventory.forEach((item) => {
    if (item.id === id) {
      item.quantity.count = count;
    }
  });

  equipment.forEach((item) => {
    if (item.id === id) {
      item.quantity.count = count;
    }
  });

  const updatedCharacter = {
    ...character,
    inventory: inventory,
    equipment: equipment,
  };

  postSelectedCharacter(updatedCharacter);
  return updatedCharacter;
}

export function onUseAmmunition(character: CharacterEntry): {
  updatedCharacter: CharacterEntry;
  hasAmmunition: boolean;
} {
  const equipment = character.equipment;

  const hasAmmunition = equipment.some(
    (item) => item.category === "ammunition" && item.quantity.count > 0,
  );

  const updatedEquipment = equipment.map((item) => {
    if (item.category === "ammunition" && item.quantity.count > 0) {
      item.quantity.count -= 1;
      return item;
    }
    return item;
  });

  const updatedCharacter = {
    ...character,
    equipment: updatedEquipment,
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

export function onDeleteSelectedCharacter(updatedCharacter: CharacterEntry) {
  // selectedCharacter.inventory = inventory; THIS WILL UPDATE THE INVENTORY< BUT NOT PROC THE RE-RENDER
  axios
    .delete(
      `http://localhost:8000/api/characterlog/${updatedCharacter.details.name}`,
    )
    .then((res) => console.log(res));
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
