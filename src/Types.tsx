interface CharacterDetails {
  race: string;
  xp_earned: number;
  movement: number;
  modifier: number;
}

export interface Stat {
  value: number;
  mod: number;
  active: ActiveKey;
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

export type ActiveKey = "attack" | "defense" | "casting" | "sneaking" | "";

interface Rations {
  food: number;
  water: number;
}

type health = {
  damage: number;
  corruption: number;
  shield: number;
};

export interface CharacterEntry {
  name: string;
  id: string;
  portrait: string;
  details: CharacterDetails;
  health: health;
  stats: Stats;
  abilities: AbilityEntry[];
  inventory: ItemEntry[];
  rations: Rations;
  money: number;
  entry: "CharacterEntry";
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
  entry: "CreatureEntry";
}

type EquipEntry = {
  slot: number;
  equipped: boolean;
};

export interface ItemEntry {
  roll: Roll;
  quality: string[];
  equip: EquipEntry;
  durability: number;
  quantity: Quantity;
  type: string;
  cost: number;
  name: string;
  category: string;
  id: string;
  description: string;
  effect: string[];
  entry: "ItemEntry";
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
  entry: "CombatEntry";
};

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

export type TravelEntry = {
  day: number;
  time: number;
  weather: string;
  distance: number;
};

export type SessionEntry = {
  name: string;
  id: string;
  state: string;
  date: string;
  owner: string;
  travel: TravelEntry;
  characters: CharacterEntry[];
  combatlog: CombatEntry[];
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
  entry: "AbilityEntry";
};

export type ActivesEntry = {
  attack: {value:number, stat:string};
  defense: {value:number, stat:string};
  casting: {value:number, stat:string};
  sneaking: {value:number, stat:string};
}; 

export type TownsEntry = {
  name: string;
  cost: number;
  total: number;
};

export const EmptyWeapon: ItemEntry = {
  roll: { roll: true, dice: 4, mod: 0, type: "damage" },
  quality: [],
  equip: {slot: 1, equipped: false},
  quantity: { count: 0, bulk: false },
  type: "Hand Weapon",
  cost: 0,
  name: "Knuckles",
  category: "weapon",
  id: "aaaaaaaaaa",
  description: "Fight with your bare hands.",
  entry: "ItemEntry",
  effect: [],
  durability: 0,
};

export const GeneralItem: ItemEntry = {
  roll: { roll: false, dice: 0, mod: 0, type: "" },
  quality: [],
  equip: {slot: 0, equipped: false},
  quantity: { count: 0, bulk: false },
  type: "General Good",
  cost: 0,
  name: "",
  category: "general_good",
  id: "",
  description: "",
  entry: "ItemEntry",
  effect: [],
  durability: 0,
};

export const EmptyArmor: ItemEntry = {
  roll: { roll: true, dice: 4, mod: 0, type: "armor" },
  quality: [],
  equip: {slot: 0, equipped: false},
  quantity: { count: 0, bulk: false },
  type: "Light Armor",
  cost: 0,
  name: "Simple Clothes",
  category: "armor",
  id: "bbbbbbbbbb",
  description: "You feel robbed of your dignity.",
  entry: "ItemEntry",
  effect: [],
  durability: 0,
};

export const EmptySession: SessionEntry = {
  name: "",
  id: "1b1b1b1b1b",
  state: "",
  date: "",
  owner: "",
  travel: {
    day: 0,
    time: 0,
    distance: 0,
    weather: "",
  },
  characters: [],
  combatlog: [],
};

export const EmptyCharacter: CharacterEntry = {
  name: "Default Character",
  id: "1b1b1b1b1b",
  portrait: "Ambrian",
  details: {
    race: "",
    xp_earned: 0,
    movement: 0,
    modifier: 0,
  },
  health: {
    damage: 0,
    corruption: 0,
    shield: 0,
  },
  stats: {
    cunning: { value: 0, mod: 0, active: "" },
    discreet: { value: 0, mod: 0, active: "sneaking"  },
    persuasive: { value: 0, mod: 0, active: ""  },
    quick: { value: 0, mod: 0, active: "defense"  },
    resolute: { value: 10, mod: 0, active: "casting"  },
    strong: { value: 0, mod: 0, active: ""  },
    vigilant: { value: 0, mod: 0, active: ""  },
    accurate: { value: 0, mod: 0, active: "attack"  },
  },
  money: 0,
  abilities: [],
  inventory: [],
  rations: { food: 0, water: 0 },
  entry: "CharacterEntry",
};
