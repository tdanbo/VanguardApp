import { AbilityEntry, CharacterEntry, EffectEntry } from "../../Types";

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

  console.log("Updating Ability Stats");

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

  if (HasItem(character, "Wraith Crown of Eternity Legion")) {
    character.stats.resolute.mod += 2;
  }

  if (HasItem(character, "Right Hand of Kraghammer")) {
    character.stats.vigilant.mod += 2;
  }

  return character;
}

export default UpdateStatModifiers;
