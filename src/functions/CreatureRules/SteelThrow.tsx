import { modifiedCreature } from "../../Types";
import { cloneDeep } from "lodash";
export const SteelThrow = (
  modifiedCreature: modifiedCreature,
  creatureAbilities: Record<string, number>,
) => {
  const clonedCreature = cloneDeep(modifiedCreature);

  if (creatureAbilities["Steel Throw"] === 1) {
    for (const weapon of clonedCreature.weapon) {
      if (weapon.type === "Throwing Weapon") {
        weapon.roll.dice = 8;
      }
    }
  } else if (creatureAbilities["Steel Throw"] === 2) {
    for (const weapon of clonedCreature.weapon) {
      if (weapon.type === "Throwing Weapon") {
        weapon.roll.dice = 8;
      }
    }
  } else if (creatureAbilities["Steel Throw"] === 3) {
    for (const weapon of clonedCreature.weapon) {
      if (weapon.type === "Throwing Weapon") {
        weapon.roll.dice = 8;
      }
    }
  }

  return clonedCreature;
};
