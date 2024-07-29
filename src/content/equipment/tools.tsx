import { ItemStatic } from "../../Types";

export const tools_content: Record<string, ItemStatic> = {
  "Repair Kit Weak": {
    roll: [],
    quality: [],
    rarity: "normal",
    cost: 1500,
    category: "tool",
    effect: [
      "A weak repair kit can restore d4 points of durability to a normal, quality or mystical item. A character without Artifact Crafter or Blacksmith can attempt to use the kit by rolling a successful Cunning check. If the check fails, the kit will be used without effect.",
    ],
    bulk: true,
    slot: 0,
    max_durability: 0,
  },
  "Repair Kit Moderate": {
    roll: [],
    quality: [],
    rarity: "quality",
    cost: 3000,
    category: "tool",
    effect: [
      "A moderate repair kit can restore d6 points of durability to a normal, quality or mystical item. A character without Artifact Crafter or Blacksmith can attempt to use the kit by rolling a successful Cunning check. If the check fails, the kit will be used without effect.",
    ],
    bulk: true,
    slot: 0,
    max_durability: 0,
  },
  "Repair Kit Strong": {
    roll: [],
    quality: [],
    rarity: "mystical",
    cost: 4500,
    category: "tool",
    effect: [
      "A strong repair kit can restore d8 points of durability to a normal, quality or mystical item. A character without Artifact Crafter or Blacksmith can attempt to use the kit by rolling a successful Cunning check. If the check fails, the kit will be used without effect.",
    ],
    bulk: true,
    slot: 0,
    max_durability: 0,
  },
  "Artifact Repair Kit Weak": {
    roll: [],
    quality: [],
    rarity: "quality",
    cost: 3000,
    category: "tool",
    effect: [
      "A weak repair kit can restore d4 points of durability to a artifact or unique item. A character without Artifact Crafter or Blacksmith can attempt to use the kit by rolling a successful Cunning check. If the check fails, the kit will be used without effect.",
    ],
    bulk: true,
    slot: 0,
    max_durability: 0,
  },
  "Artifact Repair Kit Moderate": {
    roll: [],
    quality: [],
    rarity: "mystical",
    cost: 6000,
    category: "tool",
    effect: [
      "A moderate repair kit can restore d6 points of durability to a artifact or unique item. A character without Artifact Crafter or Blacksmith can attempt to use the kit by rolling a successful Cunning check. If the check fails, the kit will be used without effect.",
    ],
    bulk: true,
    slot: 0,
    max_durability: 0,
  },
  "Artifact Repair Kit Strong": {
    roll: [],
    quality: [],
    rarity: "artifact",
    cost: 9000,
    category: "tool",
    effect: [
      "A strong repair kit can restore d8 points of durability to a artifact or unique item. A character without Artifact Crafter or Blacksmith can attempt to use the kit by rolling a successful Cunning check. If the check fails, the kit will be used without effect.",
    ],
    bulk: true,
    slot: 0,
    max_durability: 0,
  },
  "Artifact Catalogue": {
    roll: [],
    quality: [],
    rarity: "normal",
    cost: 1000,
    category: "tool",
    effect: [
      "This well-thumbed copy compiling all the troll smith Xavaundo's knowledge was recorded by Master Balinda of Ordo Magica and gives a +1 bonus to success tests with Artifact Crafting.",
    ],
    bulk: false,
    slot: 0,
    max_durability: 0,
  },
  Bestiary: {
    roll: [],
    quality: [],
    rarity: "normal",
    cost: 1000,
    category: "tool",
    effect: [
      "A richly illustrated catalogue of the dangers of the world, including marginal notes from previous owners regarding the best ways to avoid monsters \u2013 or how to combat them effectively. The bestiary gives a +1 bonus to success tests with Beast Lore.",
    ],
    bulk: false,
    slot: 0,
    max_durability: 0,
  },
  "Cartographer's Instruments": {
    roll: [],
    quality: [],
    rarity: "normal",
    cost: 1000,
    category: "tool",
    effect: [
      "Writing utensils, parchment, compass, ruler and a sextant are the base instruments of a trained cartographer. Using these tools gives a +1 bonus on all success tests when trying to draw accurate maps.",
    ],
    bulk: false,
    slot: 0,
    max_durability: 0,
  },
  "Cheating Kit": {
    roll: [],
    quality: [],
    rarity: "normal",
    cost: 1000,
    category: "tool",
    effect: [
      "Weighted dice, marked cards and game pieces give the player character a +1 bonus on all success tests when gambling (see the boon Cheat on page 52 for risks on cheating at games).",
    ],
    bulk: false,
    slot: 0,
    max_durability: 0,
  },
  "Climbing Gear": {
    roll: [],
    quality: [],
    rarity: "normal",
    cost: 1000,
    category: "tool",
    effect: [
      "A collection of ropes, buckles, hooks and tools used for climbing in difficult terrain. Climbing gear gives a +1 bonus to all success tests for climbing.",
    ],
    bulk: false,
    slot: 0,
    max_durability: 0,
  },
  "Disguise Kit": {
    roll: [],
    quality: [],
    rarity: "normal",
    cost: 1000,
    category: "tool",
    effect: [
      "Make-up, wigs and wax for altering facial features is included in the kit, together with an array of basic clothes of local significance. The kit gives a +1 bonus on all success tests when trying to fool someone with a disguise.",
    ],
    bulk: false,
    slot: 0,
    max_durability: 0,
  },
  "Excavation Tools": {
    roll: [],
    quality: [],
    rarity: "normal",
    cost: 1000,
    category: "tool",
    effect: [
      "A couple of shovels, a small skewer, a strainer and a bucket, together with brushes, a knotted measuring line and a loupe. Excavation tools give a +1 bonus to finding treasures in the ruins of the world.",
    ],
    bulk: false,
    slot: 0,
    max_durability: 0,
  },
  "Field Laboratory": {
    roll: [],
    quality: [],
    rarity: "normal",
    cost: 1000,
    category: "tool",
    effect: [
      "Burner, retort stand, pipettes, mortar and other instruments needed by an alchemist. The field laboratory gives a +1 bonus to all success tests with Alchemy.",
    ],
    bulk: false,
    slot: 0,
    max_durability: 0,
  },
  "Field Library": {
    roll: [],
    quality: [],
    rarity: "normal",
    cost: 1000,
    category: "tool",
    effect: [
      "Half a dozen reference books along with a dozen scrolls on more specialized topics. The field library gives a +1 bonus to all success tests with Loremaster.",
    ],
    bulk: false,
    slot: 0,
    max_durability: 0,
  },
  "Field Smithy": {
    roll: [],
    quality: [],
    rarity: "normal",
    cost: 1000,
    category: "tool",
    effect: [
      "The portable field smithy is a must for all traveling blacksmiths. It consists of a collection of tools, a field furnace with a water bath and a small anvil. Anyone using the smithy gains a +1 bonus to success tests with Blacksmith.",
    ],
    bulk: false,
    slot: 0,
    max_durability: 0,
  },
  "Field Surgeon's Instrument Kit": {
    roll: [],
    quality: [],
    rarity: "normal",
    cost: 1000,
    category: "tool",
    effect: [
      "The kit of a field surgeon contains tools to burn, cut and treat wounds and diseases, and gives a +1 bonus on all success tests with the ability Medicus.",
    ],
    bulk: false,
    slot: 0,
    max_durability: 0,
  },
  "Forgery Kit": {
    roll: [],
    quality: [],
    rarity: "normal",
    cost: 1000,
    category: "tool",
    effect: [
      "Aside from a loupe, paper, parchment and a collection of pens and ink, this package includes stamps, seals and pre-printed stationery from a long list of organizations, trading houses and similar. The kit gives the user a +1 bonus on all success tests when trying to fool someone with a forged document.",
    ],
    bulk: false,
    slot: 0,
    max_durability: 0,
  },
  "Poison Manual": {
    roll: [],
    quality: [],
    rarity: "normal",
    cost: 1000,
    category: "tool",
    effect: [
      "A manual on the use of poisons, richly illustrated with examples on what to do, and not do, in order to successfully brew decoctions and elixirs. Anyone using the manual gains a +1 bonus on all success tests with Poisoner.",
    ],
    bulk: false,
    slot: 0,
    max_durability: 0,
  },
  "Trapper's Manual": {
    roll: [],
    quality: [],
    rarity: "normal",
    cost: 1000,
    category: "tool",
    effect: [
      "A used copy of the famous ogre Crueljaw's lustful tome that contains a lengthy record of traps, from simple mare snares and needle-traps in box lids to massive contraptions suited for a king's burial mound. The book gives a +1 bonus to all success tests with Trapper.",
    ],
    bulk: false,
    slot: 0,
    max_durability: 0,
  },
};
