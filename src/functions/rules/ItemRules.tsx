import { CharacterEntry, ActivesEntry } from "../../Types";

export function ItemRules(character: CharacterEntry, actives: ActivesEntry) {
  character.inventory.forEach((item) => {
    if (item.name === "The Haganor Skin" && item.equip.equipped) {
      {
        character.inventory.forEach((extra) => {
          if (item.name !== "The Haganor Skin" && item.equip.equipped) {
            extra.roll.dice += 4;
          }
        });
      }
    }

    if (item.name === "Staff Head" && item.equip.equipped) {
      actives.casting.value += 1;
    }
  });
}
