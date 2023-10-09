import { CreatureEntry } from "../../Types";

export const ExceptionalStats = (creatureClone: CreatureEntry) => {
  const abilityMapping: Record<string, keyof typeof creatureClone.stats> = {
    "Exceptionally Strong": "strong",
    "Exceptionally Resolute": "resolute",
    "Exceptionally Quick": "quick",
    "Exceptionally Discreet": "discreet",
    "Exceptionally Vigilant": "vigilant",
    "Exceptionally Persuasive": "persuasive",
    "Exceptionally Accurate": "accurate",
    "Exceptionally Cunning": "cunning",
  };

  {
    for (const [ability, stat] of Object.entries(abilityMapping)) {
      if (creatureClone.abilities[ability] === 1) {
        creatureClone.stats[stat] += 1;
      } else if (creatureClone.abilities[ability] === 2) {
        creatureClone.stats[stat] += 2;
      } else if (creatureClone.abilities[ability] === 3) {
        creatureClone.stats[stat] += 3;
      }
    }
  }

  return creatureClone;
};
