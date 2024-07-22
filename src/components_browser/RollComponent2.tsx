import {
  faAnglesDown,
  faAnglesUp,
  faStarOfLife,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { mdiShield, mdiSwordCross } from "@mdi/js";
import Icon from "@mdi/react";
import { Socket } from "socket.io-client";
import * as Constants from "../Constants";
import "../Styles.css";
import {
  ActiveStateType,
  AdvantageType,
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
  advantage: AdvantageType;
  activeState: ActiveStateType;
  setActiveState: React.Dispatch<React.SetStateAction<ActiveStateType>>;
  setAdvantage: React.Dispatch<React.SetStateAction<AdvantageType>>;
  setCriticalState: React.Dispatch<React.SetStateAction<boolean>>;
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
  advantage,
  activeState,
  setActiveState,
  setAdvantage,
  setCriticalState,
}: RollComponentProps) {
  const is_possible =
    (advantage === "flanked" &&
      (roll_type === "defense" || roll_type === "armor")) ||
    (advantage === "flanking" &&
      (roll_type === "attack" || roll_type === "damage")) ||
    advantage === "";

  if (!is_possible) {
    console.log("RollComponent: advantage not possible", advantage, roll_type);
  }

  return (
    <>
      <div className="vertical-divider bg--primary-1" />
      <div
        className="button border-radius--none"
        onClick={
          is_possible
            ? () =>
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
                  advantage,
                  activeState,
                  setActiveState,
                  setAdvantage,
                  setCriticalState,
                  modifierLock: false,
                })
            : () => {}
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
          {dice.map((die, index) => "d" + die).join("+")}
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
            <Icon path={mdiSwordCross} size={0.6} color={Constants.COLOR_1} />
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
          ) : (
            <Icon path={mdiSwordCross} size={0.6} color={Constants.COLOR_1} />
          )}
          {activeState === "full" ? (
            <FontAwesomeIcon
              icon={faAnglesUp}
              color={Constants.WIDGET_PRIMARY_FONT}
              style={{ fontSize: "14px" }}
            />
          ) : activeState === "weak" ? (
            <FontAwesomeIcon
              icon={faAnglesDown}
              color={Constants.WIDGET_PRIMARY_FONT}
              style={{ fontSize: "14px" }}
            />
          ) : null}
        </div>
      </div>
    </>
  );
}

export default RollComponent;
