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

export const Robust = (
  modifiedCreature: modifiedCreature,
  creatureAbilities: Record<string, number>,
) => {
  const clonedCreature = cloneDeep(modifiedCreature);

  let damage = 0;
  let armor = 0;
  let defense = 0;

  if (creatureAbilities["Robust"] === 1) {
    defense = 2;
    armor = 2;
    damage = 2;
  } else if (creatureAbilities["Robust"] === 2) {
    defense = 3;
    armor = 3;
    damage = 3;
  } else if (creatureAbilities["Robust"] === 3) {
    defense = 4;
    armor = 4;
    damage = 4;
  }

  if (creatureAbilities["Berserker"] <= 2) {
    clonedCreature.defense = ModifierConverter[5 - defense];
  } else
    clonedCreature.defense =
      ModifierConverter[clonedCreature.stats.quick - defense];
  clonedCreature.armor.roll.mod += armor;
  for (const weapon of clonedCreature.weapon) {
    weapon.roll.mod += damage;
  }

  return clonedCreature;
};
