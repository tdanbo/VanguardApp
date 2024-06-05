import axios from "axios";
import { API } from "../Constants";
import { GetGameData } from "../contexts/GameContent";
import { ActivesEntry, StatName } from "../Types";
import { update_session } from "./SessionsFunctions";
import {
  CharacterEntry,
  modifiedCreature,
  NewCharacterEntry,
  SessionEntry,
} from "../Types";
import { GetMaxToughness, GetTemporaryCorruption } from "./RulesFunctions";
import { Socket } from "socket.io-client";
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
      ["burden", "ritual", "utility"].includes(ability.static.category) ||
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
    if (ability.static.category !== "utility" || ability.free) {
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

export function FindValueFromActive(
  type: "attack" | "defense" | "sneaking" | "casting" | "initiative",
  character: CharacterEntry,
  character_actives: ActivesEntry,
) {
  for (const [key, value] of Object.entries(character_actives)) {
    if (key == type) {
      return {
        stat: value.stat,
        value:
          character.stats[value.stat].value +
          character.stats[value.stat].mod +
          value.mod,
      };
    } else {
      continue;
    }
  }
  return { stat: "", value: 0 };
}

export function FindActiveModFromStat(
  stat: StatName,
  character_actives: ActivesEntry,
) {
  for (const [_key, value] of Object.entries(character_actives)) {
    if (value.stat == stat) {
      return value.mod;
    } else {
      continue;
    }
  }
  return 0;
}

export function HasAmmunition(character: CharacterEntry) {
  for (const item of character.inventory) {
    if (
      item.static.category === "projectile" &&
      item.equipped &&
      item.quantity > 0
    ) {
      item.quantity -= 1;
      return true;
    }
  }
  return false;
}

export function HasRangedWeapon(character: CharacterEntry) {
  for (const item of character.inventory) {
    if (item.static.category === "ranged weapon" && item.equipped) {
      return true;
    }
  }
  return false;
}

export function Ammunition(character: CharacterEntry) {
  if (HasAmmunition(character)) {
    return true;
  } else {
    return false;
  }
}

export function LowerToughness(
  character: CharacterEntry,
  session: SessionEntry,
  websocket: Socket,
  isCreature: boolean,
) {
  if (character.health.damage === GetMaxToughness(character)) {
    console.log("Max damage reached");
  } else {
    character.health.damage += 1;
    session.travel.damage_gain += 1;
    update_session(session, websocket, character, isCreature);
  }
}

export function RaiseToughness(
  character: CharacterEntry,
  session: SessionEntry,
  websocket: Socket,
  isCreature: boolean,
) {
  if (character.health.damage === 0) {
    console.log("Already at max toughness");
  } else {
    character.health.damage -= 1;
    update_session(session, websocket, character, isCreature);
  }
}

export function LowerCorruption(
  character: CharacterEntry,
  session: SessionEntry,
  websocket: Socket,
  isCreature: boolean,
) {
  if (character.health.shield === GetTemporaryCorruption(character)) {
    character.health.corruption += 1;
  } else {
    character.health.shield += 1;
    session.travel.corruption_gain += 1;
    update_session(session, websocket, character, isCreature);
  }
}

export function RaiseCorruption(
  character: CharacterEntry,
  session: SessionEntry,
  websocket: Socket,
  isCreature: boolean,
) {
  if (character.health.shield === 0) {
    console.log("Temporary Corruption is full");
  } else {
    character.health.shield -= 1;
    update_session(session, websocket, character, isCreature);
  }
}
