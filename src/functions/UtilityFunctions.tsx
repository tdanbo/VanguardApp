import { uniqueId } from "lodash";
import { Socket } from "socket.io-client";
import styled from "styled-components";
import * as Constants from "../Constants";
import {
  AbilityEntry,
  ActiveStateType,
  AdvantageType,
  CharacterEntry,
  EffectEntry,
  ItemEntry,
  SessionEntry,
} from "../Types";
import RollComponent from "../components_general/RollComponent";

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
  entry: ItemEntry | AbilityEntry | EffectEntry;
  effect: string;
  websocket: Socket;
  character: CharacterEntry;
  session: SessionEntry;
  isCreature: boolean;
  activeState: ActiveStateType;
  advantage: AdvantageType;
  setActiveState: React.Dispatch<React.SetStateAction<ActiveStateType>>;
  setAdvantage: React.Dispatch<React.SetStateAction<AdvantageType>>;
}

const DiceButton = styled.button`
  cursor: pointer;
  font-weight: bold;
  background-color: transparent;
  border: 0px solid ${Constants.WIDGET_BORDER};
`;

export const StyledText: React.FC<StyledTextProps> = ({
  effect,
  websocket,
  character,
  session,
  isCreature,
  activeState,
  advantage,
  setActiveState,
  setAdvantage,
}) => {
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
      const key = `${part}-${partIndex}`;
      const keyB = `${part}-${partIndex}B`;
      const isSpecialWord = Constants.SPECIAL_WORDS.includes(part);
      const isDiceWord = ["d4", "d6", "d8", "d10", "d12", "d20"].includes(part);

      if (isDiceWord) {
        return (
          <DiceButton key={uniqueId()}>
            <RollComponent
              session={session}
              character={character}
              websocket={websocket}
              roll_type={"custom"}
              roll_source={part}
              isCreature={isCreature}
              dice={parseInt(part.substring(1))}
              color={Constants.TYPE_COLORS["custom"]}
              key={key}
              activeState={activeState}
              advantage={advantage}
              setActiveState={setActiveState}
              setAdvantage={setAdvantage}
            />
          </DiceButton>
        );
      }

      return (
        <span key={keyB} style={isSpecialWord ? style : undefined}>
          {part}
        </span>
      );
    });
  };

  const words = effect.split(/(\s+)/).map((word, index) => {
    const key = `${word}-${index}`;
    return <span key={key}>{getStyledWords(word, index)}</span>;
  });

  return <div>{words}</div>;
};

export function UpdateStaticEffects(
  effects: EffectEntry[],
  effects_content: EffectEntry[],
) {
  for (const effect of effects) {
    const content_static_effect = effects_content.find(
      (entry) => entry.name === effect.name,
    );
    if (content_static_effect) {
      effect.static = content_static_effect.static;
    }
  }
}

export function UpdateStaticAbilities(
  abilities: AbilityEntry[],
  abilities_content: AbilityEntry[],
) {
  for (const ability of abilities) {
    const content_static_ability = abilities_content.find(
      (entry) => entry.name === ability.name,
    );
    if (content_static_ability) {
      ability.static = content_static_ability.static;
    }
  }
}

export function UpdateStaticEquipment(
  equipment: ItemEntry[],
  equipment_content: ItemEntry[],
) {
  for (const item of equipment) {
    const content_static_item = equipment_content.find(
      (entry) => entry.name === item.name,
    );
    if (content_static_item) {
      item.static = content_static_item.static;
    }
  }
}
