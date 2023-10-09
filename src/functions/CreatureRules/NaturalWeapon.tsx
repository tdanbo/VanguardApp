import { modifiedCreature } from "../../Types";

export const NaturalWeapon = (
  modifiedCreature: modifiedCreature,
  creatureAbilities: Record<string, number>,
) => {
  console.log("NaturalWeapon");
  if (creatureAbilities["Natural Weapon"] === 1) {
    modifiedCreature.damage += 1;
  } else if (creatureAbilities["Natural Weapon"] === 2) {
    modifiedCreature.damage += 2;
  } else if (creatureAbilities["Natural Weapon"] === 3) {
    modifiedCreature.damage += 3;
  }

  return modifiedCreature;
};
