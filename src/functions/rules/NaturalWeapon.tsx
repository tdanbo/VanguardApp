import { CharacterEntry, ItemEntry, RollValueType } from "../../Types";
import { CheckAbility } from "../ActivesFunction";

export function NaturalWeapon_dice(
  character: CharacterEntry,
  item: ItemEntry,
): RollValueType {
  const name = "natural weapon";
  const roll_value_type: RollValueType = {
    source: name,
    type: "buff",
    value: 0,
  };

  const ability = CheckAbility(character, name, "novice");
  const ability_adept = CheckAbility(character, name, "adept");
  const ability_master = CheckAbility(character, name, "master");

  let mod = 0;

  if (item.static.category === "natural weapon") {
    if (ability_master) {
      mod += 6;
    } else if (ability_adept) {
      mod += 4;
    } else if (ability) {
      mod += 2;
    }
  }

  roll_value_type.value = mod;
  return roll_value_type;
}
