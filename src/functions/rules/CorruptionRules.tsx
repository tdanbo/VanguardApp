import { CharacterEntry } from "../../Types";

export function CorruptionRules(character: CharacterEntry) {
  return character.health.corruption;
}
