import { ActivesEntry, CharacterEntry, ItemEntry } from "../Types";
import { GetMaxSlots, GetUsedSlots } from "./RulesFunctions";
import { ArmoredMystic_active } from "./rules/ArmoredMystic";
import { Berserker_active } from "./rules/Berserker";
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
  };

  for (const [_key, value] of Object.entries(character.stats)) {
    if (value.active === "attack") {
      character_actives.attack.value = value.value;
      character_actives.attack.stat = value.active;
    } else if (value.active === "defense") {
      character_actives.defense.value = value.value;
      character_actives.defense.stat = value.active;
    } else if (value.active === "casting") {
      character_actives.casting.value = value.value;
      character_actives.casting.stat = value.active;
    } else if (value.active === "sneaking") {
      character_actives.sneaking.value = value.value;
      character_actives.sneaking.stat = value.active;
    }
  }

  UpdateQualities(character, character_actives);
  Overburden(character, character_actives);
  Berserker_active(character, character_actives);
  ManAtArms_active(character, character_actives);
  ArmoredMystic_active(character, character_actives);
  ShieldFighter_active(character, character_actives);
  Robust_active(character, character_actives);
  TwinAttack_active(character, character_actives);
  return character_actives;
};

export const ApplyRules = (
  character: CharacterEntry,
  character_inventory: ItemEntry[],
  character_actives: ActivesEntry,
) => {
  // ItemRules(characterClone, characterClone.actives);
  // NaturalWeapon(characterClone, characterClone.actives);
  // NaturalWarrior(characterClone, characterClone.actives);
  // Berserker(characterClone, characterClone.actives);
  // SteelThrow(characterClone, characterClone.actives);
  // PolearmMastery(characterClone, characterClone.actives);
  // ShieldFighter(characterClone, characterClone.actives);
  // ArmoredMystic(characterClone, characterClone.actives);
  // Marksman(character, character_actives);
  // TwohandedForce(characterClone, characterClone.actives);
  // Armored(characterClone, characterClone.actives);
  // IronFist(characterClone, characterClone.actives);
  // Robust(characterClone, characterClone.actives);
  // TwinAttack(characterClone, characterClone.actives);
  // postSelectedCharacter(characterClone); # This can be removed in the future i think but keep it in case.
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
    if (!item || !item.quality || !item.equip.equipped) return;

    item.quality.forEach((quality) => {
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
