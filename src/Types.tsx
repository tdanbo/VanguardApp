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

export interface CharacterEntry {
  name: string;
  id: string;
  portrait: string;
  details: CharacterDetails;
  health: health;
  stats: Stats;
  effects: EffectDynamic[];
  abilities: AbilityDynamic[];
  inventory: ItemDynamic[];
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

export interface EffectDynamic {
  name: string;
  level: number;
  id: string;
}

export interface EffectEntry {
  name: string;
  effect: string;
  category: string;
}

export interface ItemDynamic {
  name: string;
  durability: number;
  quantity: number;
  equipped: boolean;
  light: boolean;
  id: string;
}

export interface ItemEntry {
  name: string;
  roll: Roll;
  quality: string[];
  rarity: string;
  cost: number;
  category: string;
  effect: string[];
  bulk: boolean;
  slot: number;
}

export interface AbilityDynamic {
  name: string;
  level: string;
  free: boolean;
  id: string;
}

export interface AbilityEntry {
  name: string;
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
  [key in LootCategory]: ItemDynamic[];
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

export const GeneralItem: ItemEntry = {
  name: "",
  roll: { roll: false, dice: 0, mod: 0, type: "" },
  quality: [],
  slot: 0,
  bulk: false,
  rarity: "normal",
  cost: 0,
  category: "general good",
  effect: [],
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

export const RESOURCE: ItemDynamic = {
  name: "Resource",
  light: false,
  equipped: false,
  quantity: 0,
  durability: 0,
  id: "cccccccccc",
};
