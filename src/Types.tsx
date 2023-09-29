interface CharacterDetails {
  name: string;
  xp_earned: number;
  movement: number;
  modifier: number;
}

interface Toughness {
  damage: Stat;
  max: Stat;
  pain: Stat;
}

interface Stat {
  value: number;
  mod: number;
}

interface Stat {
  value: number;
  mod: number;
}

export type StatName =
  | "cunning"
  | "discreet"
  | "persuasive"
  | "quick"
  | "resolute"
  | "strong"
  | "vigilant"
  | "accurate";

type Stats = {
  [key in StatName]: Stat;
};

export type ActiveKey = "attack" | "defense" | "casting" | "sneaking";

export type AttackActive = {
  value: number;
  dice1: number;
  dice1_mod: number;
  dice1_name: string;
  dice2: number;
  dice2_mod: number;
  dice2_name: string;
};

export type DefenseActive = {
  value: number;
  dice: number;
  dice_mod: number;
  dice_name: string;
};

export type SimpleActive = {
  value: number;
};

export interface Actives {
  attack: AttackActive;
  defense: DefenseActive;
  casting: SimpleActive;
  sneaking: SimpleActive;
}

export interface ActiveStats {
  attack: StatName;
  defense: StatName;
  casting: StatName;
  sneaking: StatName;
}

type Corruption = {
  permanent: number;
  temporary: number;
  threshold: number;
};

interface Rations {
  food: number;
  water: number;
}

interface EquipmentEntry {
  main: ItemEntry;
  off: ItemEntry;
  armor: ItemEntry;
}

export interface CharacterEntry {
  id: string;
  portrait: string;
  details: CharacterDetails;
  toughness: Toughness;
  stats: Stats;
  corruption: Corruption;
  actives: ActiveStats;
  abilities: AbilityEntry[];
  inventory: ItemEntry[];
  equipment: EquipmentEntry;
  rations: Rations;
  money: number;
}

interface Roll {
  roll: boolean;
  mod: number;
  dice: number;
  type: string;
}

interface Quantity {
  count: number;
  bulk: boolean;
}

export interface ItemEntry {
  roll: Roll;
  quality: string[];
  equip: string;
  quantity: Quantity;
  type: string;
  cost: string;
  name: string;
  category: string;
  id: string;
  description: string;
}

export type CombatEntry = {
  id: string;
  character: string;
  portrait: string;
  source: string;
  active: string;
  dice: number;
  result: number;
  success: boolean;
  roll: number;
  modifier: number;
  target: number;
};

export type SessionEntry = {
  name: string;
  id: string;
  date: string;
  owner: string;
};

export interface AbilityRoll {
  dice: number;
  type: string;
  mod: number;
}

export interface Ability {
  description: string;
  roll: AbilityRoll[];
}

export type AbilityEntry = {
  name: string;
  requirement: string;
  tradition: string;
  description: string;
  novice: Ability;
  adept: Ability;
  master: Ability;
  type: string;
  tag: string;
  id: string;
  level: string;
};

export const EmptyWeapon: ItemEntry = {
  roll: { roll: true, dice: 4, mod: 0, type: "damage" },
  quality: [],
  equip: "1H",
  quantity: { count: 0, bulk: false },
  type: "Hand Weapon",
  cost: "",
  name: "Knuckles",
  category: "ordinary_weapon",
  id: "aaaaaaaaaa",
  description: "Fight with your bare hands.",
};

export const EmptyArmor: ItemEntry = {
  roll: { roll: true, dice: 4, mod: 0, type: "armor" },
  quality: [],
  equip: "AR",
  quantity: { count: 0, bulk: false },
  type: "Light Armor",
  cost: "",
  name: "Simple Clothes",
  category: "ordinary_armor",
  id: "bbbbbbbbbb",
  description: "You feel robbed of your dignity.",
};
