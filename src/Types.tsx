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

export interface RosterEntry {
  name: string;
  id: string;
  resistance: string;
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
  entourage: RosterEntry[];
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
  entry: "ItemEntry",
};

export const GeneralItem: ItemEntry = {
  roll: { roll: false, dice: 0, mod: 0, type: "" },
  quality: [],
  equip: "",
  quantity: { count: 0, bulk: false },
  type: "General Good",
  cost: 0,
  name: "",
  category: "general_good",
  id: "",
  description: "",
  entry: "ItemEntry",
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
  entry: "ItemEntry",
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
  name: "",
  id: "1b1b1b1b1b",
  portrait: "Ambrian",
  details: {
    race: "",
    xp_earned: 0,
    movement: 0,
    modifier: 0,
  },
  damage: 0,
  stats: {
    cunning: { value: 0, mod: 0 },
    discreet: { value: 0, mod: 0 },
    persuasive: { value: 0, mod: 0 },
    quick: { value: 0, mod: 0 },
    resolute: { value: 10, mod: 0 },
    strong: { value: 0, mod: 0 },
    vigilant: { value: 0, mod: 0 },
    accurate: { value: 0, mod: 0 },
  },
  actives: {
    attack: {
      stat: "accurate",
      value: 0,
      dice1: 0,
      dice1_mod: 0,
      dice1_name: "damage",
      dice2: 0,
      dice2_mod: 0,
      dice2_name: "damage",
      attacks: 1,
    },
    defense: {
      stat: "quick",
      value: 0,
      dice: 0,
      dice_mod: 0,
      dice_name: "armor",
    },
    casting: { stat: "resolute", value: 0 },
    sneaking: { stat: "discreet", value: 0 },
  },
  corruption: {
    permanent: 0,
    temporary: 0,
  },
  money: 0,
  abilities: [],
  inventory: [],
  equipment: {
    main: EmptyWeapon,
    off: EmptyWeapon,
    armor: EmptyArmor,
  },
  rations: { food: 0, water: 0 },
  npc: false,
  entourage: [],
  entry: "CharacterEntry",
};
