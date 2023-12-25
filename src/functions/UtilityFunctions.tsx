import * as Constants from "../Constants";
import styled from "styled-components";
import {
  ItemEntry,
  AbilityEntry,
  CharacterEntry,
  SessionEntry,
} from "../Types";
import { Socket } from "socket.io-client";
import { useRoll } from "../functions/CombatFunctions";

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
  entry: ItemEntry | AbilityEntry;
  effect: string;
  websocket: Socket;
  character: CharacterEntry;
  session: SessionEntry;
  isCreature: boolean;
}

interface DiceButtonProps {
  color: string;
}

const DiceButton = styled.button<DiceButtonProps>`
  border-radius: ${Constants.BORDER_RADIUS};
  cursor: pointer;
  font-weight: bold;
  background-color: ${Constants.WIDGET_BACKGROUND};

  color: ${(props) => props.color};
  border: 1px solid ${Constants.WIDGET_BORDER};
`;

export const StyledText: React.FC<StyledTextProps> = ({
  entry,
  effect,
  websocket,
  character,
  session,
  isCreature,
}) => {
  const onRollDice = useRoll();

  const style = { color: Constants.WIDGET_PRIMARY_FONT, fontWeight: "bold" }; // Example style
  // Updated escapeRegExp function
  const escapeRegExp = (word: string) => word.replace(/(\+)?[+]/g, "\\$&");

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

    const handleRoll = (part: string) => {
      const dice = parseInt(part.substring(1));
      onRollDice({
        websocket,
        dice: dice,
        modifier: 0,
        count: 1,
        target: 0,
        source: entry.name,
        active: entry.type,
        add_mod: true,
        character,
        session,
        isCreature,
      });
    };

    return fragment.split(regex).map((part, partIndex) => {
      const key = `${part}-${partIndex}`;
      const isSpecialWord = Constants.SPECIAL_WORDS.includes(part);
      const isDiceWord = ["d4", "d6", "d8", "d10", "d12", "d20"].includes(part);

      if (isDiceWord) {
        return (
          <DiceButton
            color={Constants.TYPE_COLORS[entry.type.toLowerCase()]}
            key={key}
            onClick={() => handleRoll(part)}
            className="button-hover"
          >
            {part}
          </DiceButton>
        );
      }

      return (
        <span key={key} style={isSpecialWord ? style : undefined}>
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
