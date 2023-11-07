import { modifiedCreature } from "../../Types";
import { cloneDeep } from "lodash";
export const NaturalWarrior = (
  modifiedCreature: modifiedCreature,
  creatureAbilities: Record<string, number>,
) => {
  const clonedCreature = cloneDeep(modifiedCreature);
  if (creatureAbilities["Natural Warrior"] === 1) {
    for (const weapon of clonedCreature.weapon) {
      weapon.roll.dice = 6;
    }
  } else if (creatureAbilities["Natural Warrior"] === 2) {
    for (const weapon of clonedCreature.weapon) {
      weapon.roll.dice = 6;
    }
    clonedCreature.attacks += 1;
    clonedCreature.attacks_mod -= 3;
  } else if (creatureAbilities["Natural Warrior"] === 3) {
    for (const weapon of clonedCreature.weapon) {
      weapon.roll.dice = 12;
    }
    clonedCreature.attacks += 1;
    clonedCreature.attacks_mod -= 3;
  }

  return clonedCreature;
};
