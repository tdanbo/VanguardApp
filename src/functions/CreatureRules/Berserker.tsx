import { modifiedCreature } from "../../Types";

export const Berserker = (
  modifiedCreature: modifiedCreature,
  creatureAbilities: Record<string, number>,
) => {
  console.log("Berserker");
  if (creatureAbilities["Berserker"] === 1) {
    modifiedCreature.damage += 4;
    modifiedCreature.defense += 5;
  } else if (creatureAbilities["Berserker"] === 2) {
    modifiedCreature.damage += 4;
    modifiedCreature.defense += 5;
    modifiedCreature.armor += 2;
  } else if (creatureAbilities["Berserker"] === 3) {
    modifiedCreature.damage += 4;
    modifiedCreature.defense += 5;
    modifiedCreature.armor += 2;
  }

  return modifiedCreature;
};
