import axios from "axios";
import { Socket } from "socket.io-client";
import { API } from "../Constants";
import { GetGameData } from "../contexts/GameContent";
import {
  CharacterEntry,
  FocusedStateType,
  ItemEntry,
  modifiedCreature,
  NewCharacterEntry,
  RollValueType,
  SessionEntry,
  StatName,
} from "../Types";
import { CheckAbility, CheckEffect } from "./ActivesFunction";
import {
  GetMaxSlots,
  GetMaxToughness,
  GetTemporaryCorruption,
} from "./RulesFunctions";
import { update_session } from "./SessionsFunctions";
import { IsArmor } from "./UtilityFunctions";
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

export function HasRangedWeapon(character: CharacterEntry) {
  for (const item of character.inventory) {
    if (item.static.category === "ranged weapon" && item.equipped) {
      return true;
    }
  }
  return false;
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

export function GetCreatureArmor(creature: CharacterEntry) {
  let armor: number = 0;
  creature.inventory.forEach((item) => {
    if (item && IsArmor(item) && item.equipped) {
      item.static.roll.forEach((roll) => {
        armor += Math.ceil(roll.value / 2);
      });
    }
  });
  return armor;
}

export function GetDifficultyString(character: CharacterEntry) {
  let character_difficulty = "Weak";
  if (character.details.xp_earned < 50) {
    character_difficulty = "Weak";
  } else if (character.details.xp_earned < 150) {
    character_difficulty = "Ordinary";
  } else if (character.details.xp_earned < 300) {
    character_difficulty = "Challenging";
  } else if (character.details.xp_earned <= 600) {
    character_difficulty = "Strong";
  } else if (character.details.xp_earned <= 1200) {
    character_difficulty = "Mighty";
  } else {
    character_difficulty = "Legendary";
  }
  return character_difficulty;
}

export function GetAttackStat(character: CharacterEntry) {
  let attack_stat: StatName = "accurate";

  if (CheckAbility(character, "Iron Fist", "novice")) {
    attack_stat = "strong";
  } else if (CheckAbility(character, "Tactician", "master")) {
    attack_stat = "cunning";
  } else if (CheckAbility(character, "Dominate", "novice")) {
    attack_stat = "persuasive";
  } else if (CheckAbility(character, "Feint", "novice")) {
    attack_stat = "discreet";
  } else if (CheckAbility(character, "Sixth Sense", "novice")) {
    attack_stat = "vigilant";
  } else {
    attack_stat = "accurate";
  }
  return attack_stat;
}

export function GetDefenseStat(character: CharacterEntry) {
  let defense_stat: StatName = "quick";
  if (CheckAbility(character, "Tactician", "adept")) {
    defense_stat = "cunning";
  } else if (CheckAbility(character, "Sixth Sense", "adept")) {
    defense_stat = "vigilant";
  } else if (CheckAbility(character, "feint", "adept")) {
    defense_stat = "discreet";
  } else if (CheckAbility(character, "parry mastery", "novice")) {
    defense_stat = "accurate";
  } else {
    defense_stat = "quick";
  }
  return defense_stat;
}

export function IsOverburden(character: CharacterEntry) {
  if (character.inventory.length === GetMaxSlots(character) * 2) {
    return true;
  }
  return false;
}

export function HasAmmunition(
  character: CharacterEntry,
  take_ammu: boolean = false,
) {
  console.log("Checking for ammunition");
  for (const item of character.inventory) {
    if (
      item.static.category === "projectile" &&
      item.equipped &&
      item.quantity > 0
    ) {
      if (take_ammu) {
        item.quantity -= 1;
      }
      return true;
    }
  }
  return false;
}

export function IsRangedWeapon(item: ItemEntry) {
  if (item.static.category === "ranged weapon") {
    return true;
  } else {
    return false;
  }
}

export function GetDiceSum(roll_values: RollValueType[]) {
  let sum = 0;
  roll_values.forEach((roll) => {
    sum += roll.value;
  });
  return sum;
}

export function GetDiceTitle(roll_values: RollValueType[]) {
  let title = "";
  roll_values.forEach((roll) => {
    title += `+${roll.value} ${roll.source}\n`;
  });
  return title;
}

export function IsFocusedItem(
  character: CharacterEntry,
  item: ItemEntry,
): FocusedStateType {
  let is_focused: FocusedStateType = "normal";
  const has_massive = item.static.quality.includes("Massive");

  if (CheckEffect(character, "Focused") || has_massive) {
    is_focused = "focused";
  } else if (CheckEffect(character, "Unfocused")) {
    is_focused = "unfocused";
  }

  return is_focused;
}

export function IsFocusedAbility(character: CharacterEntry): FocusedStateType {
  let is_focused: FocusedStateType = "normal";
  if (CheckEffect(character, "Focused")) {
    is_focused = "focused";
  } else if (CheckEffect(character, "Unfocused")) {
    is_focused = "unfocused";
  }
  return is_focused;
}
