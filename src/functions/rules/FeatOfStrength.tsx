import { CharacterEntry, ItemEntry, RollValueType } from "../../Types";
import { CheckAbility } from "../ActivesFunction";
import { GetMaxToughness } from "../RulesFunctions";
import { IsMeleeWeapon } from "../UtilityFunctions";

export function FeatOfStrength_dice(
  character: CharacterEntry,
  item: ItemEntry,
): RollValueType {
  const name = "feat of strength";
  const roll_value_type: RollValueType = {
    source: name,
    type: "buff",
    value: 0,
  };

  const ability = CheckAbility(character, "feat of strength", "master");
  let mod = 0;
  if (
    ability &&
    character.health.damage >= GetMaxToughness(character) / 2 &&
    IsMeleeWeapon(item)
  ) {
    mod += 4;
  }

  roll_value_type.value = mod;

  return roll_value_type;
}
//
