import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

import * as Constants from "../Constants";

import {
  GetAttackStat,
  GetDefenseStat,
  HasAmmunition,
  HasRangedWeapon,
} from "../functions/CharacterFunctions";
import { RollDice, toTitleCase } from "../functions/UtilityFunctions";
import { CharacterEntry, RollTypeEntry, SessionEntry } from "../Types";

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
  modifierLock,
}: Props) {
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
    ModifierConverter[Math.max(stat_value + modValue, 1)].toString();

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="row row--card-expanding bg--primary-1 padding--small border"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {HasRangedWeapon(character) &&
      !HasAmmunition(character) &&
      stat_name === "attack" ? (
        <div
          className="row"
          style={{
            fontSize: "16px",
            color: Constants.BRIGHT_RED,
            gap: "3px",
          }}
        >
          No Ammunition
        </div>
      ) : (
        <>
          <div
            className="row bg--primary-2"
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
          <div className="row" style={{ gap: "0px" }}>
            {!isHovered ? (
              <div
                style={{
                  maxWidth: "25px",
                  minWidth: "25px",
                }}
              />
            ) : null}
            <div
              className="button button--primary"
              style={{
                maxWidth: "25px",
                minWidth: "25px",
                minHeight: "100%",
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
                    stat_modifier > 0
                      ? `+${stat_modifier}`
                      : stat_modifier < 0
                      ? stat_modifier
                      : ""
                  }`
                : `${modValue > 0 ? "+" : ""}${modValue}`}
            </div>
          ) : null}
          <div
            className="column button bg--primary-5"
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
                roll_values: [{ value: 20, source: stat_name }],
                dice_mod: modValue,
                color: color,
                target: Math.max(stat_value + stat_modifier + modValue, 1),
                setModValue: setModvalue,
                modifierLock,
              })
            }
          >
            {isHovered
              ? Math.max(stat_value + stat_modifier + modValue, 1)
              : Math.max(stat_value, 1)}
          </div>
        </>
      )}
    </div>
  );
}

export default StatComponent;
