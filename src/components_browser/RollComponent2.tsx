import {
  faAnglesDown,
  faAnglesUp,
  faStarOfLife,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { mdiShield, mdiSwordCross } from "@mdi/js";
import Icon from "@mdi/react";
import { random } from "lodash";
import { Socket } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import * as Constants from "../Constants";
import "../Styles.css";
import {
  ActiveStateType,
  AdvantageType,
  CharacterEntry,
  CombatEntry,
  CriticalType,
  ItemEntry,
  RollEntry,
  RollTypeEntry,
  SessionEntry,
} from "../Types";
import { update_session } from "../functions/SessionsFunctions";
import { toTitleCase } from "../functions/UtilityFunctions";

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
};

function RollComponent({
  roll_type,
  roll_source,
  dice,
  dice_mod = 0,
  color = Constants.WIDGET_SECONDARY_FONT,
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
  item,
}: RollComponentProps) {
  const RollDIce = () => {
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
    } else if (activeState === "full" && result1 > target && result2 > target) {
      success = false;
      if (roll1 === 20 && roll2 === 20) {
        critical_type.state = 0;
      }
    } else if (
      activeState === "weak" &&
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

    // let success = true;
    // if (target !== 0 && result > target) {
    //   success = false;
    // }

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

    const NewCombatEntry: CombatEntry = {
      character,
      roll_type,
      roll_source, // Short Sword, Medium Armor, Skill Test,
      roll_state,
      roll_entry,
      uuid: uuidv4(),
      entry: "CombatEntry",
      durability: [],
    };

    session.combatlog.push(NewCombatEntry);
    session.combatlog = session.combatlog.slice(-20);

    if (setModValue) {
      if (!["attack", "defense", "casting", "sneaking"].includes(roll_type))
        setModValue(0);
    }

    setActiveState("");
    setAdvantage("");
    setCriticalState(false);

    update_session(session, websocket, character, isCreature);
  };

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
        onClick={is_possible ? () => RollDIce() : () => {}}
        title={"Roll " + toTitleCase(roll_type)}
      >
        <div
          className="row"
          style={{
            fontSize: "14px",
            fontWeight: "bold",
          }}
        >
          d{dice}
          {dice_mod > 0 && roll_source !== "Skill Test" ? `+${dice_mod}` : null}
        </div>
        <div
          className="row"
          style={{
            color: "rgba(255, 255, 255, 0.2)",
            fontSize: "10px",
            gap: "3px",
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
