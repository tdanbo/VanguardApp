interface CharacterDetails {
  race: string;
  xp_earned: number;
  movement: number;
  modifier: number;
  initiative: number;
}
export type EquipAbilityType = "abilities" | "equipment" | "all";
export interface Stat {
  value: number;
  mod: number;
  base: number;
}

export type StatName =
  | "cunning"
  | "discreet"
  | "persuasive"
  | "quick"
  | "resolute"
  | "strong"
  | "vigilant"
  | "accurate"
  | "attack"
  | "defense"
  | "initiative";

type Stats = {
  [key in StatName]: Stat;
};

export type CreatureStats = {
  [key in StatName]: number;
};

export type ActiveKey = "attack" | "defense" | "casting" | "sneaking" | "";

type health = {
  damage: number;
  corruption: number;
  shield: number;
  energy: -10 | -9 | -8 | -7 | -6 | -5 | -3 | -2 | -1 | -1 | 0 | 1 | 2 | 3 | 4;
};

export type ItemStateType = "take" | "buy" | "drop" | "give";
export type DisplayType =
  | "character"
  | "gamemaster"
  | "combatlog"
  | "inventory"
  | "abilities"
  | "equipment"
  | "creatures"
  | "drops";
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
  rations: number;
  coins: number;
  creature?: boolean;
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

export interface EffectEntry {
  name: string;
  level: number;
  id: string;
  active: boolean;
  reset: "never" | "roll" | "sleeping" | "eating" | "armor" | "damage";
  static: EffectStatic;
}

export interface EffectStatic {
  description: string;
  base_amount: number;
  level_amount: number;
  type: "positive" | "negative";
  category: string;
}

export interface ItemEntry {
  name: string;
  durability: number;
  quantity: number;
  equipped: boolean;
  light: boolean;
  id: string;
  owner?: string;
  static: ItemStatic;
}

export type RollNameType =
  | "damage"
  | "armor"
  | "buff"
  | "healing"
  | "corruption"
  | "general"
  | "attack"
  | "defense"
  | "skill test"
  | "day change"
  | "sleeping"
  | "eating"
  | "dice"
  ;

export interface RollValueType {
  value: number;
  type: RollNameType;
  source: string;
}

export interface ItemStatic {
  roll: RollValueType[];
  quality: string[];
  rarity: string;
  cost: number;
  category: string;
  effect: string[];
  bulk: boolean;
  slot: number;
  max_durability: number;
}

export interface AbilityEntry {
  name: string;
  level: string;
  free: boolean;
  id: string;
  static: AbilityStatic;
}
export interface AbilityRoll {
  dice: number;
  type: string;
  mod: number;
}

export type ActionType =
  | "passive"
  | "reaction"
  | "active"
  | "special"
  | "movement"
  | "ritual"
  | "upgrade"
  | "free"
  | "";

export interface AbilityLevelType {
  description: string;
  action: ActionType;
  roll: RollValueType[];
}

export interface AbilityStatic {
  novice: AbilityLevelType;
  adept: AbilityLevelType;
  master: AbilityLevelType;
  xp_requirement: number;
  tradition: string[];
  tags: string[];
  category: RollTypeEntry;
}

export type ActiveType = "attack" | "defense" | "casting" | "sneaking" | "";

export type DiceType = 4 | 6 | 8 | 10 | 12 | 20;

export type FocusedStateType = "focused" | "unfocused" | "normal";

export type CombatEntry = {
  character: CharacterEntry;
  roll_type: RollNameType;
  roll_source: string;
  is_focused: FocusedStateType;
  roll_entry: RollEntry;
  uuid: string;
  durability: ItemEntry[];
  entry: "CombatEntry";
};

export type TimeCategory = "morning" | "afternoon" | "evening" | "night";

export type TravelEntry = {
  day: number;
  time: TimeCategory;
  weather: string;
  distance: number;
  damage_gain: number;
  corruption_gain: number;
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
  | "mystical power"
  | "monsterous trait"
  | "utility"
  | "eating"
  | "sleeping"
  | "day"
  | "buff"
  | "ritual"
  | "burden";

export type CriticalType = {
  state: 0 | 1 | 2;
  result: number;
};

export type RollEntry = {
  result1: number;
  result2: number;
  roll1: number;
  roll2: number;
  critical: CriticalType;
  target: number;
  success: boolean;
  difficulty: number;
  roll_values: RollValueType[];
};

export type ChallengeEntry =
  | "slow"
  | "quiet"
  | "eventful"
  | "challenging"
  | "demanding"
  | "deadly";

export type DayReportEntry = {
  challlenge: ChallengeEntry;
  durability_percent: number;
};

export type TownsEntry = {
  name: string;
  cost: number;
  total: number;
};

export const GeneralItem: ItemEntry = {
  name: "",
  durability: 0,
  quantity: 1,
  equipped: false,
  light: false,
  id: "1a1a1a1a1a",
  static: {
    roll: [],
    quality: [],
    slot: 0,
    bulk: false,
    rarity: "normal",
    cost: 0,
    category: "general good",
    max_durability: 0,
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
    time: "morning",
    distance: 0,
    weather: "",
    damage_gain: 0,
    corruption_gain: 0,
  },
  characters: [],
  combatlog: [],
  encounter: [],
  loot: { drops: [], general: [], armory: [], alchemy: [], novelty: [] },
};

export const NewCharacterEntry: CharacterEntry = {
  name: "",
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
    energy: 4,
  },
  stats: {
    cunning: { value: 15, mod: 0, base: 0 },
    discreet: { value: 13, mod: 0, base: 0 },
    persuasive: { value: 11, mod: 0, base: 0 },
    quick: { value: 10, mod: 0, base: 0 },
    resolute: { value: 10, mod: 0, base: 0 },
    strong: { value: 9, mod: 0, base: 0 },
    vigilant: { value: 7, mod: 0, base: 0 },
    accurate: { value: 5, mod: 0, base: 0 },
    attack: { value: 0, mod: 0, base: 0 },
    defense: { value: 0, mod: 0, base: 0 },
    initiative: { value: 0, mod: 0, base: 0 },
  },
  abilities: [],
  inventory: [],
  effects: [],
  rations: 0,
  coins: 0,
  entry: "CharacterEntry",
};

export const ResourceItem: ItemEntry = {
  name: "",
  durability: 0,
  quantity: 0,
  equipped: false,
  light: false,
  id: "1a1a1a1a1a",
  static: {
    roll: [],
    quality: [],
    slot: 0,
    bulk: true,
    rarity: "normal",
    cost: 0,
    category: "resource",
    max_durability: 0,
    effect: [],
  },
};
