import axios from "axios";
import { API } from "../Constants";
import { GetGameData } from "../contexts/GameContent";
import {
  CharacterEntry,
  modifiedCreature,
  NewCharacterEntry,
  SessionEntry,
} from "../Types";
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
  for (const armor of creature.armor.static.quality) {
    if (armor === "Imp 1") {
      sneaking_mod += -1;
    } else if (armor === "Imp 2") {
      sneaking_mod += -2;
    } else if (armor === "Imp 3") {
      sneaking_mod += -3;
    } else if (armor === "Imp 4") {
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
    if (
      ["burden", "ritual", "utility"].includes(ability.static.type) ||
      ability.free
    ) {
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

export const getUtilityXp = (character: CharacterEntry) => {
  let xp_spent = 0;
  character.abilities.forEach((ability) => {
    if (ability.static.type !== "utility" || ability.free) {
      return;
    }
    xp_spent += 10;
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

export const DeleteInventorySlot = (character: CharacterEntry, id: string) => {
  const inventory = character.inventory.filter((item) => item.id !== id);
  character.inventory = inventory;
};

export const FindCharacter = (
  id: string,
  session: SessionEntry,
  is_creature: boolean,
) => {
  const character_list = is_creature
    ? GetGameData().creatures
    : session.characters;
  return character_list.find((entry) => entry.id === id) || NewCharacterEntry;
};
