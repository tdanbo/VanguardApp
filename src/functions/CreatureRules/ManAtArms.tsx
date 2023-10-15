import { modifiedCreature } from "../../Types";
import { cloneDeep } from "lodash";

const ModifierConverter: Record<number, number> = {
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
};

export const ManAtArms = (
  modifiedCreature: modifiedCreature,
  creatureAbilities: Record<string, number>,
) => {
  const clonedCreature = cloneDeep(modifiedCreature);

  let armor = 0;

  if (creatureAbilities["Man-at-Arms"] >= 1) {
    armor += 2;
  }

  if (creatureAbilities["Man-at-Arms"] >= 2) {
    clonedCreature.defense = ModifierConverter[clonedCreature.stats.quick];
  }

  clonedCreature.armor.roll.dice += armor;

  return clonedCreature;
};
