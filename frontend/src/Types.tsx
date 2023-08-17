interface CharacterDetails {
  name: string;
  xp: number;
  unspent: number;
  movement: number;
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
