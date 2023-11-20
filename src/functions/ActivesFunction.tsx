import { CharacterEntry } from "../Types";
import { ManAtArms } from "./rules/ManAtArms";
import { PolearmMastery } from "./rules/PolearmMastery";
import { ShieldFighter } from "./rules/ShieldFighter";
import { ArmoredMystic } from "./rules/ArmoredMystic";
import { TwohandedForce } from "./rules/TwohandedForce";
import {
  GetUsedSlots,
  GetMaxSlots,
  postSelectedCharacter,
} from "./CharacterFunctions";
import { cloneDeep } from "lodash";
import { Marksman } from "./rules/Marksman";
import { Robust } from "./rules/Robust";

export const UpdateActives = (character: CharacterEntry) => {
  const characterClone = cloneDeep(character);

  if (characterClone.id === "") {
    return characterClone.actives;
  }

  console.log("Updating Actives");

  characterClone.actives.attack.value =
    characterClone.stats[characterClone.actives.attack.stat].value;
  characterClone.actives.defense.value =
    characterClone.stats[characterClone.actives.defense.stat].value;
  characterClone.actives.casting.value =
    characterClone.stats[characterClone.actives.casting.stat].value;
  characterClone.actives.sneaking.value =
    characterClone.stats[characterClone.actives.sneaking.stat].value;

  characterClone.actives.attack.dice1 = characterClone.equipment.main.roll.dice;
  characterClone.actives.attack.dice2 = characterClone.equipment.off.roll.dice;
  characterClone.actives.defense.dice =
    characterClone.equipment.armor.roll.dice;

  characterClone.actives.attack.dice1_name = characterClone.equipment.main.name;
  characterClone.actives.attack.dice2_name = characterClone.equipment.off.name;
  characterClone.actives.defense.dice_name =
    characterClone.equipment.armor.name;

  UpdateQualities(characterClone);
  Overburden(characterClone);
  ManAtArms(characterClone, characterClone.actives);
  PolearmMastery(characterClone, characterClone.actives);
  ShieldFighter(characterClone, characterClone.actives);
  ArmoredMystic(characterClone, characterClone.actives);
  Marksman(characterClone, characterClone.actives);
  TwohandedForce(characterClone, characterClone.actives);
  Robust(characterClone, characterClone.actives);

  console.log(characterClone);

  postSelectedCharacter(characterClone);

  return characterClone.actives;
};

const Overburden = (character: CharacterEntry) => {
  console.log("Checking Overburden");
  const used_slots = GetUsedSlots(character);
  const max_slots = GetMaxSlots(character);

  if (used_slots > max_slots) {
    character.actives.defense.value -= used_slots - max_slots;
  }
};

const UpdateQualities = (character: CharacterEntry) => {
  const equippedItems = [
    character.equipment.main,
    character.equipment.off,
    character.equipment.armor,
  ];

  equippedItems.forEach((item) => {
    if (item && item.quality && item.quality.includes("Reinforced")) {
      character.actives.defense.dice += 1;
    }
  });

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
            character.actives[action as keyof typeof character.actives].value +=
              value;
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
