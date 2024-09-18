import { cloneDeep, random } from "lodash";
import React from "react";
import { Socket } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import * as Constants from "../Constants";
import {
  AbilityEntry,
  CharacterEntry,
  CombatEntry,
  CriticalType,
  EffectEntry,
  FocusedStateType,
  GeneralItem,
  ItemEntry,
  RollEntry,
  RollNameType,
  RollValueType,
  SessionEntry,
} from "../Types";
import { update_session } from "../functions/SessionsFunctions";
import { ResetEffects } from "./ActivesFunction";
import {
  GetDiceSum,
  HasAmmunition,
  HasRangedWeapon,
  IsOverburden,
} from "./CharacterFunctions";
import {
  GetMaxToughness,
  GetTemporaryCorruption,
  OverburdenValue,
} from "./RulesFunctions";

export function UpperFirstLetter(input: string): string {
  if (!input || typeof input !== "string") {
    return "";
  }
  return input.charAt(0).toUpperCase() + input.slice(1);
}

export function toTitleCase(input: string): string {
  if (!input || typeof input !== "string") {
    return "";
  }
  return input
    .toLowerCase() // Convert whole string to lowercase first
    .split(" ") // Split string by space
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join(" "); // Join the array back to a string
}

type RGB = {
  r: number;
  g: number;
  b: number;
};

function hexToRgb(hex: string): RGB | null {
  let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function IsArmor(item: ItemEntry): boolean {
  const armor_categories = [
    "natural armor",
    "light armor",
    "medium armor",
    "heavy armor",
    "armor accessory",
  ];
  if (armor_categories.includes(item.static.category)) {
    return true;
  }
  return false;
}

export function ShuffleArray(array: Array<any>) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function IsAmbrian(item: CharacterEntry): boolean {
  const categories = ["Ambrian", "Barbarian", "Elf"];
  if (categories.includes(item.details.race)) {
    return true;
  }
  return false;
}

export function IsTroll(item: CharacterEntry): boolean {
  const categories = ["Goblin", "Ogre", "Troll"];
  if (categories.includes(item.details.race)) {
    return true;
  }
  return false;
}

export function IsBeast(item: CharacterEntry): boolean {
  const categories = ["Bear", "Boar", "Cat", "Reptile", "Spider"];
  if (categories.includes(item.details.race)) {
    return true;
  }
  return false;
}

export function IsUndead(item: CharacterEntry): boolean {
  const categories = ["Spirit", "Undead"];
  if (categories.includes(item.details.race)) {
    return true;
  }
  return false;
}

export function IsGeneralGood(item: ItemEntry): boolean {
  const general_categories = [
    "bushcraft crafting material",
    "alchemy crafting material",
    "blacksmith crafting material",
    "ritual crafting material",
    "artifact crafting material",
    "siege expert crafting material",
    "poisoner crafting material",
    "adventuring gear",
    "tool",
    "container",
    "resource",
    "projectile",
  ];
  if (general_categories.includes(item.static.category)) {
    return true;
  }
  return false;
}

export function IsConsumable(item: ItemEntry): boolean {
  const general_categories = ["elixir", "poison"];
  if (general_categories.includes(item.static.category)) {
    return true;
  }
  return false;
}

export function IsWeapon(item: ItemEntry): boolean {
  const weapon_categories = [
    "natural weapon",
    "short weapon",
    "one-hand weapon",
    "long weapon",
    "heavy weapon",
    "ranged weapon",
    "throwing weapon",
    "weapon accessory",
    "alchemical weapon",
    "shield",
    "projectile",
  ];
  if (weapon_categories.includes(item.static.category)) {
    return true;
  }
  return false;
}

export function IsTreasure(item: ItemEntry): boolean {
  const weapon_categories = ["treasure"];
  if (weapon_categories.includes(item.static.category)) {
    return true;
  }
  return false;
}

export function IsMeleeWeapon(item: ItemEntry): boolean {
  const weapon_categories = [
    "natural weapon",
    "short weapon",
    "one-hand weapon",
    "long weapon",
    "heavy weapon",
  ];
  if (weapon_categories.includes(item.static.category)) {
    return true;
  }
  return false;
}

export function IsRangedWeapon(item: ItemEntry): boolean {
  const weapon_categories = [
    "natural weapon",
    "short weapon",
    "one-hand weapon",
    "long weapon",
    "heavy weapon",
  ];
  if (weapon_categories.includes(item.static.category)) {
    return true;
  }
  return false;
}

function adjustBrightness(color: string, amount: number): string {
  const rgb = hexToRgb(color);
  if (!rgb) {
    throw new Error("Invalid hex color");
  }

  // adjust brightness
  let { r, g, b } = rgb;
  r = Math.min(255, Math.max(0, r + amount));
  g = Math.min(255, Math.max(0, g + amount));
  b = Math.min(255, Math.max(0, b + amount));

  // convert back to RGB string
  return `rgb(${r}, ${g}, ${b})`;
}

export function getAdjustedColor(color: string, roll: number): string {
  let brightnessAdjustment: number;
  if (roll === 1) {
    brightnessAdjustment = 30; // Perfect - brighter
  } else if (roll === 20) {
    brightnessAdjustment = -30; // Fumbled - darker
  } else {
    brightnessAdjustment = 0; // Normal - no change
  }

  return adjustBrightness(color, brightnessAdjustment);
}

interface StyledTextProps {
  effect: string;
  websocket: Socket;
  character: CharacterEntry;
  session: SessionEntry;
  isCreature: boolean;
}

export const StyledText: React.FC<StyledTextProps> = ({ effect }) => {
  if (!effect) {
    return null; // or return a default value
  }
  const style = { color: Constants.WIDGET_PRIMARY_FONT, fontWeight: "bold" }; // Example style
  // Updated escapeRegExp function

  // Updated regex
  const regex = new RegExp(
    `\\b(${Constants.SPECIAL_WORDS.map((word) =>
      word.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
    ).join("|")})\\b`,
    "i",
  );

  const getStyledWords = (
    fragment: string,
    _idx: number,
  ): JSX.Element[] | string => {
    const matches = fragment.match(regex);

    if (!matches) {
      return fragment;
    }

    return fragment.split(regex).map((part, partIndex) => {
      const keyB = `${part}-${partIndex}B`;
      const isSpecialWord = Constants.SPECIAL_WORDS.includes(part);

      return (
        <React.Fragment key={keyB}>
          <span style={isSpecialWord ? style : undefined}>{part}</span>
        </React.Fragment>
      );
    });
  };

  const words = effect.split(/(\s+)/).map((word, index) => {
    const key = `${word}-${index}`;
    return <span key={key}>{getStyledWords(word, index)}</span>;
  });

  return <span>{words}</span>;
};

export function GetDatabaseEffect(
  effect: EffectEntry,
  effects_content: EffectEntry[],
): EffectEntry | undefined {
  const content_static_effect = effects_content.find(
    (entry) => entry.name === effect.name,
  );
  if (content_static_effect) {
    return content_static_effect;
  } else {
    return undefined;
  }
}

export function GetDatabaseAbility(
  ability: AbilityEntry,
  abilities_content: AbilityEntry[],
): AbilityEntry | undefined {
  const content_static_ability = abilities_content.find(
    (entry) => entry.name === ability.name,
  );
  if (content_static_ability) {
    return content_static_ability;
  } else {
    return undefined;
  }
}

export function GetDatabaseEquipment(
  equipment: ItemEntry,
  equipment_content: ItemEntry[],
): ItemEntry {
  const content_static_item = equipment_content.find(
    (entry) => entry.name === equipment.name,
  );
  if (content_static_item) {
    return content_static_item;
  } else {
    return GeneralItem;
  }
}

const generateRandomId = (length = 10) => {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length);
};

export function AddToLoot(
  item: ItemEntry,
  session: SessionEntry,
  websocket: Socket,
  character: CharacterEntry,
  isCreature: boolean,
) {
  const drop_item = session.loot.drops.find(
    (drop_item) => drop_item.name === item.name && item.static.bulk === true,
  );

  if (drop_item) {
    drop_item.quantity += 1;
  } else {
    const new_item = cloneDeep(item);
    new_item.id = generateRandomId();
    new_item.quantity = 1;
    session.loot.drops.push(new_item);
  }
  update_session(session, websocket, character, isCreature);
}

export function HandleOverburdened(character: CharacterEntry) {
  console.log("Handle Overburdened");

  const HasOverburdened = character.effects.find(
    (effect) => effect.name === "Overburdened",
  );

  console.log(IsOverburden(character));

  if (OverburdenValue(character) > 0) {
    const level = OverburdenValue(character);
    if (HasOverburdened) {
      HasOverburdened.level = level;
    } else {
      const effect: EffectEntry = {
        name: "Overburdened",
        level: level,
        active: true,
        id: generateRandomId(),
        reset: "never",
        static: {
          description:
            "Decreases the stat modifier of attack, defense, accurate, quick, discreet and strong by",
          base_amount: 1,
          level_amount: 1,
          type: "negative",
          category: "effeact",
        },
      };
      character.effects.push(effect);
    }
  } else {
    if (HasOverburdened) {
      const new_effects = character.effects.filter(
        (item) => item.id !== HasOverburdened.id,
      );
      character.effects = new_effects;
    }
  }
}

export function HandleExhaustion(character: CharacterEntry) {
  const HasExhausted = character.effects.find(
    (ability) => ability.name === "Starving",
  );
  if (character.health.energy < 0) {
    const level = character.health.energy * -1;
    if (HasExhausted) {
      HasExhausted.level = level;
    } else {
      const effect: EffectEntry = {
        name: "Starving",
        level: level,
        active: true,
        id: generateRandomId(),
        reset: "sleeping",
        static: {
          description:
            "Each level of exhaustion gives a -1 penalty to all stats. If a stat reaches 0, then the character dies.",
          base_amount: 1,
          level_amount: 1,
          type: "negative",
          category: "effect",
        },
      };
      character.effects.push(effect);
    }
  } else {
    if (HasExhausted) {
      const new_effects = character.effects.filter(
        (item) => item.id !== HasExhausted.id,
      );
      character.effects = new_effects;
    }
  }
}

export const LowerEnergy = (character: CharacterEntry) => {
  character.health.energy -= 1;
  if (character.health.energy < 0 && character.health.energy > -10) {
    HandleExhaustion(character);
  }
};

export const RaiseEnergy = (character: CharacterEntry) => {
  if (character.health.energy === Constants.MAX_ENERGY) {
    return;
  }
  character.health.energy += 1;
  HandleExhaustion(character);
};

export function PickRandomWeapon(character: CharacterEntry) {
  const weapon_list = [];

  for (const item of character.inventory) {
    if (
      (IsWeapon(item) || item.static.category === "shield") &&
      item.equipped
    ) {
      weapon_list.push(item);
    }
  }

  if (weapon_list.length === 0) {
    return null;
  }
  const randomIndex = Math.floor(Math.random() * weapon_list.length);

  return weapon_list[randomIndex];
}

export function PickRandomArmor(
  character: CharacterEntry,
  equipment: ItemEntry[],
) {
  const armor_list = [];

  for (const item of character.inventory) {
    const item_database = GetDatabaseEquipment(item, equipment);
    if (IsArmor(item_database) && item.equipped) {
      armor_list.push(item);
    }
  }

  if (armor_list.length === 0) {
    return null;
  }
  const randomIndex = Math.floor(Math.random() * armor_list.length);

  return armor_list[randomIndex];
}

type RollComponentProps = {
  session: SessionEntry;
  character: CharacterEntry;
  websocket: Socket;
  roll_type: RollNameType;
  roll_source: string;
  roll_values: RollValueType[];
  color?: string;
  target?: number;
  difficulty: number;
  isCreature: boolean;
  inactive?: boolean;
  setModValue?: React.Dispatch<React.SetStateAction<number>>;
  modifierLock: boolean;
  is_focused: FocusedStateType;
};

export function isItemEntry(source: any): source is ItemEntry {
  return (source as ItemEntry).static.quality !== undefined;
}

export function isAbilityEntry(source: any): source is AbilityEntry {
  return (source as AbilityEntry).static.tradition !== undefined;
}

export function RollDice({
  roll_type,
  roll_source,
  roll_values,
  difficulty,
  target = 0,
  session,
  character,
  websocket,
  isCreature,
  setModValue,
  modifierLock,
  is_focused,
}: RollComponentProps) {
  // let roll = Math.floor(Math.random() * dice) + 1;

  let roll1 = random(1, GetDiceSum(roll_values));
  let roll2 = random(1, GetDiceSum(roll_values));

  const critical_type: CriticalType = {
    state: 1,
    result: random(1, 6),
  };

  let result1 = roll1;
  let result2 = roll2;

  let success = false;

  if (is_focused === "focused" && (result1 <= target || result2 <= target)) {
    success = true;
    if (roll1 === 1 || roll2 === 1) {
      critical_type.state = 2;
    } else if (roll1 === 20 && roll2 === 20) {
      critical_type.state = 0;
    }
  } else if (is_focused === "focused" && result1 > target && result2 > target) {
    success = false;
    if (roll1 === 20 && roll2 === 20) {
      critical_type.state = 0;
    }
  } else if (
    is_focused === "unfocused" &&
    (result1 > target || result2 > target)
  ) {
    success = false;
    if (roll1 === 20 || roll2 === 20) {
      critical_type.state = 0;
    } else if (roll1 === 1 && roll2 === 1) {
      critical_type.state = 2;
    }
  } else if (result1 <= target && roll1 !== 20) {
    success = true;
    if (roll1 === 1) {
      critical_type.state = 2;
    }
  } else {
    success = false;
    if (roll1 === 20) {
      critical_type.state = 0;
    }
  }

  if (roll_type === "attack" && HasRangedWeapon(character)) {
    if (!HasAmmunition(character, true)) {
      return;
    }
  }

  const roll_entry: RollEntry = {
    result1: result1,
    result2: result2,
    roll1: roll1,
    roll2: roll2,
    critical: critical_type,
    target: target,
    success: success,
    difficulty: difficulty,
    roll_values: roll_values,
  };

  const NewCombatEntry: CombatEntry = {
    character,
    roll_type,
    roll_source, // Short Sword, Medium Armor, Skill Test,
    is_focused,
    roll_entry,
    uuid: uuidv4(),
    entry: "CombatEntry",
    durability: [],
  };

  session.combatlog.push(NewCombatEntry);
  session.combatlog = session.combatlog.slice(-20);

  if (setModValue) {
    if (!modifierLock) {
      setModValue(0);
    }
  }

  ResetEffects(character, roll_type);

  update_session(session, websocket, character, isCreature);
}

export function UsedResources(session: SessionEntry): number {
  let total_resources_spent =
    session.travel.corruption_gain + session.travel.damage_gain;
  let total_resources = 0;

  for (const character of session.characters) {
    total_resources += GetMaxToughness(character);
    total_resources += GetTemporaryCorruption(character);
  }

  const resources_percent = (total_resources_spent / total_resources) * 100;

  return Math.round(resources_percent);
}

export function calculateDurabilityPercentage(usedResources: number): number {
  const resourceUsedStart = 0; // The final value will be between this number and resourceUsedEnd.
  const resourceUsedEnd = 75; // This is the the resource loss % which the players need to hit to reach the cap. The is a way of defining a worst case scenario.
  const durabilityCap = 50; // The chance an items loses durability can never exceed this % number. And will be a linear transformation from resourceUsedStart to resourceUsedEnd.

  // Ensure the value is within the range
  if (usedResources < 0) usedResources = resourceUsedStart;
  if (usedResources > resourceUsedEnd) usedResources = resourceUsedEnd;

  // Calculate the slope (m) of the linear transformation
  const m = durabilityCap / (resourceUsedEnd - resourceUsedStart);

  // Calculate the percentage
  const percentage = m * (usedResources - resourceUsedStart);

  return Math.round(percentage);
}

export function DurabilityReport(session: SessionEntry): ItemEntry[] {
  const item_damaged: ItemEntry[] = [];

  const usedResources = UsedResources(session); // The % of resources used by the players.
  const durability_percentage = calculateDurabilityPercentage(usedResources);

  for (const character of session.characters) {
    for (const item of character.inventory) {
      const durability_roll = random(1, 100);
      if (durability_roll <= durability_percentage && item.durability > 0) {
        console.log(
          item.name +
            " durability loss - roll: " +
            durability_roll +
            "<=" +
            durability_percentage,
        );
        item.durability -= 1;
        item.owner = character.name;
        item_damaged.push(item);
      }
    }
  }
  return item_damaged;
}

export function GetItemPrice(item: ItemEntry): number {
  let total_price = item.static.cost;
  const max_durability = item.static.roll.find(
    (roll) => roll.source === "base",
  );
  if (max_durability) {
    const current_durability = item.durability;
    console.log("Max Durability: " + max_durability);
    console.log("Current Durability: " + current_durability);

    total_price =
      item.static.cost * (current_durability / max_durability.value);
    console.log(total_price);
  }

  return Math.round(total_price);
}

export function GetItemListPrice(items: ItemEntry[]): number {
  let total_price = 0;
  for (const item of items) {
    total_price += Math.ceil(GetItemPrice(item) / 2);
  }
  return total_price;
}
