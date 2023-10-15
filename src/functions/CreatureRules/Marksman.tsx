import { modifiedCreature } from "../../Types";
import { cloneDeep } from "lodash";
export const Marksman = (
  modifiedCreature: modifiedCreature,
  creatureAbilities: Record<string, number>,
) => {
  const clonedCreature = cloneDeep(modifiedCreature);
  let roll = 0;
  if (creatureAbilities["Marksman"] === 1) {
    roll = 2;
  } else if (creatureAbilities["Marksman"] === 2) {
    roll = 2;
  } else if (creatureAbilities["Marksman"] === 3) {
    roll = 2;
  }

  for (const weapon of clonedCreature.weapon) {
    if (weapon.type === "Ranged Weapon") {
      weapon.roll.dice += roll;
    }
  }

  return clonedCreature;
};
