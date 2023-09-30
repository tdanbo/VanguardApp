import { cloneDeep } from "lodash";
import { CharacterEntry } from "../../Types";
import { CheckAbility } from "../ActivesFunction";
import { postSelectedCharacter } from "../CharacterFunctions";

interface Ability {
  name: string;
  level: string; // Assuming level is a string like "master", "adept", etc.
  // Add any other properties related to Ability if needed
}

interface ExceptionalStatsProps {
  character: CharacterEntry;
  state: string;
  ability: Ability;
  level: string;
  originalLevel: string;
}

interface Ability {
  name: string;
}

export function ExceptionalStats({
  character,
  state,
  ability,
  level,
  originalLevel,
}: ExceptionalStatsProps): CharacterEntry {
  const clonedStats = cloneDeep(character.stats);

  const levels = { Master: 3, Adept: 2, Novice: 1 };
  let abilityValue = 0;

  if (state === "add") {
    abilityValue = levels[level as keyof typeof levels];
  } else if (state === "sub") {
    abilityValue = -levels[level as keyof typeof levels];
  } else if (state === "change") {
    abilityValue =
      levels[level as keyof typeof levels] -
      levels[originalLevel as keyof typeof levels];
  } else {
    throw new Error("Invalid state");
  }

  const applyValue = (statKey: keyof typeof clonedStats) => {
    clonedStats[statKey].value += abilityValue;
  };

  const abilityMapping: Record<string, keyof typeof clonedStats> = {
    "Exceptionally Strong": "strong",
    "Exceptionally Resolute": "resolute",
    "Exceptionally Quick": "quick",
    "Exceptionally Discreet": "discreet",
    "Exceptionally Vigilant": "vigilant",
    "Exceptionally Persuasive": "persuasive",
    "Exceptionally Accurate": "accurate",
    "Exceptionally Cunning": "cunning",
  };

  if (abilityMapping[ability.name]) {
    applyValue(abilityMapping[ability.name]);
  } else {
    console.warn(`Ability ${ability.name} not recognized.`);
  }

  const updatedCharacter: CharacterEntry = {
    ...character,
    stats: clonedStats,
  };
  console.log("ExceptionalStats POST");
  postSelectedCharacter(updatedCharacter);
  return updatedCharacter;
}
