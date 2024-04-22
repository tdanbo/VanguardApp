// export const API = "http://localhost:8000";

// export const WEBSOCKET = "ws://localhost:8000";
export const API = "https://vanguard-api.onrender.com";
export const WEBSOCKET = "wss://vanguard-api.onrender.com/session/";

export const VW = "5.0vw";

export const COMBAT_BACKGROUND = "19, 23, 22";

export const BACKGROUND = "rgba(19, 23, 22, 1.0)";
export const WIDGET_PRIMARY_FONT = "rgba(255, 255, 255, 0.85)";
export const WIDGET_SECONDARY_FONT = "rgba(255, 255, 255, 0.60)";
export const WIDGET_SECONDARY_FONT_INACTIVE = "rgba(255, 255, 255, 0.20)";
export const WIDGET_SECONDARY_HIGHLIGHT = "rgba(255, 255, 255, 0.4)";
// export const WIDGET_SECONDARY_FONT = "rgba(180, 140, 90, 0.75)";
// export const WIDGET_SECONDARY_FONT = "rgb(173, 162, 132)";

export const WIDGET_BACKGROUND = "rgba(255, 255, 255, 0.075)";

export const WIDGET_BACKGROUND_EMPTY = "rgba(255, 255, 255, 0.025)";
export const WIDGET_BORDER = "rgba(255, 255, 255, 0.05)";

export const BORDER_RADIUS = "3px";
export const WIDGET_GAB = "10px";

export type ColorType = string;

export const PURPLE = "#60495c";
export const DESAT_PURPLE = "#61445c";
export const RED = "#925833";
export const BLUE = "#445c61";
export const BLUE_VAR = "#60b4bf";
export const GREEN = "#616647";
export const YELLOW = "#926f2b";
export const BRIGHT_YELLOW = "#BF8C2F";
export const WHITE = "#bfb6ac";
export const BRIGHT_RED = "#923333";
export const BRIGHT_GREEN = "#339249";
export const GREY = "#8f8e89";
export const DARK = "#262223";
export const NIGHT = "#336980";
export const CREAM = "#e3dcca";
export const DARK_CREAM = "#ccc6b6";
export const ORANGE = "rgba(205, 112, 57, 0.7)";

// Original Palette
export const COLOR_1 = "#923333";
export const COLOR_2 = "#445c61";
export const COLOR_3 = "#60495c";
export const COLOR_4 = "#616647";
export const COLOR_5 = "#926933";
export const COLOR_6 = "#924933";
export const COLOR_7 = "#808080";
export const COLOR_8 = "#999588";

// Original Palette
// export const COLOR_1 = "#604949";
// export const COLOR_2 = "#495960";
// export const COLOR_3 = "#60495c";
// export const COLOR_4 = WIDGET_SECONDARY_FONT;
// export const COLOR_5 = WIDGET_SECONDARY_FONT;

export const ARMOR = "armor";

export const TYPE_COLORS: Record<ColorType, string> = {
  "natural weapon": COLOR_1,
  "short weapon": COLOR_1,
  "one-hand weapon": COLOR_1,
  "long weapon": COLOR_1,
  "heavy weapon": COLOR_1,
  "ranged weapon": COLOR_1,
  "throwing weapon": COLOR_1,
  shield: COLOR_1,
  projectile: COLOR_1,
  health: COLOR_1,
  "flanking attack": COLOR_1,
  "flanking full offense": COLOR_1,
  "full offense": COLOR_1,
  attack: COLOR_1,
  damage: COLOR_1,
  ammunition: COLOR_1,
  ability: COLOR_1,
  "weapon accessory": COLOR_1,
  "alchemical weapon": COLOR_1,
  "careful aim": COLOR_1,
  "flanking careful aim": COLOR_1,
  "exhausted 1": COLOR_1,
  "exhausted 2": COLOR_1,
  "exhausted 3": COLOR_1,
  "exhausted 4": COLOR_1,
  "exhausted 5": COLOR_1,
  "exhausted 6": COLOR_1,
  "exhausted 7": COLOR_1,
  "exhausted 8": COLOR_1,
  "exhausted 9": COLOR_1,
  "exhausted 10": COLOR_1,

  "natural armor": COLOR_2,
  "light armor": COLOR_2,
  "medium armor": COLOR_2,
  "heavy armor": COLOR_2,
  armor: COLOR_2,
  "weak defense": COLOR_2,
  "full defense": COLOR_2,
  "flanked full defense": COLOR_2,
  "flanked defense": COLOR_2,
  "flanked weak defense": COLOR_2,
  defense: COLOR_2,
  resting: COLOR_2,
  "armor accessory": COLOR_2,

  casting: COLOR_3,
  "mystical power": COLOR_3,
  corruption: COLOR_3,
  temporary_corruption: COLOR_3,
  elixir: COLOR_3,

  accessory: COLOR_4,
  container: COLOR_4,
  sneaking: COLOR_4,
  tool: COLOR_4,
  "monsterous trait": COLOR_4,
  poison: COLOR_4,
  rested: COLOR_4,
  normal: COLOR_4,
  tired: COLOR_4,
  fatigued: COLOR_4,

  treasure: COLOR_5,
  utility: COLOR_5,
  test: COLOR_5,
  skill_test: COLOR_5,
  vigilant: COLOR_5,
  strong: COLOR_5,
  resolute: COLOR_5,
  quick: COLOR_5,
  persuasive: COLOR_5,
  discreet: COLOR_5,
  cunning: COLOR_5,
  accurate: COLOR_5,
  trait: COLOR_5,
  burden: COLOR_5,

  permanent_corruption: DESAT_PURPLE,

  "adventuring gear": COLOR_7,
  "general good": COLOR_7,
  effect: COLOR_7,

  Ambrian: COLOR_2,
  Barbarian: COLOR_2,
  Elf: COLOR_2,
  Goblin: COLOR_1,
  Ogre: COLOR_1,
  Troll: COLOR_1,
  Bear: COLOR_4,
  Boar: COLOR_4,
  Cat: COLOR_4,
  Reptile: COLOR_4,
  Spider: COLOR_3,
  Spirit: COLOR_3,
  Undead: COLOR_3,
  Abomination: COLOR_3,

  "bushcraft crafting material": COLOR_8,
  "alchemy crafting material": COLOR_8,
  "blacksmith crafting material": COLOR_8,
  "ritual crafting material": COLOR_8,
  "artifact crafting material": COLOR_8,
  "siege expert crafting material": COLOR_8,
  "poisoner crafting material": COLOR_8,
  "ritual scroll": COLOR_8,
  ritual: COLOR_8,

  resource: "#bd8b02",
};

export const CATEGORY_FILTER = [
  "natural weapon",
  "short weapon",
  "one-hand weapon",
  "shield",
  "long weapon",
  "heavy weapon",
  "ranged weapon",
  "alchemical weapon",
  "throwing weapon",
  "projectile",
  "weapon accessory",

  "natural armor",
  "light armor",
  "medium armor",
  "heavy armor",
  "armor accessory",

  "accessory",

  "ritual scroll",

  "elixir",
  "poison",

  "bushcraft crafting material",
  "alchemy crafting material",
  "blacksmith crafting material",
  "ritual crafting material",
  "artifact crafting material",
  "siege expert crafting material",
  "poisoner crafting material",

  "treasure",
  "adventuring gear",
  "tool",
  "general good",
  "container",
  "resource",
];

export const RARITY_FILTER = [
  "unique",
  "artifact",
  "mystical",
  "quality",
  "normal",
];

export const TYPE_FILTER = [
  "ability",
  "mystical power",
  "ritual",
  "utility",
  "monsterous trait",
  "burden",
];

export const DIFFICULTY_FILTER = [
  "Weak",
  "Ordinary",
  "Challenging",
  "Strong",
  "Mighty",
  "Legendary",
];

export const RACE_FILTER = [
  "Ambrian",
  "Barbarian",
  "Elf",
  "Goblin",
  "Ogre",
  "Troll",
  "Bear",
  "Boar",
  "Cat",
  "Reptile",
  "Spider",
  "Spirit",
  "Undead",
  "Phenomenon",
  "Abomination",
];

export const SPECIAL_WORDS = [
  "+d4",
  "d4",
  "+d6",
  "d6",
  "+d8",
  "d8",
  "+d10",
  "d10",
  "+d12",
  "d12",
  "+d20",
  "d20",
  "corruption",
  "resolute",
  "Quick",
  "Strong",
  "Resolute",
  "Cunning",
  "Discreet",
  "Persuasive",
  "Quick",
  "Vigilant",
  "Accurate",
  "Armor",
  "active",
  "damage",
  "Night Cap",
  "Night Caps",
  "Iron Fragment",
  "Darkland Yield",
  "1",
  "+1",
  "2",
  "+2",
  "3",
  "+3",
  "4",
  "+4",
  "5",
  "+5",
  "6",
  "+6",
  "7",
  "+7",
  "8",
  "+8",
  "9",
  "+9",
  "10",
  "+10",
  "15",
  "+15",
  "Casting",
  "Defense",
  "Attack",
  "Sneaking",
];

export const INTEGRATED_ABILITIES = [
  "tactician",
  "man-at-arms",
  "exceptionally strong",
  "iron fist",
  "armored",
];
