import { modifiedCreature } from "../../Types";
import { cloneDeep } from "lodash";
export const TwinAttack = (
  modifiedCreature: modifiedCreature,
  creatureAbilities: Record<string, number>,
) => {
  const clonedCreature = cloneDeep(modifiedCreature);

  let defense = 0;

  if (creatureAbilities["Twin Attack"] === 1) {
    console.log("Twin Attack 1");
    defense = 1;
    clonedCreature.attacks += 1;
  } else if (creatureAbilities["Twin Attack"] === 2) {
    defense = 2;
    clonedCreature.attacks += 1;
  } else if (creatureAbilities["Twin Attack"] === 3) {
    defense = 3;
    clonedCreature.attacks += 1;
  }

  clonedCreature.defense -= defense;

  return clonedCreature;
};
