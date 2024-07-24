import styled from "styled-components";

import { Socket } from "socket.io-client";
import * as Constants from "../Constants";
import { RollDice } from "../functions/UtilityFunctions";
import {
  CharacterEntry,
  ItemEntry,
  RollTypeEntry,
  SessionEntry,
} from "../Types";

type RollComponentProps = {
  session: SessionEntry;
  character: CharacterEntry;
  websocket: Socket;
  roll_type: RollTypeEntry;
  roll_source: string;
  dice: number[];
  dice_mod?: number;
  color?: string;
  target?: number;
  item?: ItemEntry;
  isCreature: boolean;
  inactive?: boolean;
  setModValue?: React.Dispatch<React.SetStateAction<number>>;
};

const dice_size = "25px";

type RollContainerProps = {
  color: string;
  $inactive: boolean;
  $dice_size: string;
};

const RollContainer = styled.div<RollContainerProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.$dice_size}; // Use props.dice_size
  height: ${(props) => props.$dice_size}; // Use props.dice_size
  font-weight: bold;
  font-size: 16px;
  color: ${(props) =>
    props.$inactive ? props.color : Constants.WIDGET_SECONDARY_FONT_INACTIVE};
  text-align: center;
  text-shadow: ${(props) =>
    props.$inactive ? "1px 1px 2px black" : "0px 0px 0px transparent;"};
`;

function RollComponent({
  roll_type,
  roll_source,
  dice,
  dice_mod = 0,
  color = Constants.WIDGET_SECONDARY_FONT,
  session,
  character,
  websocket,
  isCreature,
  inactive = true,
  setModValue,
}: RollComponentProps) {
  return (
    <RollContainer
      $dice_size={dice_size}
      color={color}
      title={`Roll d${dice}`}
      onClick={() =>
        RollDice({
          roll_type,
          roll_source,
          dice,
          dice_mod,
          session,
          character,
          websocket,
          isCreature,
          setModValue,
          modifierLock: false,
        })
      }
      $inactive={inactive}
    >
      d{dice}
      {dice_mod > 0 && roll_source !== "Skill Test" ? `+${dice_mod}` : null}
    </RollContainer>
  );
}

export default RollComponent;
