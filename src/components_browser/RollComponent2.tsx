import {
  faAnglesDown,
  faAnglesUp,
  faStarOfLife,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { mdiShield, mdiSwordCross, mdiPlusThick } from "@mdi/js";
import Icon from "@mdi/react";
import { Socket } from "socket.io-client";
import * as Constants from "../Constants";
import "../Styles.css";
import {
  CharacterEntry,
  ItemEntry,
  RollTypeEntry,
  SessionEntry,
} from "../Types";
import { toTitleCase } from "../functions/UtilityFunctions";
import { RollDice } from "../functions/UtilityFunctions";

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
  setModValue,
}: RollComponentProps) {
  return (
    <>
      <div className="vertical-divider bg--primary-1" />
      <div
        className="button border-radius--none"
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
        title={"Roll " + toTitleCase(roll_type)}
      >
        <div
          className="row"
          style={{
            fontSize: "14px",
            fontWeight: "bold",
          }}
        >
          {dice.map((die, index) => die).join("+")}
          {dice_mod > 0 && roll_source !== "Skill Test" ? `+${dice_mod}` : null}
        </div>
        <div
          className="row"
          style={{
            color: "rgba(255, 255, 255, 0.2)",
            fontSize: "10px",
            gap: "5px",
          }}
        >
          {roll_type === "damage" ? (
            <FontAwesomeIcon
              icon={faStarOfLife}
              color={Constants.COLOR_1}
              style={{ fontSize: "12px" }}
            />
          ) : roll_type === "armor" ? (
            <Icon path={mdiShield} size={0.6} color={Constants.COLOR_2} />
          ) : roll_type === "ability" ||
            roll_type === "mystical power" ||
            roll_type === "utility" ||
            roll_type === "monsterous trait" ? (
            <FontAwesomeIcon
              icon={faStarOfLife}
              color={color}
              style={{ fontSize: "12px" }}
            />
          ) : roll_type === "buff" ? (
            <Icon
              path={mdiPlusThick}
              size={0.75}
              color={Constants.WIDGET_SECONDARY_FONT_INACTIVE}
            />
          ) : (
            <Icon path={mdiSwordCross} size={0.6} color={Constants.COLOR_1} />
          )}
        </div>
      </div>
    </>
  );
}

export default RollComponent;
