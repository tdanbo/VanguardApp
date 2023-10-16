import { modifiedCreature } from "../../Types";
import { cloneDeep } from "lodash";
export const Berserker = (
  modifiedCreature: modifiedCreature,
  creatureAbilities: Record<string, number>,
) => {
  const clonedCreature = cloneDeep(modifiedCreature);

  let damage = 0;
  let armor = 0;

  if (creatureAbilities["Berserker"] === 1) {
    damage = 4;
    clonedCreature.defense = 5;
  } else if (creatureAbilities["Berserker"] === 2) {
    damage = 4;
    clonedCreature.defense = 5;
    armor = 2;
  } else if (creatureAbilities["Berserker"] === 3) {
    damage = 4;
    armor = 2;
  }

  for (const weapon of clonedCreature.weapon) {
    weapon.roll.mod += damage;
  }

  clonedCreature.armor.roll.mod += armor;

  return clonedCreature;
};
