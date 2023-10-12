import { modifiedCreature } from "../../Types";

export const Feats = (modifiedCreature: modifiedCreature) => {
  console.log(modifiedCreature.armor_feat);

  if (modifiedCreature.armor_type === "light") {
    modifiedCreature.defense += 2;
  } else if (modifiedCreature.armor_type === "medium") {
    modifiedCreature.defense += 3;
  } else if (modifiedCreature.armor_type === "heavy") {
    modifiedCreature.defense += 4;
  }

  if (modifiedCreature.armor_feat === "fortified") {
    modifiedCreature.armor += 1;
  }

  if (modifiedCreature.armor_feat === "cumbersome") {
    modifiedCreature.defense += 1;
  }

  return modifiedCreature;
};