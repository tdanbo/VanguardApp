import { modifiedCreature } from "../../Types";
import { cloneDeep } from "lodash";
const ModifierConverter: Record<number, number> = {
  20: -10,
  19: -9,
  18: -8,
  17: -7,
  16: -6,
  15: -5,
  14: -4,
  13: -3,
  12: -2,
  11: -1,
  10: 0,
  9: 1,
  8: 2,
  7: 3,
  6: 4,
  5: 5,
  4: 6,
  3: 7,
  2: 8,
  1: 9,
};

export const Dominate = (
  modifiedCreature: modifiedCreature,
  creatureAbilities: Record<string, number>,
) => {
  const clonedCreature = cloneDeep(modifiedCreature);
  if (creatureAbilities["Dominate"] >= 1) {
    clonedCreature.attack = ModifierConverter[clonedCreature.stats.persuasive];
    clonedCreature.alt_attack =
      ModifierConverter[clonedCreature.stats.persuasive];
  }
  return clonedCreature;
};
