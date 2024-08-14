import { accessory_content } from "../content/equipment/accessory";
import { adventuring_gear_content } from "../content/equipment/adventuring_gear";
import { alchemical_weapons_content } from "../content/equipment/alchemical_weapons";
import { ammunition_content } from "../content/equipment/ammunition";
import { armor_content } from "../content/equipment/armor";
import { containers_content } from "../content/equipment/containers";
import { crafting_materials_content } from "../content/equipment/crafting_materials";
import { elixirs_content } from "../content/equipment/elixirs";
import { poisons_content } from "../content/equipment/poisons";
import { ranged_content } from "../content/equipment/ranged";
import { resource_content } from "../content/equipment/resource";
import { ritual_scrolls_content } from "../content/equipment/rituals_scrolls";
import { tools_content } from "../content/equipment/tools";
import { treasure_artifact_content } from "../content/equipment/treasure_artifact";
import { treasure_mystical_content } from "../content/equipment/treasure_mystical";
import { treasure_normal_content } from "../content/equipment/treasure_normal";
import { treasure_unique_content } from "../content/equipment/treasure_unique";
import { weapons_content } from "../content/equipment/weapons";

import { abilities_content } from "../content/abilities/abilities";
import { burden_content } from "../content/abilities/burdens";
import { monsterous_traits_content } from "../content/abilities/monsterous_traits";
import { mystical_powers_content } from "../content/abilities/mystical_powers";
import { rituals_content } from "../content/abilities/rituals";
import { utility_content } from "../content/abilities/utility";
import { effects_content } from "../content/effects/effects";

import { price_list } from "../content/cost";

function generateID(): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

import {
  AbilityEntry,
  AbilityStatic,
  CharacterEntry,
  EffectEntry,
  EffectStatic,
  ItemEntry,
  ItemStatic,
} from "../Types";

export const all_abilities: Record<string, AbilityStatic> = {
  ...abilities_content,
  ...burden_content,
  ...monsterous_traits_content,
  ...mystical_powers_content,
  ...rituals_content,
  ...utility_content,
};

export const all_equipment: Record<string, ItemStatic> = {
  ...accessory_content,
  ...adventuring_gear_content,
  ...alchemical_weapons_content,
  ...ammunition_content,
  ...armor_content,
  ...containers_content,
  ...crafting_materials_content,
  ...elixirs_content,
  ...poisons_content,
  ...ranged_content,
  ...resource_content,
  ...ritual_scrolls_content,
  ...tools_content,
  ...treasure_artifact_content,
  ...treasure_mystical_content,
  ...treasure_normal_content,
  ...treasure_unique_content,
  ...weapons_content,
};

export const all_effects: Record<string, EffectStatic> = {
  ...effects_content,
};

export function GetEquipmentContent(): ItemEntry[] {
  const equipment_content: ItemEntry[] = [];
  for (const equipment in all_equipment) {
    const static_equipment = all_equipment[equipment];

    const new_equipment: ItemEntry = {
      name: equipment,
      id: generateID(),
      durability: static_equipment.max_durability,
      quantity: 1,
      equipped: false,
      light: false,
      static: static_equipment,
    };

    new_equipment.static.cost = get_cost(new_equipment);

    equipment_content.push(new_equipment);
  }
  return equipment_content;
}

export function GetAbilitiesContent(): AbilityEntry[] {
  const ability_content_list: AbilityEntry[] = [];
  for (const ability in all_abilities) {
    const static_ability = all_abilities[ability];
    const new_ability: AbilityEntry = {
      name: ability,
      id: generateID(),
      level: "Novice",
      free: false,
      static: static_ability,
    };
    ability_content_list.push(new_ability);
  }
  return ability_content_list;
}

export function GetEffectsContent(): EffectEntry[] {
  const effects_content_list: EffectEntry[] = [];
  for (const effect in all_effects) {
    const static_effect = all_effects[effect];
    const new_effect: EffectEntry = {
      name: effect,
      id: generateID(),
      level: 1,
      active: false,
      static: static_effect,
      reset: "never",
    };
    effects_content_list.push(new_effect);
  }
  return effects_content_list;
}

export function UpdateCharacterStatics(
  character: CharacterEntry,
): CharacterEntry {
  console.log("Updating Statics");

  character.abilities.forEach((ability) => {
    const static_ability = all_abilities[ability.name];
    if (!static_ability) {
      throw new Error(`Static ability not found for ${ability.name}`);
    }
    ability.static = static_ability;
  });

  character.inventory.forEach((item) => {
    let static_item = all_equipment[item.name];
    if (!static_item) {
      static_item = {
        roll: [],
        quality: [],
        rarity: "normal",
        cost: 0,
        category: "general good",
        effect: [],
        bulk: false,
        slot: 0,
        max_durability: 0,
      };
      console.log(
        `ATTENTION: Static item not found for ${item.name}, creating general good`,
      );
    }
    item.static = static_item;
  });

  character.effects.forEach((effect) => {
    const static_effect = all_effects[effect.name];
    if (!static_effect) {
      throw new Error(`Static effect not found for ${effect.name}`);
    }
    effect.static = static_effect;
  });

  return character;
}

const get_base_cost = (item: ItemEntry): number => {
  let base_cost = 0;
  price_list.forEach((group) => {
    if (group["categories"].includes(item.static.category)) {
      base_cost = group["cost"];
    }
  });
  return base_cost;
};

function get_cost(item: ItemEntry): number {
  const rarity_multiplier: Record<string, number> = {
    normal: 1,
    quality: 3,
    mystical: 6,
    artifact: 9,
    unique: 12,
  };

  let cost = get_base_cost(item) * rarity_multiplier[item.static.rarity];
  if (item.name === "Thaler") {
    cost = 1;
  } else if (item.name === "Ration") {
    cost = 1;
  }
  return cost;
}
