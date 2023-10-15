import { modifiedCreature } from "../../Types";
import { cloneDeep } from "lodash";
export const AlternativeDamage = (
  modifiedCreature: modifiedCreature,
  creatureAbilities: Record<string, number>,
) => {
  const clonedCreature = cloneDeep(modifiedCreature);
  let damage = 0;
  if (creatureAbilities["Alternative Damage"] === 1) {
    damage += 1;
  } else if (creatureAbilities["Alternative Damage"] === 2) {
    damage += 2;
  } else if (creatureAbilities["Alternative Damage"] === 3) {
    damage += 3;
  }

  for (const weapon of clonedCreature.weapon) {
    if (weapon.type === "Natural Weapon") {
      weapon.roll.mod += damage;
    }
  }

  return clonedCreature;
};
