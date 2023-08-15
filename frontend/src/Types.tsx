interface CharacterDetails {
  name: string;
  xp: number;
  unspent: number;
  movement: number;
}

interface Toughness {
  damage: number;
  max: number;
  pain: number;
}

interface Stats {
  cunning: number;
  discreet: number;
  persuasive: number;
  quick: number;
  resolute: number;
  strong: number;
  vigilant: number;
  accurate: number;
}

export interface Actives {
  [key: string]: string;
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

export interface ItemEntry {
  roll: string[];
  quality: string[];
  equip: string[];
  type: string;
  cost: string;
  name: string;
  category: string;
  id: string;
}

export type CombatEntry = {
  character: string;
  result: number;
  active: string;
  type: string;
  details: string;
};

export type AbilityEntry = {
  name: string;
  requirement: string;
  tradition: string;
  description: string;
  novice: string;
  adept: string;
  master: string;
  type: string;
  tag: string;
  id: string;
};
