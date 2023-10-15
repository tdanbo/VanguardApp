import { modifiedCreature } from "../../Types";
import { cloneDeep } from "lodash";
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

  console.log(damage, armor, defense);

  clonedCreature.defense += defense;
  clonedCreature.armor.roll.mod += armor;
  for (const weapon of clonedCreature.weapon) {
    weapon.roll.mod += damage;
  }

  return clonedCreature;
};
