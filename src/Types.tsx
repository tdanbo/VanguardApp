interface CharacterDetails {
  race: string;
  xp_earned: number;
  movement: number;
  modifier: number;
}

export interface Stat {
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

export type CreatureStats = {
  [key in StatName]: number;
};

export type ActiveKey = "attack" | "defense" | "casting" | "sneaking";

export type AttackActive = {
  stat: StatName;
  value: number;
  dice1: number;
  dice1_mod: number;
  dice1_name: string;
  dice2: number;
  dice2_mod: number;
  dice2_name: string;
  attacks: number;
};

export type DefenseActive = {
  stat: StatName;
  value: number;
  dice: number;
  dice_mod: number;
  dice_name: string;
};

export type SimpleActive = {
  stat: StatName;
  value: number;
};

export interface Actives {
  attack: AttackActive;
  defense: DefenseActive;
  casting: SimpleActive;
  sneaking: SimpleActive;
}

type Corruption = {
  permanent: number;
  temporary: number;
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
  name: string;
  id: string;
  npc: boolean;
  portrait: string;
  details: CharacterDetails;
  damage: number;
  stats: Stats;
  corruption: Corruption;
  actives: Actives;
  abilities: AbilityEntry[];
  inventory: ItemEntry[];
  equipment: EquipmentEntry;
  rations: Rations;
  money: number;
  entourage: string[];
}

export interface modifiedCreature {
  hp: number;
  pain: number;
  attack: number;
  alt_attack: number;
  attacks: number;
  attacks_mod: number;
  defense: number;
  weapon: ItemEntry[];
  armor: ItemEntry;
  stats: CreatureStats;
  abilities: AbilityEntry[];
}

export interface CreatureEntry {
  name: string;
  race: string;
  category: string;
  resistance: string;
  weapon: string[];
  armor: string;
  stats: CreatureStats;
  abilities: Record<string, number>;
  loot: string;
  damage?: number;
  id?: string;
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
  cost: number;
  name: string;
  category: string;
  id: string;
  description: string;
}

export type CombatEntry = {
  uuid: string;
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

export type TravelEntry = {
  day: number;
  time: number;
  weather: string;
  distance: number;
};

export type SessionEntry = {
  name: string;
  id: string;
  date: string;
  owner: string;
  travel: TravelEntry;
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

export type TownsEntry = {
  name: string;
  cost: number;
  total: number;
};

export const EmptyWeapon: ItemEntry = {
  roll: { roll: true, dice: 4, mod: 0, type: "damage" },
  quality: [],
  equip: "1H",
  quantity: { count: 0, bulk: false },
  type: "Hand Weapon",
  cost: 0,
  name: "Knuckles",
  category: "weapon",
  id: "aaaaaaaaaa",
  description: "Fight with your bare hands.",
};

export const EmptyArmor: ItemEntry = {
  roll: { roll: true, dice: 4, mod: 0, type: "armor" },
  quality: [],
  equip: "AR",
  quantity: { count: 0, bulk: false },
  type: "Light Armor",
  cost: 0,
  name: "Simple Clothes",
  category: "armor",
  id: "bbbbbbbbbb",
  description: "You feel robbed of your dignity.",
};
