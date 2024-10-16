import {
  faBurst,
  faDice,
  faHeart,
  faSkull,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { mdiPlusThick, mdiShield, mdiSwordCross } from "@mdi/js";
import Icon from "@mdi/react";
import { Socket } from "socket.io-client";
import * as Constants from "../Constants";
import "../Styles.css";
import {
  CharacterEntry,
  FocusedStateType,
  RollNameType,
  RollValueType,
  SessionEntry,
} from "../Types";

import { GetDiceSum, GetDiceTitle } from "../functions/CharacterFunctions";
import { RollDice, toTitleCase } from "../functions/UtilityFunctions";

type RollComponentProps = {
  session: SessionEntry;
  character: CharacterEntry;
  websocket: Socket;
  roll_type: RollNameType;
  roll_source: string;
  roll_color: string;
  color?: string;
  target?: number;
  roll_values: RollValueType[];
  isCreature: boolean;
  inactive?: boolean;
  setModValue?: React.Dispatch<React.SetStateAction<number>>;
  is_focused: FocusedStateType;
};

function RollComponent2({
  roll_type,
  roll_source,
  roll_color,
  session,
  character,
  websocket,
  isCreature,
  setModValue,
  roll_values,
  is_focused,
}: RollComponentProps) {
  // Usage example

  const dice = GetDiceSum(roll_values);
  const roll_base_type =
    roll_values.find((rv) => rv.source === "base")?.type ?? "damage";

  return (
    <>
      <div className="vertical-divider bg--primary-1" />
      <div
        className="button border-radius--none"
        onClick={() =>
          RollDice({
            roll_type,
            roll_source,
            roll_values,
            session,
            character,
            websocket,
            isCreature,
            setModValue,
            modifierLock: false,
            is_focused,
            difficulty: 0,
          })
        }
        title={toTitleCase(GetDiceTitle(roll_values))}
      >
        <div
          className="row"
          style={{
            fontSize: "14px",
            fontWeight: "bold",
          }}
        >
          {dice}
        </div>
        <div
          className="row"
          style={{
            color: "rgba(255, 255, 255, 0.2)",
            fontSize: "10px",
            gap: "5px",
          }}
        >
          {roll_base_type === "damage" ? (
            <FontAwesomeIcon
              icon={faBurst}
              color={roll_color}
              style={{ fontSize: "12px" }}
            />
          ) : roll_base_type === "armor" ? (
            <Icon path={mdiShield} size={0.6} color={roll_color} />
          ) : roll_base_type === "healing" ? (
            <FontAwesomeIcon
              icon={faHeart}
              color={roll_color}
              style={{ fontSize: "12px" }}
            />
          ) : roll_base_type === "buff" ? (
            <Icon
              path={mdiPlusThick}
              size={0.75}
              color={Constants.WIDGET_SECONDARY_FONT_INACTIVE}
            />
          ) : roll_base_type === "corruption" ? (
            <FontAwesomeIcon
              icon={faSkull}
              color={roll_color}
              style={{ fontSize: "12px" }}
            />
          ) : roll_base_type === "general" ? (
            <FontAwesomeIcon
              icon={faDice}
              color={roll_color}
              style={{ fontSize: "12px" }}
            />
          ) : (
            <Icon path={mdiSwordCross} size={0.6} color={roll_color} />
          )}
        </div>
      </div>
    </>
  );
}

export default RollComponent2;
