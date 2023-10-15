import { modifiedCreature } from "../../Types";
import { cloneDeep } from "lodash";
export const Armored = (
  modifiedCreature: modifiedCreature,
  creatureAbilities: Record<string, number>,
) => {
  const clonedCreature = cloneDeep(modifiedCreature);

  let armor = 0;
  if (creatureAbilities["Armored"] === 1) {
    armor += 2;
  } else if (creatureAbilities["Armored"] === 2) {
    armor += 3;
  } else if (creatureAbilities["Armored"] === 3) {
    armor += 4;
  }

  clonedCreature.armor.roll.mod += armor;

  return clonedCreature;
};
