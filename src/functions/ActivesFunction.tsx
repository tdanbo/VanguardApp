import { ActivesEntry, CharacterEntry } from "../Types";
import { GetMaxSlots, GetUsedSlots } from "./RulesFunctions";
import { ArmoredMystic_active } from "./rules/ArmoredMystic";
import { Berserker_active } from "./rules/Berserker";
import { ItemRulesActives } from "./rules/ItemRulesActives";
import { ManAtArms_active } from "./rules/ManAtArms";
import { Robust_active } from "./rules/Robust";
import { ShieldFighter_active } from "./rules/ShieldFighter";
import { StaffFighting_active } from "./rules/StaffFighting";
import { TwinAttack_active } from "./rules/TwinAttack";

export const GetActives = (character: CharacterEntry) => {
  const character_actives: ActivesEntry = {
    attack: { mod: 0, stat: "accurate" },
    defense: { mod: 0, stat: "quick" },
    casting: { mod: 0, stat: "resolute" },
    sneaking: { mod: 0, stat: "discreet" },
    initiative: { mod: 0, stat: "quick" },
  };

  // ATTACK STAT
  if (CheckAbility(character, "Iron Fist", "novice")) {
    character_actives.attack.stat = "strong";
    character_actives.attack.mod = 0;
  } else if (CheckAbility(character, "Tactician", "master")) {
    character_actives.attack.stat = "cunning";
    character_actives.attack.mod = 0;
  } else if (CheckAbility(character, "Dominate", "novice")) {
    character_actives.attack.stat = "persuasive";
    character_actives.attack.mod = 0;
  } else if (CheckAbility(character, "Feint", "novice")) {
    character_actives.attack.stat = "discreet";
    character_actives.attack.mod = 0;
  } else if (CheckAbility(character, "Sixth Sense", "novice")) {
    character_actives.attack.stat = "vigilant";
    character_actives.attack.mod = 0;
  } else {
    character_actives.attack.stat = "accurate";
    character_actives.attack.mod = 0;
  }

  // DEFENSE STAT
  if (CheckAbility(character, "Tactician", "adept")) {
    character_actives.defense.stat = "cunning";
    character_actives.defense.mod = 0;
  } else if (CheckAbility(character, "Sixth Sense", "adept")) {
    character_actives.defense.stat = "vigilant";
    character_actives.defense.mod = 0;
  } else if (CheckAbility(character, "feint", "adept")) {
    character_actives.defense.stat = "discreet";
    character_actives.defense.mod = 0;
  } else {
    character_actives.defense.stat = "quick";
    character_actives.defense.mod = 0;
  }

  // CASTING STAT
  if (CheckAbility(character, "leader", "novice")) {
    character_actives.casting.stat = "persuasive";
    character_actives.casting.mod = 0;
  } else {
    character_actives.casting.stat = "resolute";
    character_actives.casting.mod = 0;
  }

  // SNEAKING STAT
  character_actives.sneaking.stat = "discreet";
  character_actives.sneaking.mod = 0;

  // INITIATIVE STAT
  if (CheckAbility(character, "Tactician", "novice")) {
    character_actives.initiative.stat = "cunning";
    character_actives.initiative.mod =
      character.stats.cunning.mod + character.stats.cunning.mod;
  } else if (CheckAbility(character, "Sixth Sense", "adept")) {
    character_actives.initiative.stat = "vigilant";
    character_actives.initiative.mod = 0;
  } else {
    character_actives.initiative.stat = "quick";
    character_actives.initiative.mod = 0;
  }

  UpdateQualities(character, character_actives);
  Overburden(character, character_actives);
  Berserker_active(character, character_actives);
  ManAtArms_active(character, character_actives);
  ArmoredMystic_active(character, character_actives);
  ShieldFighter_active(character, character_actives);
  StaffFighting_active(character, character_actives);
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
    character_actives.defense.mod -= used_slots - max_slots;
  }
};

const UpdateQualities = (
  character: CharacterEntry,
  character_actives: ActivesEntry,
) => {
  console.log("Updating Qualities");
  const qualityModifiers = {
    "Imp 1": { sneaking: -1, defense: -1, casting: -1 },
    "Imp 2": { sneaking: -2, defense: -2, casting: -2 },
    "Imp 3": { sneaking: -3, defense: -3, casting: -3 },
    "Imp 4": { sneaking: -4, defense: -4, casting: -4 },
    "Balanced 1": { defense: 1 },
    "Balanced 2": { defense: 2 },
    "Balanced 3": { defense: 3 },
    Precise: { attack: 1 },
  };

  character.inventory.forEach((item) => {
    if (!item.static.quality || !item.equipped) {
      return;
    }

    item.static.quality.forEach((quality) => {
      Object.entries(qualityModifiers).forEach(([key, modifiers]) => {
        if (quality.includes(key)) {
          Object.entries(modifiers).forEach(([action, value]) => {
            character_actives[action as keyof typeof character_actives].mod +=
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
