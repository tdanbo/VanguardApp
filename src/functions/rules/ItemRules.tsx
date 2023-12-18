import { CharacterEntry, Actives } from "../../Types";

export function ItemRules(character: CharacterEntry, actives: Actives) {
  character.inventory.forEach((item) => {
    if (item.name === "The Haganor Skin") {
      actives.defense.dice += 4;
    }

    if (item.name === "Staff Head") {
      actives.casting.value += 1;
    }
  });
}
