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

export interface CharacterEntry {
  details: CharacterDetails;
  toughness: Toughness;
  stats: Stats;
  corruption: Record<string, unknown>;
  abilities: string[];
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
