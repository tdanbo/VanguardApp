import { CharacterEntry, Actives } from "../../Types";
import { CheckAbility } from "../ActivesFunction";

export function ShieldFighter(character: CharacterEntry, actives: Actives) {
  const ability = CheckAbility(character, "Shield Fighter", "novice");

  if (!ability) return actives; // Return early if the ability is not present

  const shieldTypes = [
    "Steel Shield",
    "Buckler",
    "Shield",
    "Axe And Shield",
    "Sword And Shield",
    "Mace And Shield",
  ];
  const weaponTypes = ["Short Weapon", "One-hand Weapon"];

  const WeaponAndShield = [
    "Axe And Shield",
    "Sword And Shield",
    "Mace And Shield",
  ];

  function hasShield(equipmentName: string): boolean {
    return shieldTypes.includes(equipmentName);
  }

  function hasWeapon(equipmentType: string): boolean {
    return weaponTypes.includes(equipmentType);
  }

  if (hasShield(character.equipment.main.name)) {
    actives.defense.value += 1;
    if (hasWeapon(character.equipment.off.type)) {
      actives.attack.dice2 += 2;
    }
  } else if (hasShield(character.equipment.off.name)) {
    actives.defense.value += 1;
    if (hasWeapon(character.equipment.main.type)) {
      actives.attack.dice1 += 2;
    }
  }

  if (WeaponAndShield.includes(character.equipment.main.name)) {
    actives.attack.dice1 += 2;
  } else if (WeaponAndShield.includes(character.equipment.off.name)) {
    actives.attack.dice2 += 2;
  }

  return actives;
}
