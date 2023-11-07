import { modifiedCreature } from "../../Types";
import { cloneDeep } from "lodash";
export const NaturalWeapon = (
  modifiedCreature: modifiedCreature,
  creatureAbilities: Record<string, number>,
) => {
  const clonedCreature = cloneDeep(modifiedCreature);
  let damage = 0;
  if (creatureAbilities["Natural Weapon"] === 1) {
    damage += 1;
  } else if (creatureAbilities["Natural Weapon"] === 2) {
    damage += 2;
  } else if (creatureAbilities["Natural Weapon"] === 3) {
    damage += 3;
  }

  for (const weapon of clonedCreature.weapon) {
    weapon.roll.mod += damage;
  }

  return clonedCreature;
};
