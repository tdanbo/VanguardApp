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

export const IronFist = (
  modifiedCreature: modifiedCreature,
  creatureAbilities: Record<string, number>,
) => {
  const clonedCreature = cloneDeep(modifiedCreature);
  if (creatureAbilities["Iron Fist"] >= 1) {
    clonedCreature.attack = ModifierConverter[clonedCreature.stats.strong];
    clonedCreature.alt_attack = ModifierConverter[clonedCreature.stats.strong];
  }

  let damage = 0;

  if (creatureAbilities["Iron Fist"] === 2) {
    damage = 2;
  } else if (creatureAbilities["Iron Fist"] === 3) {
    damage = 4;
  }

  for (const weapon of clonedCreature.weapon) {
    weapon.roll.mod += damage;
  }

  return clonedCreature;
};
