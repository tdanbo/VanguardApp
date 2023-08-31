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

interface Stats {
  cunning: Stat;
  discreet: Stat;
  persuasive: Stat;
  quick: Stat;
  resolute: Stat;
  strong: Stat;
  vigilant: Stat;
  accurate: Stat;
}

interface Active {
  stat: string;
  mod: number;
}

export type ActiveKey = "attack" | "defense" | "casting" | "sneaking";

export interface Actives {
  attack: Active;
  defense: Active;
  casting: Active;
  sneaking: Active;
}

export interface CharacterEntry {
  details: CharacterDetails;
  toughness: Toughness;
  stats: Stats;
  corruption: Record<string, unknown>;
  actives: Actives;
  abilities: AbilityEntry[];
  inventory: ItemEntry[];
  equipment: ItemEntry[];
}

interface Roll {
  roll: boolean;
  dice: string;
  type: string;
}

interface Quantity {
  count: number;
  bulk: boolean;
}

export interface ItemEntry {
  roll: Roll;
  quality: string[];
  equip: string[];
  quantity: Quantity;
  type: string;
  cost: string;
  name: string;
  category: string;
  id: string;
}

export type CombatEntry = {
  character: string;
  type: string;
  dice: string;
  result: number;
  success: boolean;
  modifier: number;
};

export interface AbilityRoll {
  dice: string;
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
