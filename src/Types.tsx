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

export interface Active {
  stat: StatName;
  mod: number;
}

export type ActiveKey = "attack" | "defense" | "casting" | "sneaking";

export interface Actives {
  attack: Active;
  defense: Active;
  casting: Active;
  sneaking: Active;
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
  main: ItemEntry | {};
  off: ItemEntry | {};
  armor: ItemEntry | {};
}

export interface CharacterEntry {
  id: string;
  portrait: string;
  details: CharacterDetails;
  toughness: Toughness;
  stats: Stats;
  corruption: Corruption;
  actives: Actives;
  abilities: AbilityEntry[];
  inventory: ItemEntry[];
  equipment: EquipmentEntry;
  rations: Rations;
  money: number;
}

interface Roll {
  roll: boolean;
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
  modifier: number;
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
