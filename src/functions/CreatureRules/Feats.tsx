import { cloneDeep } from "lodash";
import { modifiedCreature } from "../../Types";

export const Feats = (
  modifiedCreature: modifiedCreature,
  creatureAbilities: Record<string, number>,
) => {
  const clonedCreature = cloneDeep(modifiedCreature);

  let defense = 0;

  for (const [index, selectedWeapon] of clonedCreature.weapon.entries()) {
    // Now you can use 'selectedWeapon' as before and 'index' represents its position in the array

    if (selectedWeapon.quality.includes("Balanced 1")) {
      defense -= 1;
    }
    if (selectedWeapon.quality.includes("Balanced 2")) {
      defense -= 2;
    }
    if (selectedWeapon.quality.includes("Precise")) {
      if (index === 0) {
        clonedCreature.attack -= 1;
      } else {
        clonedCreature.attacks_mod -= 1;
      }
    }
  }

  for (const feat in clonedCreature.armor.quality) {
    const selectedfeat = clonedCreature.armor.quality[feat];

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

  if (creatureAbilities["Man-at-Arms"] >= 2) {
    defense = 0;
  }

  console.log("Balance");
  console.log(defense);

  clonedCreature.defense += defense;

  return clonedCreature;
};
