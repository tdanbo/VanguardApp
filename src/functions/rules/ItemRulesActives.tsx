import { CharacterEntry, ActivesEntry } from "../../Types";

function HasItem(character: CharacterEntry, item: string) {
  for (const i of character.inventory) {
    if (i.name === item && i.equipped) {
      return true;
    }
  }
}

export function ItemRulesActives(
  character: CharacterEntry,
  actives: ActivesEntry,
) {
  if (HasItem(character, "Staff Head")) {
    actives.casting.value += 1;
  }
}
