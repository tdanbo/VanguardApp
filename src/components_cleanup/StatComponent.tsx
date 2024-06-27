import {
  faMinus,
  faPlus,
  faAnglesUp,
  faAnglesDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SetStateAction, useEffect, useState } from "react";
import { Socket } from "socket.io-client";

import * as Constants from "../Constants";

import { RollDice } from "../functions/UtilityFunctions";
import {
  ActiveStateType,
  AdvantageType,
  CharacterEntry,
  RollTypeEntry,
  SessionEntry,
} from "../Types";
import { toTitleCase } from "../functions/UtilityFunctions";
import { GetGameData } from "../contexts/GameContent";
import { mdiArrowCollapse, mdiArrowExpand } from "@mdi/js";
import { Icon } from "@mdi/react";
import { GetAttackStat, GetDefenseStat } from "../functions/CharacterFunctions";

interface Props {
  stat_name: RollTypeEntry;
  stat_value: number;
  stat_modifier: number;
  active?: boolean;
  stat_color: string;
  session: SessionEntry;
  character: CharacterEntry;
  websocket: Socket;
  isCreature: boolean;
  advantage: AdvantageType;
  activeState: ActiveStateType;
  setActiveState: React.Dispatch<React.SetStateAction<ActiveStateType>>;
  setAdvantage: React.Dispatch<SetStateAction<AdvantageType>>;
  setCriticalState: React.Dispatch<React.SetStateAction<boolean>>;
  modifierLock: boolean;
  impeded: boolean;
}

function StatComponent({
  stat_name,
  stat_value,
  stat_modifier,
  session,
  character,
  websocket,
  isCreature,
  advantage,
  activeState,
  setActiveState,
  setAdvantage,
  setCriticalState,
  modifierLock,
}: Props) {
  const { equipment } = GetGameData();
  const [modValue, setModvalue] = useState<number>(0);

  const handleAddValue = () => {
    const newValue = modValue + 1;
    setModvalue(newValue);
  };

  const handleSubValue = () => {
    const newValue = modValue - 1;
    setModvalue(newValue);
  };

  useEffect(() => {
    if (!modifierLock) {
      setModvalue(0);
    }
  }, [modifierLock]);

  let flanked = 0;
  if (advantage === "flanking" && stat_name === "attack") {
    flanked += 2;
  } else if (advantage === "flanked" && stat_name === "defense") {
    flanked -= 2;
  } else {
    flanked = 0;
  }
  let color = Constants.WIDGET_SECONDARY_FONT;
  if (["attack", "defense", "casting", "sneaking"].includes(stat_name)) {
    color = Constants.TYPE_COLORS[stat_name];
  }

  const ModifierConverter: Record<number, number> = {
    30: -20,
    29: -19,
    28: -18,
    27: -17,
    26: -16,
    25: -15,
    24: -14,
    23: -13,
    22: -12,
    21: -11,
    20: -10,
    19: -9,
    18: -8,
    17: -7,
    16: -6,
    15: -5,
    14: -4,
    13: -3,
    12: -2,
    11: -1,
    10: 0,
    9: 1,
    8: 2,
    7: 3,
    6: 4,
    5: 5,
    4: 6,
    3: 7,
    2: 8,
    1: 9,
  };

  const valueTitle: string =
    ModifierConverter[Math.max(stat_value + modValue + flanked, 1)].toString();

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="row empty_color"
      style={{ padding: "2px", gap: "2px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="column base_color"
        title={isHovered ? "Dice Modifier" : "Stat Modifier"}
        style={{
          maxWidth: "30px",
          minWidth: "30px",
          fontSize: "20px",
          alignContent: "center",
          justifyContent: "center",
          gap: "6px",
          color: isHovered
            ? Constants.WIDGET_PRIMARY_FONT
            : Constants.WIDGET_SECONDARY_FONT_INACTIVE,
        }}
      >
        {modValue !== 0 ? (modValue > 0 ? `+${modValue}` : modValue) : ""}
      </div>

      {/* {modValue === 0 ? (
          <>
            {stat_name === GetAttackStat(character) ? (
              <FontAwesomeIcon
                icon={faCrosshairs}
                color={stat_color}
                style={{ fontSize: "17px" }}
              />
            ) : null}
            {stat_name === GetDefenseStat(character) ? (
              <FontAwesomeIcon
                icon={faShield}
                color={stat_color}
                style={{ fontSize: "17px" }}
              />
            ) : null}
            {stat_name === "resolute" ? (
              <FontAwesomeIcon
                icon={faSkull}
                color={stat_color}
                style={{ fontSize: "17px" }}
              />
            ) : null}
            {stat_name === "discreet" ? (
              <FontAwesomeIcon
                icon={faEye}
                color={stat_color}
                style={{ fontSize: "17px" }}
              />
            ) : null}
            {stat_name === "defense" ? (
              <FontAwesomeIcon
                icon={faShield}
                color={stat_color}
                style={{ fontSize: "17px" }}
              />
            ) : null}
            {stat_name === "attack" ? (
              <FontAwesomeIcon
                icon={faCrosshairs}
                color={stat_color}
                style={{ fontSize: "17px" }}
              />
            ) : null}
          </>
        ) : (
          <div>
            {modValue > 0 ? "+" : ""}
            {modValue}
          </div>
        )} */}

      <div className="row" style={{ gap: "0px" }}>
        {!isHovered ? (
          <div
            className=" empty_color"
            style={{
              maxWidth: "25px",
              minWidth: "25px",
              border: `1px solid #191c1b`,
            }}
          />
        ) : null}
        <div
          className="row empty_color button"
          style={{
            maxWidth: "25px",
            minWidth: "25px",
            fontSize: "20px",
            visibility: isHovered ? "visible" : "hidden",
          }}
          onClick={handleSubValue}
        >
          <FontAwesomeIcon
            icon={faMinus}
            color={Constants.WIDGET_SECONDARY_FONT_INACTIVE}
            style={{ fontSize: "12px" }}
          />
        </div>

        <div
          className="column"
          style={{
            fontSize: "14px",
            gap: "0px",
            alignItems: "center",
            justifyContent: "center",
            padding: "5px",
          }}
        >
          <div
            style={{
              color: Constants.WIDGET_PRIMARY_FONT,
              textShadow: "2px 2px 2px black",
              fontSize: "16px",
              position: "absolute",
              marginBottom:
                stat_name === "defense" || stat_name === "attack"
                  ? "15px"
                  : "0px",
            }}
          >
            {toTitleCase(stat_name)}
          </div>
          <div
            style={{
              fontSize: "10px",
              marginTop: "20px",
              textShadow: "0px 0px 0px black",
              position: "absolute",

              color: Constants.WIDGET_SECONDARY_FONT,
            }}
          >
            {stat_name === "attack"
              ? GetAttackStat(character).toUpperCase()
              : stat_name === "defense"
              ? GetDefenseStat(character).toUpperCase()
              : null}
          </div>
        </div>

        <div
          className="row empty_color button"
          style={{
            maxWidth: "25px",
            minWidth: "25px",
            fontSize: "20px",
            visibility: isHovered ? "visible" : "hidden",
          }}
          onClick={handleAddValue}
        >
          <FontAwesomeIcon
            icon={faPlus}
            color={Constants.WIDGET_SECONDARY_FONT_INACTIVE}
            style={{ fontSize: "12px" }}
          />
        </div>
      </div>
      {activeState === "full" ? (
        <FontAwesomeIcon
          icon={faAnglesUp}
          color={Constants.WIDGET_PRIMARY_FONT}
          style={{ fontSize: "14px", paddingTop: "20px" }}
        />
      ) : activeState === "weak" ? (
        <FontAwesomeIcon
          icon={faAnglesDown}
          color={Constants.WIDGET_PRIMARY_FONT}
          style={{ fontSize: "14px", paddingTop: "20px" }}
        />
      ) : null}
      {!isHovered ? (
        <div
          style={{
            minWidth: "25px",
            fontSize: "18px",
            color: Constants.WIDGET_SECONDARY_FONT_INACTIVE,
          }}
        >
          {!isHovered
            ? `${
                stat_modifier + flanked > 0
                  ? `+${stat_modifier + flanked}`
                  : stat_modifier + flanked < 0
                  ? stat_modifier + flanked
                  : ""
              }`
            : `${modValue > 0 ? "+" : ""}${modValue}`}
        </div>
      ) : null}
      <div
        className="column button button_color"
        style={{
          maxWidth: "30px",
          minWidth: "30px",
          fontSize: "20px",
          alignContent: "center",
          justifyContent: "center",
          color: isHovered
            ? Constants.WIDGET_PRIMARY_FONT
            : Constants.WIDGET_SECONDARY_FONT,
          gap: "0px",
        }}
        title={isCreature ? valueTitle : "Click To Roll"}
        onClick={() =>
          RollDice({
            session: session,
            character: character,
            websocket: websocket,
            roll_type: stat_name,
            roll_source: "Skill Test",
            isCreature: isCreature,
            dice: 20,
            dice_mod: modValue,
            color: color,
            target: Math.max(
              stat_value + stat_modifier + modValue + flanked,
              1,
            ),
            setModValue: setModvalue,
            advantage: advantage,
            activeState: activeState,
            setActiveState: setActiveState,
            setAdvantage: setAdvantage,
            setCriticalState: setCriticalState,
            equipment,
            modifierLock,
          })
        }
      >
        {isHovered
          ? Math.max(stat_value + stat_modifier + modValue + flanked, 1)
          : Math.max(stat_value, 1)}
        <div className="row" style={{ maxHeight: "0px", gap: "0px" }}>
          {advantage === "flanking" && stat_name === "attack" ? (
            <Icon
              path={mdiArrowCollapse}
              size={0.7}
              style={{ fontSize: "14px", paddingTop: "20px" }}
            />
          ) : advantage === "flanked" && stat_name === "defense" ? (
            <Icon
              path={mdiArrowExpand}
              size={0.7}
              style={{ fontSize: "14px", paddingTop: "20px" }}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default StatComponent;
