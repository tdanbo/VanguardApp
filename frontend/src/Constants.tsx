export const INTENTORY_ENTRY_HEIGHT = "65px";
export const SECTION_TITLE_HEIGHT = "30px";
export const SECTION_WIDTH = "500px";
export const SECTION_HEIGHT = "90px";

export const PRIMARY_HOVER = "#fffdf7";
export const PRIMARY_DARKER = "#dbd7c8";
export const PRIMARY = "#f0e8d9";
export const PRIMARY_MEDIUM = "#f2eedf";
export const PRIMARY_LIGHTER = "#f1efe9";
export const BORDER_LIGHT = "#ccbda5";
export const BORDER = "#b3a691";
export const BORDER_DARK = "#998e7c";

export const DARK = "#262223";
export const RED = "#925833";
export const BLUE = "#495C60";
export const PURPLE = "#60495c";
export const GREEN = "#5c6049";
export const YELLOW = "#926f2b";
export const WHITE = "#bfb6ac";
export const BRIGHT_RED = "#923333";

export const FONT_LIGHT = "#dedede";

export type ColorType = string;

export const TYPE_COLORS: Record<ColorType, string> = {
  attack: RED,
  damage: RED,
  ability: RED,
  defense: BLUE,
  armor: BLUE,
  casting: PURPLE,
  mystical_power: PURPLE,
  ritual: PURPLE,
  elixirs: PURPLE,
  sneaking: GREEN,
  ammunition: RED,
  monsterous_trait: GREEN,
  test: YELLOW,
  skill_test: YELLOW,
  provision: GREEN,
  treasure: YELLOW,
  ordinary_weapon: RED,
  ordinary_ranged: RED,
  ordinary_armor: BLUE,
  quality_weapon: RED,
  quality_ranged: RED,
  quality_armor: BLUE,
  general_good: YELLOW,
  lesser_artifact: BRIGHT_RED,
  corruption: DARK,
};
