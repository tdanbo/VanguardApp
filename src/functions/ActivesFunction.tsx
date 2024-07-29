import { CharacterEntry, EffectEntry } from "../Types";

export const UpdateQualities = (character: CharacterEntry) => {
  const qualityModifiers = {
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
          Object.entries(modifiers).forEach(([stat, value]) => {
            character.stats[stat as keyof typeof character.stats].mod += value;
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

export function CheckEffect(
  character: CharacterEntry,
  name: string,
): EffectEntry | undefined {
  return character.effects.find(
    (effect) => effect.active && effect.name === name,
  );
}

export function ResetEffects(character: CharacterEntry, reset_type: string) {
  let reset = "roll";

  if (["sleeping", "eating", "armor", "damage", "never"].includes(reset_type)) {
    reset = reset_type;
  }

  for (const effect of character.effects) {
    effect.static.reset === reset ? (effect.active = false) : null;
  }
}
