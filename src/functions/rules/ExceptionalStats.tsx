import { cloneDeep } from "lodash";
import { CharacterEntry, StatName } from "../../Types";
import { CheckAbility } from "../ActivesFunction";
import { postSelectedCharacter } from "../CharacterFunctions";

interface ExceptionalStatsProps {
  character: CharacterEntry;
  state: boolean;
}

export function ExceptionalStats({
  character,
  state,
}: ExceptionalStatsProps): CharacterEntry {
  const clonedStats = cloneDeep(character.stats);

  const abilities = {
    "exceptionally strong": "strong",
    "exceptionally resolute": "resolute",
    "exceptionally quick": "quick",
    "exceptionally discreet": "discreet",
    "exceptionally vigilant": "vigilant",
    "exceptionally persuasive": "persuasive",
    "exceptionally accurate": "accurate",
    "exceptionally cunning": "cunning",
  };
  const levels = { master: 3, adept: 2, novice: 1 };

  for (const [ability_name, attribute] of Object.entries(abilities)) {
    for (const [level, value] of Object.entries(levels)) {
      const haveAbility = CheckAbility(character, ability_name, level);
      if (haveAbility) {
        if (state) {
          clonedStats[attribute as StatName].value += value;
        } else {
          clonedStats[attribute as StatName].value -= value;
        }
        break;
      }
    }
  }

  const updatedCharacter: CharacterEntry = {
    ...character,
    stats: clonedStats,
  };

  postSelectedCharacter(updatedCharacter);
  return updatedCharacter;
}
