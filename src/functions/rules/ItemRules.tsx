import { CharacterEntry, ActivesEntry } from "../../Types";

export function ItemRules(character: CharacterEntry, actives: ActivesEntry) {
  character.inventory.forEach((item) => {
    if (item.name === "The Haganor Skin") {
      actives.defense.dice += 4;
    }

    if (item.name === "Staff Head") {
      actives.casting.value += 1;
    }
  });
}
