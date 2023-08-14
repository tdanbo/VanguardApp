import axios from "axios";
import { CharacterEntry } from "../Types";
import { createContext, useState } from "react";
import { ItemEntry, AbilityEntry } from "../Types";
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
  if (character.inventory.length === Math.ceil(character.stats.strong * 2)) {
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

    postSelectedCharacter(updatedCharacter);
    return updatedCharacter;
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
  return updatedCharacter;
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
  //   const updatedInventory = onAddInventoryItem({
  //     item: currentlyEquipped,
  //     character: updatedCharacter,
  //   });

  return updatedCharacter;
}

export function onDeleteItem({ id, character }: onDeleteProps) {
  if (!character) return;

  const updatedInventory = character.inventory.filter((item) => item.id !== id);

  const updatedCharacter = {
    ...character,
    inventory: updatedInventory,
  };
  postSelectedCharacter(updatedCharacter);
  return updatedCharacter;
}

export function postSelectedCharacter(updatedCharacter: CharacterEntry) {
  console.log("Updating Character");
  // selectedCharacter.inventory = inventory; THIS WILL UPDATE THE INVENTORY< BUT NOT PROC THE RE-RENDER
  axios
    .put(
      `http://localhost:8000/api/characterlog/${updatedCharacter.details.name}`,
      updatedCharacter,
    )
    .then((res) => console.log(res));
}
