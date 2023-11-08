import { modifiedCreature } from "../../Types";
import { cloneDeep } from "lodash";
export const TwoHandedForce = (
  modifiedCreature: modifiedCreature,
  creatureAbilities: Record<string, number>,
) => {
  const clonedCreature = cloneDeep(modifiedCreature);

  if (creatureAbilities["Two-handed Force"] === 1) {
    for (const weapon of clonedCreature.weapon) {
      if (
        weapon.type !== "Ranged Weapon" &&
        weapon.type !== "Throwing Weapon"
      ) {
        weapon.roll.dice = 12;
      }
    }
  } else if (creatureAbilities["Two-handed Force"] === 2) {
    for (const weapon of clonedCreature.weapon) {
      if (
        weapon.type !== "Ranged Weapon" &&
        weapon.type !== "Throwing Weapon"
      ) {
        weapon.roll.dice = 12;
      }
    }

    clonedCreature.attacks += 1;
    clonedCreature.attacks_mod = -2;
  } else if (creatureAbilities["Two-handed Force"] === 3) {
    for (const weapon of clonedCreature.weapon) {
      if (
        weapon.type !== "Ranged Weapon" &&
        weapon.type !== "Throwing Weapon"
      ) {
        weapon.roll.dice = 12;
      }
    }

    clonedCreature.attacks += 1;
    clonedCreature.attacks_mod = -2;
  }

  return clonedCreature;
};
