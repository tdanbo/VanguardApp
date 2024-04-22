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
  status: StatusCategory;
};

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
  static: EffectStatic;
}
export interface EffectStatic {
  effect: string;
  category: string;
}

export interface ItemEntry {
  name: string;
  durability: number;
  quantity: number;
  equipped: boolean;
  light: boolean;
  id: string;
  static: ItemStatic;
}
export interface ItemStatic {
  roll: Roll;
  quality: string[];
  rarity: string;
  cost: number;
  category: string;
  effect: string[];
  bulk: boolean;
  slot: number;
}

export interface AbilityEntry {
  name: string;
  level: string;
  free: boolean;
  id: string;
  static: AbilityStatic;
}
export interface AbilityStatic {
  tradition: string;
  novice: Ability;
  adept: Ability;
  master: Ability;
  category: string;
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
  base: number;
  type: string;
}

export type TimeCategory = "morning" | "afternoon" | "evening" | "night";
export type StatusCategory =
  | "resting"
  | "rested"
  | "normal"
  | "tired"
  | "fatigued"
  | "exhausted 1"
  | "exhausted 2"
  | "exhausted 3"
  | "exhausted 4"
  | "exhausted 5"
  | "exhausted 6"
  | "exhausted 7"
  | "exhausted 8"
  | "exhausted 9"
  | "exhausted 10";

export type TravelEntry = {
  day: number;
  time: TimeCategory;
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
  | "mystical power"
  | "monsterous trait"
  | "utility";

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

export const GeneralItem: ItemEntry = {
  name: "",
  durability: 0,
  quantity: 0,
  equipped: false,
  light: false,
  id: "1a1a1a1a1a",
  static: {
    roll: { roll: false, dice: 0, base: 0, mod: 0, type: "" },
    quality: [],
    slot: 0,
    bulk: false,
    rarity: "normal",
    cost: 0,
    category: "general good",
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
    status: "rested",
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

export const ResourceItem: ItemEntry = {
  name: "",
  durability: 0,
  quantity: 0,
  equipped: false,
  light: false,
  id: "1a1a1a1a1a",
  static: {
    roll: { roll: false, dice: 0, base: 0, mod: 0, type: "" },
    quality: [],
    slot: 0,
    bulk: true,
    rarity: "normal",
    cost: 0,
    category: "resource",
    effect: [],
  },
};
