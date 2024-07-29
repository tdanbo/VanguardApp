import { ItemStatic } from "../../Types";

export const containers_content: Record<string, ItemStatic> = {
  Pouch: {
    roll: [],
    quality: ["Storage 3"],
    rarity: "normal",
    cost: 3000,
    category: "container",
    effect: ["A small and simple bag, usually used for carrying small items."],
    bulk: false,
    slot: 0,
    max_durability: 0,
  },
  Sachel: {
    roll: [],
    quality: ["Storage 6"],
    rarity: "quality",
    cost: 5000,
    category: "container",
    effect: [
      "A medium-sized bag with a shoulder strap, often used by scholars, mages, or messengers. Ideal for carrying scrolls, books, magical components, or maps.",
    ],
    bulk: false,
    slot: 0,
    max_durability: 0,
  },
  Backpack: {
    roll: [],
    quality: ["Storage 9"],
    rarity: "mystical",
    cost: 7000,
    category: "container",
    effect: [
      "A larger bag made of sturdy materials like leather or canvas, carried on the back with straps. Used by adventurers for carrying supplies, books, scrolls, and light provisions.",
    ],
    bulk: false,
    slot: 0,
    max_durability: 0,
  },
  "Traveler's Pack": {
    roll: [],
    quality: ["Storage 12"],
    rarity: "artifact",
    cost: 9000,
    category: "container",
    effect: [
      "A larger, more robust version of a backpack, often reinforced with metal or magical elements. Designed for long journeys, capable of carrying camping gear, larger books, several days' worth of provisions, and various adventuring gear.",
    ],
    bulk: false,
    slot: 0,
    max_durability: 0,
  },
};
