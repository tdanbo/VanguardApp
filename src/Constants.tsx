// export const API = "http://localhost:8000";
// export const WEBSOCKET = "ws://localhost:8000";
export const API = "https://vanguard-api.onrender.com";
export const WEBSOCKET = "wss://vanguard-api.onrender.com/session/";

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
export const DESAT_PURPLE = "#4f2f4b";
export const RED = "#925833";
export const BLUE = "#495C60";
export const BLUE_VAR = "#60b4bf";
export const GREEN = "#5c6049";
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

export const TYPE_COLORS: Record<ColorType, string> = {
  health: BRIGHT_RED,
  attack: BRIGHT_RED,
  damage: BRIGHT_RED,
  ability: BRIGHT_RED,
  defense: BLUE,
  casting: PURPLE,
  "mystical power": PURPLE,
  "monsterous trait": GREEN,
  boon: BRIGHT_YELLOW,
  burden: GREEN,
  ritual: PURPLE,
  elixirs: PURPLE,
  sneaking: GREEN,
  ammunition: BRIGHT_RED,
  monsterous_trait: GREEN,
  test: YELLOW,
  skill_test: YELLOW,
  provision: GREEN,
  treasure: YELLOW,
  weapon: BRIGHT_RED,
  ranged: BRIGHT_RED,
  armor: BLUE,
  general_good: GREY,
  corruption: PURPLE,
  vigilant: YELLOW,
  strong: YELLOW,
  resolute: YELLOW,
  quick: YELLOW,
  persuasive: YELLOW,
  discreet: YELLOW,
  cunning: YELLOW,
  accurate: YELLOW,
  mystical_treasure: BRIGHT_YELLOW,
  artifact: BRIGHT_YELLOW,
  curiosities: BRIGHT_YELLOW,
  lesser_artifact: BRIGHT_YELLOW,
  tool: GREEN,
  trait: GREEN,
  resting: NIGHT,
  container: BLUE_VAR,
  permanent_corruption: DESAT_PURPLE,
  temporary_corruption: PURPLE,
};

export const CATEGORY_FILTER = [
  "weapon",
  "ranged",
  "ammunition",
  "artifact",
  "armor",
  "elixirs",
  "tool",
  "curiosities",
  "lesser_artifact",
  "mystical_treasure",
  "general_good",
  "container",
];

export const TYPE_FILTER = [
  "ability",
  "ritual",
  "mystical power",
  "monsterous trait",
  "trait",
  "boon",
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
  "Elf",
  "Troll",
  "Ambrian",
  "Spider",
  "Predator",
  "Reptile",
  "Winged Creature",
  "Abomination",
  "Undead",
];

export const SPECIAL_WORDS = [
  "+d4",
  "d4",
  "+d6",
  "d6",
  "+d8",
  "d8",
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
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
];
