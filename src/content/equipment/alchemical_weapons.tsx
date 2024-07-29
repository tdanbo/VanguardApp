import { ItemStatic } from "../../Types";

export const alchemical_weapons_content: Record<string, ItemStatic> = {
  "Weak Alchemical Firetube": {
    roll: [
      {
        source: "base",
        type: "damage",
        value: 12,
      },
    ],
    quality: ["Flaming", "Area Cone"],
    rarity: "quality",
    cost: 1000,
    category: "alchemical weapon",
    effect: [
      "The weak alchemical firetube is stationary and can not be carried. Failing an attack roll without Siege Expert will cause the weapon to explode and deal damage to the user.",
    ],
    bulk: false,
    slot: 0,
    max_durability: 12,
  },
  "Moderate Alchemical Firetube": {
    roll: [
      {
        source: "base",
        type: "damage",
        value: 10,
      },
    ],
    quality: ["Flaming", "Area Cone"],
    rarity: "mystical",
    cost: 1500,
    category: "alchemical weapon",
    effect: [
      "The strong alchemical firetube can be carried as a weapon. Failing an attack roll without Siege Expert will cause the weapon to explode and deal damage to the user.",
    ],
    bulk: false,
    slot: 1,
    max_durability: 10,
  },
  "Strong Alchemical Firetube": {
    roll: [
      {
        source: "base",
        type: "damage",
        value: 12,
      },
    ],
    quality: ["Flaming", "Area Cone"],
    rarity: "artifact",
    cost: 2000,
    category: "alchemical weapon",
    effect: [
      "The strong alchemical firetube can be carried as a weapon. Failing an attack roll without Siege Expert will cause the weapon to explode and deal damage to the user.",
    ],
    bulk: false,
    slot: 1,
    max_durability: 12,
  },
  "Alchemical Firetube Charge": {
    roll: [],
    quality: [],
    rarity: "normal",
    cost: 200,
    category: "alchemical weapon",
    effect: ["Used as a projectile for the Alchemical Firetube"],
    bulk: true,
    slot: 0,
    max_durability: 0,
  },
  "Weak Alchemical Grenade": {
    roll: [
      {
        source: "base",
        type: "damage",
        value: 8,
      },
    ],
    quality: ["Flaming", "Area Radius"],
    rarity: "normal",
    cost: 200,
    category: "alchemical weapon",
    effect: [
      "The grenade is thrown like a throwing weapon. Failing an attack roll without Siege Expert will cause the weapon to explode and deal damage to the user.",
    ],
    bulk: true,
    slot: 0,
    max_durability: 8,
  },
  "Moderate Alchemical Grenade": {
    roll: [
      {
        source: "base",
        type: "damage",
        value: 10,
      },
    ],
    quality: ["Flaming", "Area Radius"],
    rarity: "quality",
    cost: 400,
    category: "alchemical weapon",
    effect: [
      "The grenade is thrown like a throwing weapon. Failing an attack roll without Siege Expert will cause the weapon to explode and deal damage to the user.",
    ],
    bulk: true,
    slot: 0,
    max_durability: 10,
  },
  "Strong Alchemical Grenade": {
    roll: [
      {
        source: "base",
        type: "damage",
        value: 12,
      },
    ],
    quality: ["Flaming", "Area Radius"],
    rarity: "mystical",
    cost: 800,
    category: "alchemical weapon",
    effect: [
      "The grenade is thrown like a throwing weapon. Failing an attack roll without Siege Expert will cause the weapon to explode and deal damage to the user.",
    ],
    bulk: true,
    slot: 0,
    max_durability: 12,
  },
  "Weak Alchemical Mine": {
    roll: [
      {
        source: "base",
        type: "damage",
        value: 8,
      },
    ],
    quality: ["Flaming", "Area Radius"],
    rarity: "normal",
    cost: 200,
    category: "alchemical weapon",
    effect: [
      "Setting up the mine without Siege Expert requires a discreet check. If the check fails the mine will explode and deal damage to the user.",
    ],
    bulk: true,
    slot: 0,
    max_durability: 8,
  },
  "Moderate Alchemical Mine": {
    roll: [
      {
        source: "base",
        type: "damage",
        value: 10,
      },
    ],
    quality: ["Flaming", "Area Radius"],
    rarity: "quality",
    cost: 400,
    category: "alchemical weapon",
    effect: [
      "Setting up the mine without Siege Expert requires a discreet check. If the check fails the mine will explode and deal damage to the user.",
    ],
    bulk: true,
    slot: 0,
    max_durability: 10,
  },
  "Strong Alchemical Mine": {
    roll: [
      {
        source: "base",
        type: "damage",
        value: 12,
      },
    ],
    quality: ["Flaming", "Area Radius"],
    rarity: "mystical",
    cost: 800,
    category: "alchemical weapon",
    effect: [
      "Setting up the mine without Siege Expert requires a discreet check. If the check fails the mine will explode and deal damage to the user.",
    ],
    bulk: true,
    slot: 0,
    max_durability: 12,
  },
  "Weak Breaching Pot": {
    roll: [],
    quality: [],
    rarity: "normal",
    cost: 200,
    category: "alchemical weapon",
    effect: [
      "A breaching pot is a jar filled with explosive substanced used to breaking up doors and walls. A weak breaching pot can break open small locks.",
    ],
    bulk: true,
    slot: 0,
    max_durability: 0,
  },
  "Moderate Breaching Pot": {
    roll: [],
    quality: [],
    rarity: "quality",
    cost: 400,
    category: "alchemical weapon",
    effect: [
      "A breaching pot is a jar filled with explosive substanced used to breaking up doors and walls. A moderate breaching pot can break open most doors and small locks.",
    ],
    bulk: true,
    slot: 0,
    max_durability: 0,
  },
  "Strong Breaching Pot": {
    roll: [],
    quality: [],
    rarity: "mystical",
    cost: 800,
    category: "alchemical weapon",
    effect: [
      "A breaching pot is a jar filled with explosive substanced used to breaking up doors and walls. A strong breaching pot can break down most walls, doors and small locks.",
    ],
    bulk: true,
    slot: 0,
    max_durability: 0,
  },
};
