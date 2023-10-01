import { Actives, CharacterEntry } from "../Types";
import { ManAtArms } from "./rules/ManAtArms";
import { PolearmMastery } from "./rules/PolearmMastery";
import { ShieldFighter } from "./rules/ShieldFighter";
import { ArmoredMystic } from "./rules/ArmoredMystic";
import { TwohandedForce } from "./rules/TwohandedForce";

const actives: Actives = {
  attack: {
    value: 0,
    dice1: 0,
    dice1_mod: 0,
    dice1_name: "",
    dice2: 0,
    dice2_mod: 0,
    dice2_name: "",
  },
  defense: {
    value: 0,
    dice: 0,
    dice_mod: 0,
    dice_name: "",
  },
  casting: {
    value: 0,
  },
  sneaking: {
    value: 0,
  },
};

export const UpdateActives = (character: CharacterEntry) => {
  actives.attack.value = character.stats[character.actives["attack"]].value;
  actives.defense.value = character.stats[character.actives["defense"]].value;
  actives.casting.value = character.stats[character.actives["casting"]].value;
  actives.sneaking.value = character.stats[character.actives["sneaking"]].value;

  actives.attack.dice1 = character.equipment.main.roll.dice;
  actives.attack.dice2 = character.equipment.off.roll.dice;
  actives.defense.dice = character.equipment.armor.roll.dice;

  actives.attack.dice1_name = character.equipment.main.name;
  actives.attack.dice2_name = character.equipment.off.name;
  actives.defense.dice_name = character.equipment.armor.name;

  actives.attack.dice1_mod = character.equipment.main.roll.mod;
  actives.attack.dice2_mod = character.equipment.off.roll.mod;
  actives.defense.dice_mod = character.equipment.armor.roll.mod;

  Overburden(character);
  UpdateQualities(character);
  ManAtArms(character, actives);
  PolearmMastery(character, actives);
  ShieldFighter(character, actives);
  ArmoredMystic(character, actives);
  TwohandedForce(character, actives);

  return actives;
};

const Overburden = (character: CharacterEntry) => {
  console.log("Checking Overburden");
  const used_slots = character.inventory.length;
  const max_slots = Math.max(character.stats.strong.value - 2, 10);

  if (used_slots > max_slots) {
    actives.defense.value -= used_slots - max_slots;
  }
};

const UpdateQualities = (character: CharacterEntry) => {
  const equippedItems = [
    character.equipment.main,
    character.equipment.off,
    character.equipment.armor,
  ];

  const qualityModifiers = {
    "Impeding 1": { sneaking: -1, defense: -1, casting: -1 },
    "Impeding 2": { sneaking: -2, defense: -2, casting: -2 },
    "Impeding 3": { sneaking: -3, defense: -3, casting: -3 },
    "Impeding 4": { sneaking: -4, defense: -4, casting: -4 },
    "Balanced 1": { defense: 1 },
    "Balanced 2": { defense: 2 },
    "Balanced 3": { defense: 3 },
    Precise: { attack: 1 },
  };

  equippedItems.forEach((item) => {
    if (!item || !item.quality) return;

    item.quality.forEach((quality) => {
      Object.entries(qualityModifiers).forEach(([key, modifiers]) => {
        if (quality.includes(key)) {
          Object.entries(modifiers).forEach(([action, value]) => {
            actives[action as keyof typeof actives].value += value;
          });
        }
      });
    });
  });
};

export function CheckAbility(
  character: CharacterEntry,
  name: string,
  level: string,
): boolean {
  const abilities = character.abilities;

  const levels: Record<string, string[]> = {
    novice: ["novice", "adept", "master"],
    adept: ["adept", "master"],
    master: ["master"],
  };

  const approved_levels = levels[level.toLowerCase()];

  return abilities.some(
    (ability) =>
      ability.name.toLowerCase() === name.toLowerCase() &&
      approved_levels.includes(ability.level.toLowerCase()),
  );
}
