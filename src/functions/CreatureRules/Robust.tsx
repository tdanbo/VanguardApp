import { modifiedCreature } from "../../Types";

export const Robust = (
  modifiedCreature: modifiedCreature,
  creatureAbilities: Record<string, number>,
) => {
  console.log("Robust");
  if (creatureAbilities["Robust"] === 1) {
    modifiedCreature.defense += 2;
    modifiedCreature.armor += 2;
    modifiedCreature.damage += 2;
  } else if (creatureAbilities["Robust"] === 2) {
    modifiedCreature.defense += 3;
    modifiedCreature.armor += 3;
    modifiedCreature.damage += 3;
  } else if (creatureAbilities["Robust"] === 3) {
    modifiedCreature.defense += 4;
    modifiedCreature.armor += 4;
    modifiedCreature.damage += 4;
  }

  return modifiedCreature;
};
