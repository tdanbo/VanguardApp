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

export const Armored = (
  modifiedCreature: modifiedCreatureProps,
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
