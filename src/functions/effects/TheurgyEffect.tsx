import { CharacterEntry, ItemEntry, RollValueType } from "../../Types";
import { CheckEffect } from "../ActivesFunction";
import { IsArmor, IsWeapon } from "../UtilityFunctions";

export function TheurgyEffect(
  character: CharacterEntry,
  item: ItemEntry,
): RollValueType {
  const name = "Theurgy";
  const roll_value_type: RollValueType = {
    source: name,
    type: "buff",
    value: 0,
  };

  const found_effect = CheckEffect(character, name);

  // Theurgy buffs
  const found_blessed_shield = CheckEffect(character, "Blessed Shield");
  const found_witch_hammer = CheckEffect(character, "Witch Hammer");
  const found_witch_hammer_undead = CheckEffect(
    character,
    "Witch Hammer Undead",
  );

  let mod = 0;

  if (
    found_effect &&
    ((IsWeapon(item) && (found_witch_hammer || found_witch_hammer_undead)) ||
      (IsArmor(item) && found_blessed_shield))
  ) {
    mod +=
      found_effect.static.base_amount +
      found_effect.static.level_amount * (found_effect.level - 1);
  }

  roll_value_type.value = mod;

  return roll_value_type;
}
