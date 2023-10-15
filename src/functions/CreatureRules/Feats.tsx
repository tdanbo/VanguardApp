import { cloneDeep } from "lodash";
import { modifiedCreature } from "../../Types";

export const Feats = (modifiedCreature: modifiedCreature) => {
  const clonedCreature = cloneDeep(modifiedCreature);

  let defense = 0;

  for (const weapon in clonedCreature.weapon) {
    const selectedWeapon = clonedCreature.weapon[weapon];

    if (selectedWeapon.quality.includes("Balanced 1")) {
      defense -= 1;
    }
    if (selectedWeapon.quality.includes("Balanced 2")) {
      defense -= 2;
    }
  }

  for (const feat in clonedCreature.armor.quality) {
    const selectedfeat = clonedCreature.armor.quality[feat];

    if (selectedfeat === "Cumbersome") {
      defense += 1;
    }
    if (selectedfeat === "Impeding 1") {
      defense += 1;
    }
    if (selectedfeat === "Impeding 2") {
      console.log("Impeding 2");
      defense += 2;
    }
    if (selectedfeat === "Impeding 3") {
      defense += 3;
    }
    if (selectedfeat === "Impeding 4") {
      defense += 4;
    }
  }
  console.log("Balance");
  console.log(defense);

  clonedCreature.defense += defense;

  return clonedCreature;
};
