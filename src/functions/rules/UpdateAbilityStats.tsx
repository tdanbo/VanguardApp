import { AbilityEntry, CharacterEntry, EffectEntry } from "../../Types";
import { CheckAbility, UpdateQualities, Overburden } from "../ActivesFunction";
import { GetImpedingValue } from "../RulesFunctions";
import { ArmoredMystic_active } from "./ArmoredMystic";
import { Berserker_active } from "./Berserker";
import { ManAtArms_active } from "./ManAtArms";
import { Robust_active } from "./Robust";
import { ShieldFighter_active } from "./ShieldFighter";
import { StaffFighting_active } from "./StaffFighting";
import { TwinAttack_active } from "./TwinAttack";

function HasItem(character: CharacterEntry, item: string) {
  for (const i of character.inventory) {
    if (i.name === item && i.equipped) {
      return true;
    }
  }
}

function UpdateStatModifiers(character: CharacterEntry): CharacterEntry {
  character.stats.strong.mod = 0;
  character.stats.resolute.mod = 0;
  character.stats.quick.mod = 0;
  character.stats.discreet.mod = 0;
  character.stats.vigilant.mod = 0;
  character.stats.persuasive.mod = 0;
  character.stats.accurate.mod = 0;
  character.stats.cunning.mod = 0;

  character.stats.attack.value = 0;
  character.stats.attack.mod = 0;
  character.stats.defense.value = 0;
  character.stats.defense.mod = 0;
  character.stats.initiative.value = 0;
  character.stats.initiative.mod = 0;

  const LevelValue = (ability: AbilityEntry) => {
    if (ability.level === "Novice") {
      return 1;
    } else if (ability.level === "Adept") {
      return 2;
    } else if (ability.level === "Master") {
      return 3;
    }
    return 0;
  };

  character.effects.forEach((effect: EffectEntry) => {
    if (effect.name === "Weakened Strong") {
      character.stats.strong.mod -= effect.level;
    } else if (effect.name === "Weakened Resolute") {
      character.stats.resolute.mod -= effect.level;
    } else if (effect.name === "Weakened Quick") {
      character.stats.quick.mod -= effect.level;
    } else if (effect.name === "Weakened Discreet") {
      character.stats.discreet.mod -= effect.level;
    } else if (effect.name === "Weakened Vigilant") {
      character.stats.vigilant.mod -= effect.level;
    } else if (effect.name === "Weakened Persuasive") {
      character.stats.persuasive.mod -= effect.level;
    } else if (effect.name === "Weakened Accurate") {
      character.stats.accurate.mod -= effect.level;
    } else if (effect.name === "Weakened Cunning") {
      character.stats.cunning.mod -= effect.level;
    } else if (effect.name === "Exhausted") {
      character.stats.strong.mod -= effect.level;
      character.stats.resolute.mod -= effect.level;
      character.stats.quick.mod -= effect.level;
      character.stats.discreet.mod -= effect.level;
      character.stats.vigilant.mod -= effect.level;
      character.stats.persuasive.mod -= effect.level;
      character.stats.accurate.mod -= effect.level;
      character.stats.cunning.mod -= effect.level;
      character.stats.defense.mod -= effect.level;
      character.stats.attack.mod -= effect.level;
      character.stats.initiative.mod -= effect.level;
    }
  });

  character.abilities.forEach((ability: AbilityEntry) => {
    if (ability.name === "Exceptionally Strong") {
      character.stats.strong.mod += LevelValue(ability);
    } else if (ability.name === "Exceptionally Resolute") {
      character.stats.resolute.mod += LevelValue(ability);
    } else if (ability.name === "Exceptionally Quick") {
      character.stats.quick.mod += LevelValue(ability);
    } else if (ability.name === "Exceptionally Discreet") {
      character.stats.discreet.mod += LevelValue(ability);
    } else if (ability.name === "Exceptionally Vigilant") {
      character.stats.vigilant.mod += LevelValue(ability);
    } else if (ability.name === "Exceptionally Persuasive") {
      character.stats.persuasive.mod += LevelValue(ability);
    } else if (ability.name === "Exceptionally Accurate") {
      character.stats.accurate.mod += LevelValue(ability);
    } else if (ability.name === "Exceptionally Cunning") {
      character.stats.cunning.mod += LevelValue(ability);
    }
  });

  if (HasItem(character, "Wraith Legion's Crown")) {
    character.stats.resolute.mod += 2;
  }

  if (HasItem(character, "Staff Head")) {
    character.stats.resolute.mod += 1;
  }

  if (HasItem(character, "Right Hand of Kraghammer")) {
    character.stats.vigilant.mod += 2;
  }

  if (HasItem(character, "Ormol's Wyrmcape")) {
    character.stats.discreet.mod += 2;
  }

  if (HasItem(character, "Agani's Coronet")) {
    character.stats.persuasive.mod += 2;
  }

  if (HasItem(character, "Ebonfang Warspear")) {
    character.stats.accurate.mod += 2;
  }

  console.log("Impeding Value: ", GetImpedingValue(character));

  character.stats.accurate.mod -= GetImpedingValue(character);
  character.stats.quick.mod -= GetImpedingValue(character);
  character.stats.discreet.mod -= GetImpedingValue(character);
  character.stats.resolute.mod -= GetImpedingValue(character);
  character.stats.defense.mod -= GetImpedingValue(character);

  // ATTACK STAT
  if (CheckAbility(character, "Iron Fist", "novice")) {
    character.stats.attack.value = character.stats["strong"].value;
  } else if (CheckAbility(character, "Tactician", "master")) {
    character.stats.attack.value = character.stats["cunning"].value;
  } else if (CheckAbility(character, "Dominate", "novice")) {
    character.stats.attack.value = character.stats["persuasive"].value;
  } else if (CheckAbility(character, "Feint", "novice")) {
    character.stats.attack.value = character.stats["discreet"].value;
  } else if (CheckAbility(character, "Sixth Sense", "novice")) {
    character.stats.attack.value = character.stats["vigilant"].value;
  } else {
    character.stats.attack.value = character.stats["accurate"].value;
  }

  // DEFENSE STAT
  if (CheckAbility(character, "Tactician", "adept")) {
    character.stats.defense.value = character.stats["cunning"].value;
  } else if (CheckAbility(character, "Sixth Sense", "adept")) {
    character.stats.defense.value = character.stats["vigilant"].value;
  } else if (CheckAbility(character, "feint", "adept")) {
    character.stats.defense.value = character.stats["discreet"].value;
  } else {
    character.stats.defense.value = character.stats["quick"].value;
  }

  // INITIATIVE STAT
  if (CheckAbility(character, "Tactician", "novice")) {
    character.stats.initiative.value = character.stats["cunning"].value;
  } else if (CheckAbility(character, "Sixth Sense", "adept")) {
    character.stats.initiative.value = character.stats["vigilant"].value;
  } else {
    character.stats.initiative.value = character.stats["quick"].value;
  }

  UpdateQualities(character);
  Overburden(character);
  Berserker_active(character);
  ManAtArms_active(character);
  ArmoredMystic_active(character);
  ShieldFighter_active(character);
  StaffFighting_active(character);
  Robust_active(character);
  TwinAttack_active(character);

  return character;
}

export default UpdateStatModifiers;
