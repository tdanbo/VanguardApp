import { modifiedCreature } from "../../Types";

export const Armored = (
  modifiedCreature: modifiedCreature,
  creatureAbilities: Record<string, number>,
) => {
  console.log("Armored");
  if (creatureAbilities["Armored"] === 1) {
    modifiedCreature.armor += 2;
  } else if (creatureAbilities["Armored"] === 2) {
    modifiedCreature.armor += 3;
  } else if (creatureAbilities["Armored"] === 3) {
    modifiedCreature.armor += 4;
  }

  return modifiedCreature;
};
