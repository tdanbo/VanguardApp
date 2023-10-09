import { CreatureStats } from "../../Types";

interface modifiedCreatureProps {
  hp: number;
  pain: number;
  attack: number;
  damage: number;
  damage_feat: string;
  defense: number;
  armor: number;
  armor_feat: string;
  stats: CreatureStats;
}

export const NaturalWeapon = (
  modifiedCreature: modifiedCreatureProps,
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
