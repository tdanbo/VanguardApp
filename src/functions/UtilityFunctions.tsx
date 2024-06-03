import { Socket } from "socket.io-client";
import * as Constants from "../Constants";
import { GeneralItem } from "../Types";
import { update_session } from "../functions/SessionsFunctions";
import {
  AbilityEntry,
  ActiveStateType,
  AdvantageType,
  CharacterEntry,
  EffectEntry,
  ItemEntry,
  SessionEntry,
  CriticalType,
  DurabilityEntry,
  RollEntry,
  RollTypeEntry,
  CombatEntry,
} from "../Types";
import { cloneDeep, random } from "lodash";
import { HasRangedWeapon, Ammunition } from "./CharacterFunctions";
import { SetDurability } from "./RulesFunctions";
import { v4 as uuidv4 } from "uuid";

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
  activeState: ActiveStateType;
  advantage: AdvantageType;
  setActiveState: React.Dispatch<React.SetStateAction<ActiveStateType>>;
  setAdvantage: React.Dispatch<React.SetStateAction<AdvantageType>>;
  setCriticalState: React.Dispatch<React.SetStateAction<boolean>>;
}

export const StyledText: React.FC<StyledTextProps> = ({ effect }) => {
  if (!effect) {
    return null; // or return a default value
  }
  const style = { color: Constants.WIDGET_PRIMARY_FONT, fontWeight: "bold" }; // Example style
  // Updated escapeRegExp function

  // Updated regex
  console.log(effect);
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
        <>
          <span key={keyB} style={isSpecialWord ? style : undefined}>
            {part}
          </span>
        </>
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

export function AddExhaustion(character: CharacterEntry, level: number) {
  const HasExhausted = character.effects.find(
    (ability) => ability.name === "Exhausted",
  );

  if (HasExhausted) {
    HasExhausted.level = level;
  } else {
    const effect: EffectEntry = {
      name: "Exhausted",
      level: level,
      static: {
        effect:
          "Each level of exhaustion gives a -1 penalty to all stats. If a stat reaches 0, then the character dies.",
        category: "effect",
      },
      id: generateRandomId(),
    };
    character.effects.push(effect);
  }
}

export const RemoveExhaustion = (character: CharacterEntry) => {
  const exhausted = character.effects.find(
    (effect) => effect.name === "Exhausted",
  );

  if (exhausted) {
    const new_effects = character.effects.filter(
      (item) => item.id !== exhausted.id,
    );
    character.effects = new_effects;
  }
};

export const SetStatusForward = (character: CharacterEntry) => {
  if (character.health.status === "normal") {
    character.health.status = "rested";
    RemoveExhaustion(character);
  } else if (character.health.status === "tired") {
    character.health.status = "normal";
    RemoveExhaustion(character);
  } else if (character.health.status === "fatigued") {
    character.health.status = "tired";
    RemoveExhaustion(character);
  } else if (character.health.status === "exhausted 1") {
    character.health.status = "fatigued";
    RemoveExhaustion(character);
  } else if (character.health.status === "exhausted 2") {
    character.health.status = "exhausted 1";
    AddExhaustion(character, 1);
  } else if (character.health.status === "exhausted 3") {
    character.health.status = "exhausted 2";
    AddExhaustion(character, 2);
  } else if (character.health.status === "exhausted 4") {
    character.health.status = "exhausted 3";
    AddExhaustion(character, 3);
  } else if (character.health.status === "exhausted 5") {
    character.health.status = "exhausted 4";
    AddExhaustion(character, 4);
  } else if (character.health.status === "exhausted 6") {
    character.health.status = "exhausted 5";
    AddExhaustion(character, 5);
  } else if (character.health.status === "exhausted 7") {
    character.health.status = "exhausted 6";
    AddExhaustion(character, 6);
  } else if (character.health.status === "exhausted 8") {
    character.health.status = "exhausted 7";
    AddExhaustion(character, 7);
  } else if (character.health.status === "exhausted 9") {
    character.health.status = "exhausted 8";
    AddExhaustion(character, 8);
  } else if (character.health.status === "exhausted 10") {
    character.health.status = "exhausted 9";
    AddExhaustion(character, 9);
  }
};

export const SetStatusBackward = (character: CharacterEntry) => {
  if (character.health.status === "resting") {
    character.health.status = "rested";
    RemoveExhaustion(character);
  } else if (character.health.status === "rested") {
    character.health.status = "normal";
    RemoveExhaustion(character);
  } else if (character.health.status === "normal") {
    character.health.status = "tired";
    RemoveExhaustion(character);
  } else if (character.health.status === "tired") {
    character.health.status = "fatigued";
    RemoveExhaustion(character);
  } else if (character.health.status === "fatigued") {
    character.health.status = "exhausted 1";
    AddExhaustion(character, 1);
  } else if (character.health.status === "exhausted 1") {
    character.health.status = "exhausted 2";
    AddExhaustion(character, 2);
  } else if (character.health.status === "exhausted 2") {
    character.health.status = "exhausted 3";
    AddExhaustion(character, 3);
  } else if (character.health.status === "exhausted 3") {
    character.health.status = "exhausted 4";
    AddExhaustion(character, 4);
  } else if (character.health.status === "exhausted 4") {
    character.health.status = "exhausted 5";
    AddExhaustion(character, 5);
  } else if (character.health.status === "exhausted 5") {
    character.health.status = "exhausted 6";
    AddExhaustion(character, 6);
  } else if (character.health.status === "exhausted 6") {
    character.health.status = "exhausted 7";
    AddExhaustion(character, 7);
  } else if (character.health.status === "exhausted 7") {
    character.health.status = "exhausted 8";
    AddExhaustion(character, 8);
  } else if (character.health.status === "exhausted 8") {
    character.health.status = "exhausted 9";
    AddExhaustion(character, 9);
  } else if (character.health.status === "exhausted 9") {
    character.health.status = "exhausted 10";
    AddExhaustion(character, 10);
  } else if (character.health.status === "exhausted 10") {
    character.health.status = "rested";
    RemoveExhaustion(character);
  }
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
  roll_type: RollTypeEntry;
  roll_source: string;
  dice: number;
  dice_mod?: number;
  color?: string;
  target?: number;
  item?: ItemEntry;
  isCreature: boolean;
  inactive?: boolean;
  setModValue?: React.Dispatch<React.SetStateAction<number>>;
  advantage: AdvantageType;
  activeState: ActiveStateType;
  setActiveState: React.Dispatch<React.SetStateAction<ActiveStateType>>;
  setAdvantage: React.Dispatch<React.SetStateAction<AdvantageType>>;
  setCriticalState: React.Dispatch<React.SetStateAction<boolean>>;
  equipment: ItemEntry[];
  modifierLock: boolean;
};

export function RollDice({
  roll_type,
  roll_source,
  dice,
  dice_mod = 0,
  target = 0,
  session,
  character,
  websocket,
  isCreature,
  setModValue,
  advantage,
  activeState,
  setActiveState,
  setAdvantage,
  setCriticalState,
  equipment,
  modifierLock,
}: RollComponentProps) {
  // let roll = Math.floor(Math.random() * dice) + 1;

  let roll1 = random(1, dice);
  let roll2 = random(1, dice);

  const critical_type: CriticalType = {
    state: 1,
    result: random(1, 6),
  };

  let result1 = roll1;
  let result2 = roll2;

  let roll_state = activeState;

  if (roll_source !== "Skill Test") {
    result1 += dice_mod;
    result2 += dice_mod;
  }

  let success = false;

  if (activeState === "full" && (result1 <= target || result2 <= target)) {
    success = true;
    if (roll1 === 1 || roll2 === 1) {
      critical_type.state = 2;
    } else if (roll1 === 20 && roll2 === 20) {
      critical_type.state = 0;
    }
  } else if (activeState === "weak" && (result1 > target || result2 > target)) {
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

  // let success = true;
  // if (target !== 0 && result > target) {
  //   success = false;
  // }

  if (roll_type === "attack" && HasRangedWeapon(character)) {
    if (!Ammunition(character)) {
      return;
    }
  }

  const roll_entry: RollEntry = {
    result1: result1,
    result2: result2,
    roll1: roll1,
    roll2: roll2,
    critical: critical_type,
    advantage: advantage,
    mod: dice_mod,
    target: target,
    success: success,
    dice: dice,
  };

  const durability_item: DurabilityEntry = {
    name: "",
    check: random(1, 5),
  };

  let random_item: null | ItemEntry = null;
  if (roll_type === "damage" && !success && durability_item.check === 5) {
    random_item = PickRandomWeapon(character);
  } else if (roll_type === "armor" && !success && durability_item.check === 5) {
    random_item = PickRandomArmor(character, equipment);
  }

  if (random_item) {
    SetDurability(character, random_item.id);
    durability_item.name = random_item.name;
  }

  const NewCombatEntry: CombatEntry = {
    character,
    roll_type,
    roll_source, // Short Sword, Medium Armor, Skill Test,
    roll_state,
    roll_entry,
    uuid: uuidv4(),
    entry: "CombatEntry",
    durability: durability_item,
  };

  session.combatlog.push(NewCombatEntry);
  session.combatlog = session.combatlog.slice(-20);

  if (setModValue) {
    if (!modifierLock) {
      setModValue(0);
    }
  }

  setActiveState("");
  setAdvantage("");
  setCriticalState(false);

  update_session(session, websocket, character, isCreature);
}
