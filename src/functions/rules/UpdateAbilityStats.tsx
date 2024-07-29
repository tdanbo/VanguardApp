import { AbilityEntry, CharacterEntry } from "../../Types";
import { CheckAbility, UpdateQualities, CheckEffect } from "../ActivesFunction";
import { GetImpedingValue } from "../RulesFunctions";
import { HandleOverburdened } from "../UtilityFunctions";
import { ArmoredMystic_active } from "./ArmoredMystic";
import { Berserker_active } from "./Berserker";
import { ManAtArms_active } from "./ManAtArms";
import { Robust_active } from "./Robust";
import { ShieldFighter_active } from "./ShieldFighter";
import { StaffFighting_active } from "./StaffFighting";
import { TwinAttack_active } from "./TwinAttack";

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
  character.stats.attack.mod = 0;
  character.stats.defense.mod = 0;
  character.stats.initiative.mod = 0;

  character.stats.strong.base = 0;
  character.stats.resolute.base = 0;
  character.stats.quick.base = 0;
  character.stats.discreet.base = 0;
  character.stats.vigilant.base = 0;
  character.stats.persuasive.base = 0;
  character.stats.accurate.base = 0;
  character.stats.cunning.base = 0;
  character.stats.attack.base = 0;
  character.stats.defense.base = 0;
  character.stats.initiative.base = 0;

  character.stats.attack.value = 0;
  character.stats.defense.value = 0;
  character.stats.initiative.value = 0;

  // BASE STATS
  character.abilities.forEach((ability: AbilityEntry) => {
    if (ability.name === "Exceptionally Strong") {
      character.stats.strong.base += LevelValue(ability);
    } else if (ability.name === "Exceptionally Resolute") {
      character.stats.resolute.base += LevelValue(ability);
    } else if (ability.name === "Exceptionally Quick") {
      character.stats.quick.base += LevelValue(ability);
    } else if (ability.name === "Exceptionally Discreet") {
      character.stats.discreet.base += LevelValue(ability);
    } else if (ability.name === "Exceptionally Vigilant") {
      character.stats.vigilant.base += LevelValue(ability);
    } else if (ability.name === "Exceptionally Persuasive") {
      character.stats.persuasive.base += LevelValue(ability);
    } else if (ability.name === "Exceptionally Accurate") {
      character.stats.accurate.base += LevelValue(ability);
    } else if (ability.name === "Exceptionally Cunning") {
      character.stats.cunning.base += LevelValue(ability);
    }
  });

  // ATTACK STAT
  if (CheckAbility(character, "Iron Fist", "novice")) {
    character.stats.attack.value =
      character.stats["strong"].value + character.stats["strong"].base;
  } else if (CheckAbility(character, "Tactician", "master")) {
    character.stats.attack.value =
      character.stats["cunning"].value + character.stats["cunning"].base;
  } else if (CheckAbility(character, "Dominate", "novice")) {
    character.stats.attack.value =
      character.stats["persuasive"].value + character.stats["persuasive"].base;
  } else if (CheckAbility(character, "Feint", "novice")) {
    character.stats.attack.value =
      character.stats["discreet"].value + character.stats["discreet"].base;
  } else if (CheckAbility(character, "Sixth Sense", "novice")) {
    character.stats.attack.value =
      character.stats["vigilant"].value + character.stats["vigilant"].base;
  } else {
    character.stats.attack.value =
      character.stats["accurate"].value + character.stats["accurate"].base;
  }

  // DEFENSE STAT
  if (CheckAbility(character, "Tactician", "adept")) {
    character.stats.defense.value =
      character.stats["cunning"].value + character.stats["cunning"].base;
  } else if (CheckAbility(character, "Sixth Sense", "adept")) {
    character.stats.defense.value =
      character.stats["vigilant"].value + character.stats["vigilant"].base;
  } else if (CheckAbility(character, "feint", "adept")) {
    character.stats.defense.value =
      character.stats["discreet"].value + character.stats["discreet"].base;
  } else if (CheckAbility(character, "Parry Mastery", "novice")) {
    character.stats.defense.value =
      character.stats["accurate"].value + character.stats["accurate"].base;
  } else {
    character.stats.defense.value =
      character.stats["quick"].value + character.stats["quick"].base;
  }

  // INITIATIVE STAT
  if (CheckAbility(character, "Tactician", "novice")) {
    character.stats.initiative.value =
      character.stats["cunning"].value + character.stats["cunning"].base;
  } else if (CheckAbility(character, "Sixth Sense", "adept")) {
    character.stats.initiative.value =
      character.stats["vigilant"].value + character.stats["vigilant"].base;
  } else {
    character.stats.initiative.value =
      character.stats["quick"].value + character.stats["quick"].base;
  }

  // EFFECTS
  const weakened_strong = CheckEffect(character, "Weakened Strong");
  if (weakened_strong) {
    character.stats.strong.mod -= weakened_strong.level;
  }

  const weakened_resolute = CheckEffect(character, "Weakened Resolute");
  if (weakened_resolute) {
    character.stats.resolute.mod -= weakened_resolute.level;
  }

  const weakened_quick = CheckEffect(character, "Weakened Quick");
  if (weakened_quick) {
    character.stats.quick.mod -= weakened_quick.level;
  }

  const weakened_discreet = CheckEffect(character, "Weakened Discreet");
  if (weakened_discreet) {
    character.stats.discreet.mod -= weakened_discreet.level;
  }

  const weakened_vigilant = CheckEffect(character, "Weakened Vigilant");
  if (weakened_vigilant) {
    character.stats.vigilant.mod -= weakened_vigilant.level;
  }

  const weakened_persuasive = CheckEffect(character, "Weakened Persuasive");
  if (weakened_persuasive) {
    character.stats.persuasive.mod -= weakened_persuasive.level;
  }

  const weakened_accurate = CheckEffect(character, "Weakened Accurate");
  if (weakened_accurate) {
    character.stats.accurate.mod -= weakened_accurate.level;
  }

  const weakened_cunning = CheckEffect(character, "Weakened Cunning");
  if (weakened_cunning) {
    character.stats.cunning.mod -= weakened_cunning.level;
  }

  const enhanced_strong = CheckEffect(character, "Enhanced Strong");
  if (enhanced_strong) {
    character.stats.strong.mod += enhanced_strong.level;
  }

  const enhanced_resolute = CheckEffect(character, "Enhanced Resolute");
  if (enhanced_resolute) {
    character.stats.resolute.mod += enhanced_resolute.level;
  }

  const enhanced_quick = CheckEffect(character, "Enhanced Quick");
  if (enhanced_quick) {
    character.stats.quick.mod += enhanced_quick.level;
  }

  const enhanced_discreet = CheckEffect(character, "Enhanced Discreet");
  if (enhanced_discreet) {
    character.stats.discreet.mod += enhanced_discreet.level;
  }

  const enhanced_vigilant = CheckEffect(character, "Enhanced Vigilant");
  if (enhanced_vigilant) {
    character.stats.vigilant.mod += enhanced_vigilant.level;
  }

  const enhanced_persuasive = CheckEffect(character, "Enhanced Persuasive");
  if (enhanced_persuasive) {
    character.stats.persuasive.mod += enhanced_persuasive.level;
  }

  const enhanced_accurate = CheckEffect(character, "Enhanced Accurate");
  if (enhanced_accurate) {
    character.stats.accurate.mod += enhanced_accurate.level;
  }

  const enhanced_cunning = CheckEffect(character, "Enhanced Cunning");
  if (enhanced_cunning) {
    character.stats.cunning.mod += enhanced_cunning.level;
  }

  const flanking = CheckEffect(character, "Flanking");
  if (flanking) {
    character.stats.attack.mod += 2;
  }

  const flanked = CheckEffect(character, "Flanked");
  if (flanked) {
    character.stats.defense.mod -= 2;
  }

  const starving = CheckEffect(character, "Starving");
  if (starving) {
    character.stats.strong.base -= starving.level;
    character.stats.resolute.base -= starving.level;
    character.stats.quick.base -= starving.level;
    character.stats.discreet.base -= starving.level;
    character.stats.vigilant.base -= starving.level;
    character.stats.persuasive.base -= starving.level;
    character.stats.accurate.base -= starving.level;
    character.stats.cunning.base -= starving.level;
  }

  const overburdened = CheckEffect(character, "Overburdened");
  if (overburdened) {
    character.stats.strong.mod -= overburdened.level;
    character.stats.quick.mod -= overburdened.level;
    character.stats.discreet.mod -= overburdened.level;
    character.stats.accurate.mod -= overburdened.level;
    character.stats.attack.mod -= overburdened.level;
    character.stats.defense.mod -= overburdened.level;
  }

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

  character.stats.accurate.mod -= GetImpedingValue(character);
  character.stats.quick.mod -= GetImpedingValue(character);
  character.stats.discreet.mod -= GetImpedingValue(character);
  character.stats.resolute.mod -= GetImpedingValue(character);
  character.stats.defense.mod -= GetImpedingValue(character);

  // effects

  UpdateQualities(character);
  Berserker_active(character);
  ManAtArms_active(character);
  ArmoredMystic_active(character);
  ShieldFighter_active(character);
  StaffFighting_active(character);
  Robust_active(character);
  TwinAttack_active(character);

  HandleOverburdened(character);

  console.log(character.stats);

  return character;
}

export default UpdateStatModifiers;
