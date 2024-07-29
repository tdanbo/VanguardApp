import { AbilityEntry, CharacterEntry, RollValueType } from "../../Types";
import { CheckAbility } from "../ActivesFunction";

export function Theurgy_dice(
  character: CharacterEntry,
  ability: AbilityEntry,
): RollValueType {
  const name = "theurgy";
  const roll_value_type: RollValueType = {
    source: name,
    type: "buff",
    value: 0,
  };

  const ability_master = CheckAbility(character, name, "master");

  let mod = 0;

  if (ability_master && ability.static.tradition.includes("theurgy")) {
    mod += 5;
  }

  roll_value_type.value = mod;

  return roll_value_type;
}
