import {
  AbilityEntry,
  AdvantageType,
  CharacterEntry,
  ItemDynamic,
  ItemEntry,
} from "../Types";
import { GetGameData } from "../contexts/GameContent";
import { CheckAbility } from "./ActivesFunction";
import { GetDatabaseAbility, GetDatabaseEquipment } from "./UtilityFunctions";
import { AdvantageDice } from "./rules/AdvantageDice";
import { Armored_dice } from "./rules/Armored";
import { ArmoredMystic_dice } from "./rules/ArmoredMystic";
import { Berserker_dice } from "./rules/Berserker";
import { FeatOfStrength_dice } from "./rules/FeatOfStrength";
import { IronFist_dice } from "./rules/IronFist";
import { ItemRulesDice } from "./rules/ItemRulesDice";
import { ManAtArms_dice } from "./rules/ManAtArms";
import { Marksman_dice } from "./rules/Marksman";
import { NaturalWarrior_dice } from "./rules/NaturalWarrior";
import { NaturalWeapon_dice } from "./rules/NaturalWeapon";
import { PolearmMastery_dice } from "./rules/PolearmMastery";
import { Robust_dice } from "./rules/Robust";
import { ShieldFighter_dice } from "./rules/ShieldFighter";
import { SteelThrow_dice } from "./rules/SteelThrow";
import { TwinAttack_dice } from "./rules/TwinAttack";
import { TwohandedForce_dice } from "./rules/TwohandedForce";

export function RulesDiceAdjust(
  character: CharacterEntry,
  item: ItemDynamic,
  item_database: ItemEntry,
  advantage: AdvantageType,
) {
  const { equipment } = GetGameData();

  let dice = item_database.roll.dice;
  dice += NaturalWeapon_dice(character, item_database);
  dice += NaturalWarrior_dice(character, item_database);
  dice += Berserker_dice(character, item_database);
  dice += ManAtArms_dice(character, item_database);
  dice += SteelThrow_dice(character, item_database);
  dice += PolearmMastery_dice(character, item_database);
  dice += ShieldFighter_dice(character, item_database, equipment);
  dice += ArmoredMystic_dice(character, item_database);
  dice += Marksman_dice(character, item_database);
  dice += TwohandedForce_dice(character, item_database);
  dice += Armored_dice(character, item_database);
  dice += IronFist_dice(character, item_database);
  dice += Robust_dice(character);
  dice += TwinAttack_dice(character, item, equipment);
  dice += FeatOfStrength_dice(character, item_database);
  dice += ItemRulesDice(character, item_database);
  dice += AdvantageDice(item_database, advantage);
  return dice;
}

export function GetMaxSlots(character: CharacterEntry, equipment: ItemEntry[]) {
  const strong_capacity = CheckAbility(character, "Pack-mule", "novice")
    ? character.stats.strong.value + character.stats.strong.mod * 1.5
    : character.stats.strong.value + character.stats.strong.mod;

  let max_slots = Math.max(
    Math.ceil(
      (strong_capacity +
        character.stats.resolute.value +
        character.stats.resolute.mod) /
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
    const item_database = GetDatabaseEquipment(item, equipment);

    item_database.quality.forEach((quality) => {
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
    character.stats.strong.value + character.stats.strong.mod < 10
      ? 10
      : character.stats.strong.value + character.stats.strong.mod;
  return max_toughness + FeatOfStrength;
}

export function GetPainThreshold(character: CharacterEntry) {
  return Math.ceil(
    (character.stats.strong.value + character.stats.strong.mod) / 2,
  );
}

export const GetMovementSpeed = (
  character: CharacterEntry,
  equipment: ItemEntry[],
) => {
  const total_speed = Math.ceil(
    (5 +
      character.stats.quick.value +
      character.stats.quick.mod -
      GetImpedingValue(character, equipment) -
      OverburdenValue(character, equipment)) /
      2,
  );
  return total_speed;
};

export const GetImpedingValue = (
  character: CharacterEntry,
  equipment: ItemEntry[],
): number => {
  let impeding = 0;

  if (!CheckAbility(character, "Man-at-Arms", "adept")) {
    const negativeQualities: { [key: string]: number } = {
      "Imp 1": 1,
      "Imp 2": 2,
      "Imp 3": 3,
      "Imp 4": 4,
    };

    character.inventory.forEach((item: ItemDynamic) => {
      const item_database = GetDatabaseEquipment(item, equipment);
      if (item_database.category === "armor" && item.equipped) {
        item_database.quality.forEach((quality: string) => {
          if (quality in negativeQualities) {
            impeding += negativeQualities[quality];
          }
        });
      }
    });
  }

  return impeding;
};

export const OverburdenValue = (
  character: CharacterEntry,
  equipment: ItemEntry[],
) => {
  const overburden = Math.min(
    0,
    GetMaxSlots(character, equipment) - GetUsedSlots(character),
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

export function GetBurnRate(character: CharacterEntry, equipment: ItemEntry[]) {
  let burn_rate =
    Math.ceil(character.details.xp_earned / 50) +
    GetStorageValue(character, equipment) / 3;

  if (CheckAbility(character, "Bushcraft", "novice")) {
    burn_rate -= 1;
  }

  return burn_rate;
}

export function GetPreciseValue(
  character: CharacterEntry,
  equipment: ItemEntry[],
) {
  let precise_value = 0;

  const preciseModifiers = {
    Precise: 1,
  };

  character.inventory.forEach((item) => {
    const item_database = GetDatabaseEquipment(item, equipment);
    if (!item || !item_database.quality) return;

    item_database.quality.forEach((quality) => {
      Object.entries(preciseModifiers).forEach(([key, modifiers]) => {
        if (quality.includes(key)) {
          precise_value += modifiers;
        }
      });
    });
  });

  return precise_value;
}

export function GetStorageValue(
  character: CharacterEntry,
  equipment: ItemEntry[],
) {
  let storage_value = 0;

  const storageModifiers = {
    "Storage 3": 3,
    "Storage 6": 6,
    "Storage 9": 9,
    "Storage 12": 12,
    "Storage 15": 15,
  };

  character.inventory.forEach((item) => {
    const item_database = GetDatabaseEquipment(item, equipment);
    if (!item || !item_database.quality) return;

    item_database.quality.forEach((quality) => {
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

export function GetEquipmentCorruption(
  character: CharacterEntry,
  equipment: ItemEntry[],
) {
  let value_adjustment = 0;

  for (const item of character.inventory) {
    const item_database = GetDatabaseEquipment(item, equipment);
    if (
      item_database.rarity === "unique" &&
      !CheckAbility(character, "Artifact Crafting", "novice")
    ) {
      value_adjustment += 1;
    }
  }

  return value_adjustment;
}

export function GetAbilityCorruption(
  character: CharacterEntry,
  abilities: AbilityEntry[],
) {
  let value_adjustment = 0;

  const has_theurgy_novice = CheckAbility(character, "Theurgy", "novice");
  const has_theurgy_adept = CheckAbility(character, "Theurgy", "adept");
  const has_theurgy_master = CheckAbility(character, "Theurgy", "master");

  const has_wizardry_novice = CheckAbility(character, "Wizardry", "novice");
  const has_wizardry_adept = CheckAbility(character, "Wizardry", "adept");
  const has_wizardry_master = CheckAbility(character, "Wizardry", "master");

  for (const ability of character.abilities) {
    const ability_database = GetDatabaseAbility(ability, abilities);
    if (!ability_database) {
      console.log("No ability database found for ability", ability);
      return 0;
    }
    if (
      ability_database.category === "mystical power" ||
      ability_database.category === "ritual"
    ) {
      if (
        ability.level === "Novice" ||
        ability.level === "Adept" ||
        ability.level === "Master"
      ) {
        if (
          ability_database.tradition.includes("Theurgy") &&
          has_theurgy_novice
        ) {
          value_adjustment -= 1;
        } else if (
          ability_database.tradition.includes("Wizardry") &&
          has_wizardry_novice
        ) {
          value_adjustment -= 1;
        }
        value_adjustment += 1;
      }
      if (ability.level === "Adept" || ability.level === "Master") {
        if (
          ability_database.tradition.includes("Theurgy") &&
          has_theurgy_adept
        ) {
          value_adjustment -= 1;
        } else if (
          ability_database.tradition.includes("Wizardry") &&
          has_wizardry_adept
        ) {
          value_adjustment -= 1;
        }
        value_adjustment += 1;
      }

      if (ability.level === "Master") {
        if (
          ability_database.tradition.includes("Theurgy") &&
          has_theurgy_master
        ) {
          value_adjustment -= 1;
        } else if (
          ability_database.tradition.includes("Wizardry") &&
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
  let durability = 0;

  character.inventory.forEach((item) => {
    if (item.id === id) {
      item.durability -= 1;
    }
  });

  return durability;
}
