import {
  AbilityEntry,
  CharacterEntry,
  ItemEntry,
  RollValueType,
} from "../Types";
import { CheckAbility } from "./ActivesFunction";
import { GetAbilityLevel } from "./CharacterFunctions";
import { ArmorEffect } from "./effects/ArmorEffect";
import { BlessedShieldEffect } from "./effects/BlessedShieldEffect";
import { CriticalStrikeEffect } from "./effects/CriticalStrikeEffect";
import { DamageEffect } from "./effects/DamageEffect";
import { FlankedEffect } from "./effects/FlankedEffect";
import { FlankingEffect } from "./effects/FlankingEffect";
import { HuntersInstinct_dice } from "./effects/HuntersInstinctEffect";
import { IronFistEffect } from "./effects/IronFistEffect";
import { TheurgyEffect } from "./effects/TheurgyEffect";
import { WitchHammerEffect } from "./effects/WitchHammerEffect";
import { WitchHammerUndeadEffect } from "./effects/WitchHammerUndeadEffect";
import { Armored_dice } from "./rules/Armored";
import { ArmoredMystic_dice } from "./rules/ArmoredMystic";
import { Berserker_dice } from "./rules/Berserker";
import { FeatOfStrength_dice } from "./rules/FeatOfStrength";
import { Impact_dice } from "./rules/ImpactDice";
import { IronFist_dice } from "./rules/IronFist";
import { ItemRulesDice } from "./rules/ItemRulesDice";
import { ManAtArms_dice } from "./rules/ManAtArms";
import { Marksman_dice } from "./rules/Marksman";
import { NaturalWarrior_dice } from "./rules/NaturalWarrior";
import { NaturalWeapon_dice } from "./rules/NaturalWeapon";
import { PolearmMastery_dice } from "./rules/PolearmMastery";
import { Reinforced_dice } from "./rules/ReinforcedDice";
import { Robust_dice } from "./rules/Robust";
import { ShieldFighter_dice } from "./rules/ShieldFighter";
import { SteelThrow_dice } from "./rules/SteelThrow";
import { SurvivalInstinct_dice } from "./rules/SurvivalInstinct";
import { Theurgy_dice } from "./rules/Theurgy";
import { TwinAttack_dice } from "./rules/TwinAttack";
import { TwohandedForce_dice } from "./rules/TwohandedForce";
import { Flailer_dice } from "./rules/Flailer";
import { Medicus_dice } from "./rules/Medicus";

function HasItem(character: CharacterEntry, item: string) {
  for (const i of character.inventory) {
    if (i.name === item && i.equipped) {
      return true;
    }
  }
}

export function RulesItemDiceAdjust(
  character: CharacterEntry,
  item: ItemEntry,
): RollValueType[] {
  // items
  const base_roll = item.static.roll.filter((roll) => roll.source === "base");

  base_roll.push(NaturalWeapon_dice(character, item));
  base_roll.push(NaturalWarrior_dice(character, item));
  base_roll.push(Berserker_dice(character, item));
  base_roll.push(ManAtArms_dice(character, item));
  base_roll.push(SteelThrow_dice(character, item));
  base_roll.push(PolearmMastery_dice(character, item));
  base_roll.push(HuntersInstinct_dice(character, item));
  base_roll.push(ShieldFighter_dice(character, item));
  base_roll.push(ArmoredMystic_dice(character, item));
  base_roll.push(Marksman_dice(character, item));
  base_roll.push(TwohandedForce_dice(character, item));
  base_roll.push(Flailer_dice(character, item));
  base_roll.push(Armored_dice(character, item));
  base_roll.push(IronFist_dice(character, item));
  base_roll.push(Robust_dice(character));
  base_roll.push(TwinAttack_dice(character, item));
  base_roll.push(FeatOfStrength_dice(character, item));
  base_roll.push(ItemRulesDice(character, item));
  base_roll.push(SurvivalInstinct_dice(character, item));
  base_roll.push(Impact_dice(item));
  base_roll.push(Reinforced_dice(item));
  base_roll.push(Medicus_dice(character, item));

  // effects
  base_roll.push(WitchHammerEffect(character, item));
  base_roll.push(WitchHammerUndeadEffect(character, item));
  base_roll.push(BlessedShieldEffect(character, item));
  base_roll.push(TheurgyEffect(character, item));
  base_roll.push(FlankingEffect(character, item));
  base_roll.push(FlankedEffect(character, item));
  base_roll.push(CriticalStrikeEffect(character, item));
  base_roll.push(IronFistEffect(character, item));
  base_roll.push(DamageEffect(character, item));
  base_roll.push(ArmorEffect(character, item));

  // abilities

  const filtered_rolls = base_roll.filter(
    (roll) =>
      roll.source === "base" || (roll.value !== 0 && roll.source !== "base"),
  );

  filtered_rolls.sort((a, b) => (a.value > b.value ? -1 : 1));

  return filtered_rolls;
}

export function RulesAbilityDiceAdjust(
  character: CharacterEntry,
  ability: AbilityEntry,
): RollValueType[] {
  const ability_level = GetAbilityLevel(ability);
  const base_roll = ability_level.roll.filter((roll) => roll.source === "base");
  base_roll.push(Theurgy_dice(character, ability));

  const filtered_rolls = base_roll.filter((roll) => roll.value !== 0);

  return filtered_rolls;
}

export function GetMaxSlots(character: CharacterEntry) {
  const strong_capacity = CheckAbility(character, "Pack-mule", "novice")
    ? character.stats.strong.value + character.stats.strong.base * 1.5
    : character.stats.strong.value + character.stats.strong.base;

  let max_slots = Math.max(
    Math.ceil(
      (strong_capacity +
        character.stats.resolute.value +
        character.stats.resolute.base) /
        2,
    ),
    10,
  );

  const storageModifiers = {
    "Storage 3": 3,
    "Storage 6": 6,
    "Storage 9": 9,
    "Storage 12": 12,
    "Storage 15": 15,
  };

  character.inventory.forEach((item) => {
    item.static.quality.forEach((quality) => {
      Object.entries(storageModifiers).forEach(([key, modifiers]) => {
        if (quality.includes(key)) {
          max_slots += modifiers;
        }
      });
    });
  });

  return max_slots;
}

export function GetMaxToughness(character: CharacterEntry) {
  const FeatOfStrength = CheckAbility(character, "Feat of Strength", "novice")
    ? 5
    : 0;

  const max_toughness =
    character.stats.strong.value + character.stats.strong.base < 10
      ? 10
      : character.stats.strong.value + character.stats.strong.base;
  return max_toughness + FeatOfStrength;
}

export function GetPainThreshold(character: CharacterEntry) {
  return Math.ceil(
    (character.stats.strong.value + character.stats.strong.base) / 2,
  );
}

export const GetMovementSpeed = (character: CharacterEntry) => {
  let total_speed = Math.ceil(
    (5 +
      character.stats.quick.value +
      character.stats.quick.base -
      GetImpedingValue(character) -
      OverburdenValue(character)) /
      2,
  );

  if (HasItem(character, "Right Hand of Kraghammer")) {
    total_speed -= 2;
  }
  if (HasItem(character, "Left Hand of Kraghammer")) {
    total_speed -= 2;
  }
  return total_speed;
};

export const GetImpedingValue = (character: CharacterEntry): number => {
  let impeding = 0;

  const negativeQualities: { [key: string]: number } = {
    "Imp 1": 1,
    "Imp 2": 2,
    "Imp 3": 3,
    "Imp 4": 4,
  };

  character.inventory.forEach((item: ItemEntry) => {
    if (item.equipped) {
      item.static.quality.forEach((quality: string) => {
        if (quality in negativeQualities) {
          impeding += negativeQualities[quality];
        }
      });
    }
  });

  return impeding;
};

export const OverburdenValue = (character: CharacterEntry) => {
  const overburden = Math.min(
    0,
    GetMaxSlots(character) - GetUsedSlots(character),
  );
  return Math.abs(overburden);
};

export const GetCorruption = (character: CharacterEntry) => {
  const corruption =
    character.stats.resolute.value +
    Math.ceil(character.stats.resolute.value / 2);
  return corruption;
};

export const GetTemporaryCorruption = (character: CharacterEntry) => {
  const temporary_corruption = Math.ceil(character.stats.resolute.value / 2);
  return temporary_corruption;
};

export const GetPermanentCorruption = (character: CharacterEntry) => {
  const permanent_corruption = GetTemporaryCorruption(character) * 3;
  return permanent_corruption;
};

export function GetBurnRate(character: CharacterEntry) {
  let burn_rate =
    Math.ceil(character.details.xp_earned / 50) +
    GetStorageValue(character) / 3;

  if (CheckAbility(character, "Bushcraft", "novice")) {
    burn_rate -= 1;
  }

  return burn_rate;
}

export function GetPreciseValue(character: CharacterEntry) {
  let precise_value = 0;

  const preciseModifiers = {
    Precise: 1,
  };

  character.inventory.forEach((item) => {
    if (!item.static.quality) return;

    item.static.quality.forEach((quality) => {
      Object.entries(preciseModifiers).forEach(([key, modifiers]) => {
        if (quality.includes(key)) {
          precise_value += modifiers;
        }
      });
    });
  });

  return precise_value;
}

export function GetStorageValue(character: CharacterEntry) {
  let storage_value = 0;

  const storageModifiers = {
    "Storage 3": 3,
    "Storage 6": 6,
    "Storage 9": 9,
    "Storage 12": 12,
    "Storage 15": 15,
  };

  character.inventory.forEach((item) => {
    if (!item.static.quality) return;

    item.static.quality.forEach((quality) => {
      Object.entries(storageModifiers).forEach(([key, modifiers]) => {
        if (quality.includes(key)) {
          storage_value += modifiers;
        }
      });
    });
  });

  return storage_value;
}

export function GetUsedSlots(character: CharacterEntry) {
  let used_slots = character.inventory.length;

  character.inventory.forEach((item) => {
    if (item.light === true) {
      used_slots -= 1;
    }
  });

  return used_slots;
}

export function GetEquipmentCorruption(character: CharacterEntry) {
  let value_adjustment = 0;

  for (const item of character.inventory) {
    if (
      item.static.rarity === "unique" &&
      !CheckAbility(character, "Artifact Crafting", "novice")
    ) {
      value_adjustment += 1;
    }
  }

  return value_adjustment;
}

export function GetAbilityCorruption(character: CharacterEntry) {
  let value_adjustment = 0;

  const has_theurgy_novice = CheckAbility(character, "Theurgy", "novice");
  const has_theurgy_adept = CheckAbility(character, "Theurgy", "adept");
  const has_theurgy_master = CheckAbility(character, "Theurgy", "master");

  const has_wizardry_novice = CheckAbility(character, "Wizardry", "novice");
  const has_wizardry_adept = CheckAbility(character, "Wizardry", "adept");
  const has_wizardry_master = CheckAbility(character, "Wizardry", "master");

  for (const ability of character.abilities) {
    if (
      ability.static.category === "mystical power" ||
      ability.static.category === "ritual"
    ) {
      if (
        ability.level === "Novice" ||
        ability.level === "Adept" ||
        ability.level === "Master"
      ) {
        if (
          ability.static.tradition.includes("theurgy") &&
          has_theurgy_novice
        ) {
          value_adjustment -= 1;
        } else if (
          ability.static.tradition.includes("wizardry") &&
          has_wizardry_novice
        ) {
          value_adjustment -= 1;
        }
        value_adjustment += 1;
      }
      if (ability.level === "Adept" || ability.level === "Master") {
        if (ability.static.tradition.includes("theurgy") && has_theurgy_adept) {
          value_adjustment -= 1;
        } else if (
          ability.static.tradition.includes("wizardry") &&
          has_wizardry_adept
        ) {
          value_adjustment -= 1;
        }
        value_adjustment += 1;
      }

      if (ability.level === "Master") {
        if (
          ability.static.tradition.includes("theurgy") &&
          has_theurgy_master
        ) {
          value_adjustment -= 1;
        } else if (
          ability.static.tradition.includes("wizardry") &&
          has_wizardry_master
        ) {
          value_adjustment -= 1;
        }
        value_adjustment += 1;
      }
    }
  }

  return value_adjustment;
}

export function SetDurability(character: CharacterEntry, id: string) {
  const durability = 0;

  character.inventory.forEach((item) => {
    if (item.id === id) {
      item.durability -= 1;
    }
  });

  return durability;
}
