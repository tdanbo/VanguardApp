import { modifiedCreature } from "../../Types";
import { cloneDeep } from "lodash";
export const ShieldFighter = (
  modifiedCreature: modifiedCreature,
  creatureAbilities: Record<string, number>,
) => {
  const clonedCreature = cloneDeep(modifiedCreature);
  let roll = 0;
  let defense = 0;
  if (creatureAbilities["Shield Fighter"] >= 1) {
    roll += 2;
    defense += 1;
  }

  for (const weapon of clonedCreature.weapon) {
    if (weapon.type === "One-hand Weapon" || weapon.type === "Short Weapon") {
      weapon.roll.dice += roll;
    }
  }

  clonedCreature.defense -= defense;

  return clonedCreature;
};
