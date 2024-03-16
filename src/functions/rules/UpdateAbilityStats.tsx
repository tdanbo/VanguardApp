import { CharacterEntry, EffectEntry } from "../../Types";
import { cloneDeep } from "lodash";

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

  return character;
}

export default UpdateStatModifiers;
