import { CreatureStats } from "../../Types";

const ModifierConverter: Record<number, number> = {
  17: -7,
  16: -6,
  15: -5,
  14: -4,
  13: -3,
  12: -2,
  11: -1,
  10: 0,
  9: 1,
  8: 2,
  7: 3,
  6: 4,
  5: 5,
  4: 6,
  3: 7,
};

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

export const IronFist = (
  modifiedCreature: modifiedCreatureProps,
  creatureAbilities: Record<string, number>,
) => {
  console.log("IronFist");
  if (creatureAbilities["Iron Fist"] >= 1) {
    modifiedCreature.attack = ModifierConverter[modifiedCreature.stats.strong];
  }

  if (creatureAbilities["Iron Fist"] === 2) {
    modifiedCreature.damage += 2;
  } else if (creatureAbilities["Iron Fist"] === 3) {
    modifiedCreature.damage += 4;
  }

  return modifiedCreature;
};
