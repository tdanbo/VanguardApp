import { modifiedCreature } from "../../Types";
import { cloneDeep } from "lodash";
export const TwinAttack = (
  modifiedCreature: modifiedCreature,
  creatureAbilities: Record<string, number>,
) => {
  const clonedCreature = cloneDeep(modifiedCreature);

  if (creatureAbilities["Twin Attack"] === 1) {
    for (const weapon of clonedCreature.weapon) {
      if (
        weapon.type !== "Ranged Weapon" &&
        weapon.type !== "Throwing Weapon"
      ) {
        weapon.roll.dice = 8;
      }
    }

    clonedCreature.attacks += 1;
    clonedCreature.attacks_mod = -1;
    clonedCreature.defense -= 1;
  } else if (creatureAbilities["Twin Attack"] === 2) {
    for (const weapon of clonedCreature.weapon) {
      if (
        weapon.type !== "Ranged Weapon" &&
        weapon.type !== "Throwing Weapon"
      ) {
        weapon.roll.dice = 8;
      }
    }

    clonedCreature.attacks += 1;
    clonedCreature.attacks_mod = 0;
    clonedCreature.defense -= 1;
  } else if (creatureAbilities["Twin Attack"] === 3) {
    for (const weapon of clonedCreature.weapon) {
      if (
        weapon.type !== "Ranged Weapon" &&
        weapon.type !== "Throwing Weapon"
      ) {
        weapon.roll.dice = 10;
      }
    }

    clonedCreature.attacks += 1;
    clonedCreature.attacks_mod = -1;
    clonedCreature.defense -= 1;
  }

  return clonedCreature;
};
