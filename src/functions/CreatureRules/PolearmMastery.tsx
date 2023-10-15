import { modifiedCreature } from "../../Types";
import { cloneDeep } from "lodash";
export const PolearmMastery = (
  modifiedCreature: modifiedCreature,
  creatureAbilities: Record<string, number>,
) => {
  const clonedCreature = cloneDeep(modifiedCreature);
  let roll = 0;
  if (creatureAbilities["Marksman"] >= 1) {
    roll = 2;
  }

  for (const weapon of clonedCreature.weapon) {
    if (weapon.type === "Long Weapon") {
      weapon.roll.dice += roll;
    }
  }

  return clonedCreature;
};
