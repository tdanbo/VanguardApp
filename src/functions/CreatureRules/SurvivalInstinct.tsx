import { modifiedCreature } from "../../Types";
import { cloneDeep } from "lodash";

export const SurvivalInstinct = (
  modifiedCreature: modifiedCreature,
  creatureAbilities: Record<string, number>,
) => {
  const clonedCreature = cloneDeep(modifiedCreature);

  if (creatureAbilities["Survival Instinct"] >= 2) {
    clonedCreature.armor.roll.dice = 8;
  }

  return clonedCreature;
};
