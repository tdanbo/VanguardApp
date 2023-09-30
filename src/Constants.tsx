// export const API = "http://localhost:8000";
// export const WEBSOCKET = "ws://localhost:8000";
export const API = "https://vanguard-api.onrender.com";
export const WEBSOCKET = "wss://vanguard-api.onrender.com";

export const COMBAT_BACKGROUND = "19, 23, 22";

export const BACKGROUND = "rgba(19, 23, 22, 1.0)";
export const WIDGET_PRIMARY_FONT = "rgba(255, 255, 255, 0.85)";
export const WIDGET_SECONDARY_FONT = "rgba(255, 255, 255, 0.60)";
// export const WIDGET_SECONDARY_FONT = "rgba(180, 140, 90, 0.75)";
// export const WIDGET_SECONDARY_FONT = "rgb(173, 162, 132)";

export const WIDGET_BACKGROUND = "rgba(255, 255, 255, 0.075)";
export const WIDGET_BACKGROUND_EMPTY = "rgba(255, 255, 255, 0.025)";
export const WIDGET_BORDER = "rgba(255, 255, 255, 0.05)";

export const BORDER_RADIUS = "3px";
export const WIDGET_GAB = "2px";

export type ColorType = string;

export const PURPLE = "#60495c";
export const RED = "#925833";
export const BLUE = "#495C60";
export const GREEN = "#5c6049";
export const YELLOW = "#926f2b";
export const BRIGHT_YELLOW = "#BF8C2F";
export const WHITE = "#bfb6ac";
export const BRIGHT_RED = "#923333";
export const GREY = "#8f8e89";
export const DARK = "#262223";

export const TYPE_COLORS: Record<ColorType, string> = {
  health: BRIGHT_RED,
  attack: BRIGHT_RED,
  damage: BRIGHT_RED,
  ability: BRIGHT_RED,
  defense: BLUE,
  armor: BLUE,
  casting: PURPLE,
  "mystical power": PURPLE,
  "monsterous trait": GREEN,
  boon: BRIGHT_YELLOW,
  burden: BRIGHT_RED,
  ritual: PURPLE,
  elixirs: PURPLE,
  sneaking: GREEN,
  ammunition: BRIGHT_RED,
  monsterous_trait: GREEN,
  test: YELLOW,
  skill_test: YELLOW,
  provision: GREEN,
  treasure: YELLOW,
  ordinary_weapon: BRIGHT_RED,
  ordinary_ranged: BRIGHT_RED,
  ordinary_armor: BLUE,
  quality_weapon: BRIGHT_RED,
  quality_ranged: BRIGHT_RED,
  quality_armor: BLUE,
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
};
