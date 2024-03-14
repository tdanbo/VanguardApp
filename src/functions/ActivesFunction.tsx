import { ActivesEntry, CharacterEntry } from "../Types";
import { GetMaxSlots, GetUsedSlots } from "./RulesFunctions";
import { ArmoredMystic_active } from "./rules/ArmoredMystic";
import { Berserker_active } from "./rules/Berserker";
import { ItemRulesActives } from "./rules/ItemRulesActives";
import { ManAtArms_active } from "./rules/ManAtArms";
import { Robust_active } from "./rules/Robust";
import { ShieldFighter_active } from "./rules/ShieldFighter";
import { TwinAttack_active } from "./rules/TwinAttack";

export const GetActives = (character: CharacterEntry) => {
  console.log("GetActives");
  const character_actives: ActivesEntry = {
    attack: { value: 0, stat: "" },
    defense: { value: 0, stat: "" },
    casting: { value: 0, stat: "" },
    sneaking: { value: 0, stat: "" },
    initiative: { value: 0, stat: "" },
  };

  // ATTACK STAT
  if (CheckAbility(character, "Iron Fist", "novice")) {
    character_actives.attack.stat = "strong";
    character_actives.attack.value = character.stats.strong.value;
  } else if (CheckAbility(character, "Tactician", "master")) {
    character_actives.attack.stat = "cunning";
    character_actives.attack.value = character.stats.cunning.value;
  } else if (CheckAbility(character, "Dominate", "novice")) {
    character_actives.attack.stat = "persuasive";
    character_actives.attack.value = character.stats.persuasive.value;
  } else if (CheckAbility(character, "Feint", "novice")) {
    character_actives.attack.stat = "discreet";
    character_actives.attack.value = character.stats.discreet.value;
  } else if (CheckAbility(character, "Sixth Sense", "novice")) {
    character_actives.attack.stat = "vigilant";
    character_actives.attack.value = character.stats.vigilant.value;
  } else {
    character_actives.attack.stat = "accurate";
    character_actives.attack.value = character.stats.accurate.value;
  }

  // DEFENSE STAT
  if (CheckAbility(character, "Tactician", "adept")) {
    character_actives.defense.stat = "cunning";
    character_actives.defense.value = character.stats.cunning.value;
  } else if (CheckAbility(character, "Sixth Sense", "adept")) {
    character_actives.defense.stat = "vigilant";
    character_actives.defense.value = character.stats.vigilant.value;
  } else if (CheckAbility(character, "feint", "adept")) {
    character_actives.defense.stat = "discreet";
    character_actives.defense.value = character.stats.discreet.value;
  } else {
    character_actives.defense.stat = "quick";
    character_actives.defense.value = character.stats.quick.value;
  }

  // CASTING STAT
  if (CheckAbility(character, "leader", "novice")) {
    character_actives.casting.stat = "persuasive";
    character_actives.casting.value = character.stats.persuasive.value;
  } else {
    character_actives.casting.stat = "resolute";
    character_actives.casting.value = character.stats.resolute.value;
  }

  // SNEAKING STAT
  character_actives.sneaking.stat = "discreet";
  character_actives.sneaking.value = character.stats.discreet.value;

  // INITIATIVE STAT
  if (CheckAbility(character, "Tactician", "novice")) {
    character_actives.initiative.stat = "cunning";
    character_actives.initiative.value = character.stats.cunning.value;
  } else if (CheckAbility(character, "Sixth Sense", "adept")) {
    character_actives.initiative.stat = "vigilant";
    character_actives.initiative.value = character.stats.vigilant.value;
  } else {
    character_actives.initiative.stat = "quick";
    character_actives.initiative.value = character.stats.quick.value;
  }

  UpdateQualities(character, character_actives);
  Overburden(character, character_actives);
  Berserker_active(character, character_actives);
  ManAtArms_active(character, character_actives);
  ArmoredMystic_active(character, character_actives);
  ShieldFighter_active(character, character_actives);
  Robust_active(character, character_actives);
  TwinAttack_active(character, character_actives);
  ItemRulesActives(character, character_actives);
  return character_actives;
};

const Overburden = (
  character: CharacterEntry,
  character_actives: ActivesEntry,
) => {
  const used_slots = GetUsedSlots(character);
  const max_slots = GetMaxSlots(character);

  if (used_slots > max_slots) {
    character_actives.defense.value -= used_slots - max_slots;
  }
};

const UpdateQualities = (
  character: CharacterEntry,
  character_actives: ActivesEntry,
) => {
  console.log("Updating Qualities");
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

  character.inventory.forEach((item) => {
    if (!item || !item.static.quality || !item.equipped) return;

    item.static.quality.forEach((quality) => {
      Object.entries(qualityModifiers).forEach(([key, modifiers]) => {
        if (quality.includes(key)) {
          Object.entries(modifiers).forEach(([action, value]) => {
            character_actives[action as keyof typeof character_actives].value +=
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
