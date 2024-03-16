interface CharacterDetails {
  race: string;
  xp_earned: number;
  movement: number;
  modifier: number;
  initiative: number;
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

export interface EffectEntry {
  name: string;
  level: number;
  id: string;
  static: {
    description: string;
    type: string;
    entry: "EffectEntry";
  };
}

export interface CharacterEntry {
  name: string;
  id: string;
  portrait: string;
  details: CharacterDetails;
  health: health;
  stats: Stats;
  effects: EffectEntry[];
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

export interface ItemEntry {
  name: string;
  durability: number;
  quantity: number;
  equipped: boolean;
  id: string;
  static: ItemStatic;
}

interface ItemStatic {
  roll: Roll;
  quality: string[];
  type: string;
  cost: number;
  category: string;
  description: string;
  effect: string[];
  bulk: boolean;
  slot: number;
  entry: "ItemEntry";
}

export interface AbilityEntry {
  name: string;
  level: string;
  id: string;
  static: AbilityStatic;
}

interface AbilityStatic {
  requirement: string;
  tradition: string;
  description: string;
  novice: Ability;
  adept: Ability;
  master: Ability;
  type: string;
  tag: string;
  entry: "AbilityEntry";
}

export type DurabilityEntry = {
  name: string;
  check: number;
};

export type CombatEntry = {
  character: CharacterEntry;
  roll_type: RollTypeEntry;
  roll_source: string;
  roll_state: ActiveStateType;
  roll_entry: RollEntry;
  uuid: string;
  durability: DurabilityEntry;
  entry: "CombatEntry";
};

interface Roll {
  roll: boolean;
  mod: number;
  dice: number;
  type: string;
}

export type TravelEntry = {
  day: number;
  time: number;
  weather: string;
  distance: number;
};

export type LootCategory =
  | "drops"
  | "general"
  | "armory"
  | "alchemy"
  | "novelty";

type Loot = {
  [key in LootCategory]: ItemEntry[];
};

export type state = "take" | "buy";

export type SessionEntry = {
  name: string;
  id: string;
  state: state;
  date: string;
  owner: string;
  travel: TravelEntry;
  characters: CharacterEntry[];
  combatlog: CombatEntry[];
  encounter: CharacterEntry[];
  loot: Loot;
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

export type ActiveStateType = "" | "full" | "weak";

export type AdvantageType = "" | "flanking" | "flanked";

export type RollTypeEntry =
  | "damage"
  | "armor"
  | "attack"
  | "defense"
  | "casting"
  | "sneaking"
  | "corruption"
  | "cunning"
  | "discreet"
  | "persuasive"
  | "quick"
  | "resolute"
  | "strong"
  | "vigilant"
  | "accurate"
  | "custom"
  | "resting"
  | "ability"
  | "mystical power";

export type CriticalType = {
  state: 0 | 1 | 2;
  result: number;
};

export type RollEntry = {
  result1: number;
  result2: number;
  roll1: number;
  roll2: number;
  advantage: AdvantageType;
  critical: CriticalType;
  mod: number;
  target: number;
  success: boolean;
  dice: number;
};

export type ActivesEntry = {
  attack: { value: number; stat: string };
  defense: { value: number; stat: string };
  casting: { value: number; stat: string };
  sneaking: { value: number; stat: string };
  initiative: { value: number; stat: string };
};

export type TownsEntry = {
  name: string;
  cost: number;
  total: number;
};

export const EmptyWeapon: ItemEntry = {
  name: "Knuckles",
  equipped: false,
  quantity: 0,
  durability: 0,
  id: "aaaaaaaaaa",
  static: {
    roll: { roll: true, dice: 4, mod: 0, type: "damage" },
    quality: [],
    slot: 1,
    bulk: false,
    type: "normal",
    cost: 0,
    category: "natural weapon",
    description: "Fight with your bare hands.",
    entry: "ItemEntry",
    effect: [],
  },
};

export const GeneralItem: ItemEntry = {
  name: "",
  equipped: false,
  quantity: 0,
  durability: 0,
  id: "",
  static: {
    roll: { roll: false, dice: 0, mod: 0, type: "" },
    quality: [],
    slot: 0,
    bulk: false,
    type: "normal",
    cost: 0,
    category: "general good",
    description: "",
    entry: "ItemEntry",
    effect: [],
  },
};

export const EmptyArmor: ItemEntry = {
  name: "Simple Clothes",
  equipped: false,
  quantity: 0,
  durability: 0,
  id: "bbbbbbbbbb",
  static: {
    roll: { roll: true, dice: 4, mod: 0, type: "armor" },
    quality: [],
    slot: 0,
    bulk: false,
    type: "normal",
    cost: 0,
    category: "light armor",
    description: "You feel robbed of your dignity.",
    entry: "ItemEntry",
    effect: [],
  },
};

export const EmptySession: SessionEntry = {
  name: "",
  id: "1b1b1b1b1b",
  state: "take",
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
  encounter: [],
  loot: { drops: [], general: [], armory: [], alchemy: [], novelty: [] },
};

export const NewCharacterEntry: CharacterEntry = {
  name: "Player Character",
  id: "",
  portrait: "Ambrian",
  details: {
    race: "Ambrian",
    movement: 0,
    xp_earned: 50,
    modifier: 0,
    initiative: 0,
  },
  health: {
    damage: 0,
    corruption: 0,
    shield: 0,
  },
  stats: {
    cunning: { value: 15, mod: 0 },
    discreet: { value: 13, mod: 0 },
    persuasive: { value: 11, mod: 0 },
    quick: { value: 10, mod: 0 },
    resolute: { value: 10, mod: 0 },
    strong: { value: 9, mod: 0 },
    vigilant: { value: 7, mod: 0 },
    accurate: { value: 5, mod: 0 },
  },
  abilities: [],
  inventory: [],
  effects: [],
  rations: { food: 0, water: 0 },
  money: 0,
  entry: "CharacterEntry",
};

export const RESOURCE: ItemEntry = {
  name: "Resource",
  equipped: false,
  quantity: 0,
  durability: 0,
  id: "cccccccccc",
  static: {
    category: "resource",
    description: "",
    bulk: true,
    slot: 0,
    cost: 0,
    type: "normal",
    quality: [],
    roll: { roll: false, dice: 0, mod: 0, type: "damage" },
    effect: [],
    entry: "ItemEntry",
  },
};
