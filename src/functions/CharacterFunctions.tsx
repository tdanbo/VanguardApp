import axios from "axios";
import { API } from "../Constants";
import { CharacterEntry, modifiedCreature } from "../Types";
import { EmptyArmor, EmptyWeapon } from "../Types";
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

export const getCharacterXp = (character: CharacterEntry) => {
  let xp_spent = 0;

  character.abilities.forEach((ability) => {
    if (ability.type.toLocaleLowerCase() === "trait") {
      return;
    } else if (ability.type.toLocaleLowerCase() === "burden") {
      return;
    } else if (ability.type.toLocaleLowerCase() === "ritual") {
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
  return axios.post(`${API}/api/creatures`, NewCharacterEntry).then((res) => {
    return res;
  });
}

export async function delete_creature(name: string) {
  await axios.delete(`${API}/api/creatures/${name}`);
}

export function SetFlexibleEquip(character: CharacterEntry) {
  const hasFlexibleEquipped =
    character.equipment.main.quality.includes("Flexible") ||
    character.equipment.off.quality.includes("Flexible");

  for (const item of character.inventory) {
    if (hasFlexibleEquipped) {
      if (
        item.type === "Long Weapon" ||
        item.type === "Heavy Weapon" ||
        item.type === "Artifact Long Weapon" ||
        item.type === "Artifact Heavy Weapon"
      ) {
        item.equip = "1H";
      }
    } else {
      if (
        item.type === "Long Weapon" ||
        item.type === "Heavy Weapon" ||
        item.type === "Artifact Long Weapon" ||
        item.type === "Artifact Heavy Weapon"
      ) {
        item.equip = "2H";
      }
      if (
        character.equipment.main.type === "Long Weapon" ||
        character.equipment.main.type === "Heavy Weapon" ||
        character.equipment.main.type === "Artifact Long Weapon" ||
        character.equipment.main.type === "Artifact Heavy Weapon"
      ) {
        character.equipment.main.equip = "2H";
      }
      if (
        character.equipment.off.type === "Long Weapon" ||
        character.equipment.off.type === "Heavy Weapon" ||
        character.equipment.off.type === "Artifact Long Weapon" ||
        character.equipment.off.type === "Artifact Heavy Weapon"
      ) {
        character.equipment.off.equip = "2H";
      }
    }
  }
}

export const DeleteInventorySlot = (character: CharacterEntry, id: string) => {
  const inventory = character.inventory.filter((item) => item.id !== id);
  const equipment = character.equipment;
  // Check main equipment
  if (equipment.main.id === id) {
    equipment.main = EmptyWeapon;
  }

  // Check off equipment
  if (equipment.off.id === id) {
    equipment.off = EmptyWeapon;
  }

  // Check armor equipment
  if (equipment.armor.id === id) {
    equipment.armor = EmptyArmor;
  }

  character.inventory = inventory;
  character.equipment = equipment;

  SetFlexibleEquip(character);
};
