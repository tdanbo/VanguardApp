import chroma from "chroma-js";

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

// Original Palette
export const COLOR_1 = "#923333";
export const COLOR_2 = "#60495c";
export const COLOR_3 = "#5c6049";
export const COLOR_4 = "#495C60";
export const COLOR_5 = "#BF8C2F";

// Experimental Palette
// const desaturateColor = (colorHex: string) => {
//   const color = chroma(colorHex);
//   const currentSaturation = color.get("hsl.s"); // Get current saturation
//   return color.set("hsl.s", currentSaturation * 0.75).hex(); // Set saturation to 50% of current
// };

// const COLOR_1 = desaturateColor("#923333");
// const COLOR_2 = desaturateColor("#60495c");
// const COLOR_3 = desaturateColor("#339257");
// const COLOR_4 = desaturateColor("#336c92");
// const COLOR_5 = desaturateColor("#B56233");

// export const COLOR_1: string = "#923333"; // Primary deep reddish-brown
// export const COLOR_2: string = "#739271"; // Complementary muted sage green
// export const COLOR_3: string = "#B56233"; // Analogous burnt orange
// export const COLOR_4: string = "#F4ECE3"; // Neutral light pale cream
// export const COLOR_5: string = "#2A416D"; // Accent dark navy blue

export const TYPE_COLORS: Record<ColorType, string> = {
  health: COLOR_1,
  attack: COLOR_1,
  damage: COLOR_1,
  ability: COLOR_1,
  ammunition: COLOR_1,
  weapon: COLOR_1,
  ranged: COLOR_1,

  ritual: COLOR_2,
  casting: COLOR_2,
  "mystical power": COLOR_2,
  corruption: COLOR_2,
  temporary_corruption: COLOR_2,

  "monsterous trait": COLOR_3,
  sneaking: COLOR_3,
  tool: COLOR_3,
  trait: COLOR_3,
  burden: COLOR_3,
  monsterous_trait: COLOR_3,
  provision: COLOR_3,
  elixirs: COLOR_3,
  elixir: COLOR_3,

  armor: COLOR_4,
  defense: COLOR_4,
  resting: COLOR_4,
  container: COLOR_4,

  boon: COLOR_5,
  mystical_treasure: COLOR_5,
  artifact: COLOR_5,
  curiosities: COLOR_5,
  lesser_artifact: COLOR_5,
  test: COLOR_5,
  skill_test: COLOR_5,
  treasure: COLOR_5,
  vigilant: COLOR_5,
  strong: COLOR_5,
  resolute: COLOR_5,
  quick: COLOR_5,
  persuasive: COLOR_5,
  discreet: COLOR_5,
  cunning: COLOR_5,
  accurate: COLOR_5,
  general_good: COLOR_5,

  permanent_corruption: DESAT_PURPLE,
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
];
