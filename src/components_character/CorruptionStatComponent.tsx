import styled from "styled-components";
import * as Constants from "../Constants";
import { CharacterEntry, SessionEntry } from "../Types";
import {
  GetAbilityCorruption,
  GetEquipmentCorruption,
} from "../functions/RulesFunctions";
import { update_session } from "../functions/SessionsFunctions";
interface ColumnProps {
  width: string;
}

interface DivProps {
  height: string;
}

const Column = styled.div<ColumnProps>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 2px;
  overflow: scroll;
  scrollbar-width: none !important;
  width: ${(props) => props.width};
`;

const Row = styled.div<DivProps>`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  border 1px solid ${Constants.WIDGET_BORDER};
  border-radius: ${Constants.BORDER_RADIUS};
  max-height: ${(props) => props.height};
  height: ${(props) => props.height};
`;

interface ButtonProps {
  fontSize: string;
}

const Modifier = styled.button<ButtonProps>`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: bold;
  color: ${Constants.WIDGET_SECONDARY_FONT};
  border: 1px solid ${Constants.WIDGET_BORDER};
  background-color: ${Constants.WIDGET_BACKGROUND};
  width: 50%;
  h1,
  h2 {
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
  h1 {
    font-weight: bold;
    font-size: ${(props) => props.fontSize};
  }
  h2 {
    display: none;
    font-size: ${(props) => props.fontSize};
  }
  &:hover h1 {
    display: none;
  }
  &:hover h2 {
    display: flex;
  }
`;

interface BgColor {
  $bgcolor: string;
  $isFirst?: boolean;
  $isLast?: boolean;
}
const TickBar = styled.div<BgColor>`
  display: flex;
  flex-grow: 1;
  background-color: ${(props) => props.$bgcolor};
  border-right: 1px solid ${Constants.WIDGET_BORDER};
  border-top: 1px solid ${Constants.WIDGET_BORDER};
  border-bottom: 1px solid ${Constants.WIDGET_BORDER};
  cursor: pointer;
  border-radius: ${Constants.BORDER_RADIUS};
  border-top-left-radius: ${(props) =>
    props.$isFirst ? Constants.BORDER_RADIUS : "0"};
  border-bottom-left-radius: ${(props) =>
    props.$isFirst ? Constants.BORDER_RADIUS : "0"};
  border-top-right-radius: ${(props) =>
    props.$isLast ? Constants.BORDER_RADIUS : "0"};
  border-bottom-right-radius: ${(props) =>
    props.$isLast ? Constants.BORDER_RADIUS : "0"};
  border-left: ${(props) =>
    props.$isFirst ? "1px solid " + Constants.WIDGET_BORDER : "0"};
`;

const Divider = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  width: 2px;
  height: 16px;
  margin: 0px 4px 0px 4px;
`;

const Plus = styled.button`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: bold;
  color: ${Constants.WIDGET_SECONDARY_FONT};
  border-top-right-radius: ${Constants.BORDER_RADIUS};
  border-bottom-right-radius: ${Constants.BORDER_RADIUS};
  border-top: 1px solid ${Constants.WIDGET_BORDER};
  border-right: 1px solid ${Constants.WIDGET_BORDER};
  border-bottom: 1px solid ${Constants.WIDGET_BORDER};
  border-left: 0px solid ${Constants.WIDGET_BORDER};
  background-color: ${Constants.WIDGET_BACKGROUND};
  max-width: 30px;
`;

const Minus = styled.button`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: bold;
  color: ${Constants.WIDGET_SECONDARY_FONT};
  border-top-left-radius: ${Constants.BORDER_RADIUS};
  border-bottom-left-radius: ${Constants.BORDER_RADIUS};
  border-top: 1px solid ${Constants.WIDGET_BORDER};
  border-right: 0px solid ${Constants.WIDGET_BORDER};
  border-bottom: 1px solid ${Constants.WIDGET_BORDER};
  border-left: 1px solid ${Constants.WIDGET_BORDER};
  background-color: ${Constants.WIDGET_BACKGROUND};
  max-width: 30px;
`;

import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Socket } from "socket.io-client";
import { GetGameData } from "../contexts/GameContent";

interface HealthBoxProps {
  character: CharacterEntry;
  session: SessionEntry;
  websocket: Socket;
  isCreature: boolean;
  browser: boolean;
}

function CorruptionStatComponent({
  character,
  session,
  websocket,
  isCreature,
  browser,
}: HealthBoxProps) {
  const { equipment, abilities } = GetGameData();

  const handleAddCorruption = () => {
    const corruptionThreshold = Math.ceil(character.stats.resolute.value / 2);

    const value_step = 1;

    if (character.health.corruption === corruptionThreshold * 3) {
      console.log("Max corruption reached");
    } else {
      character.health.corruption += value_step;
    }
    update_session(session, websocket, character, isCreature);
  };

  const handleSubCorruption = () => {
    const value_step = 1;

    if (character.health.corruption === 0) {
      console.log("Min corruption reached");
    } else {
      character.health.corruption -= value_step;
    }
    update_session(session, websocket, character, isCreature);
  };

  const handleTempAddCorruption = () => {
    const corruptionThreshold = Math.ceil(character.stats.resolute.value / 2);
    let value = 1;
    for (let i = 0; i < value; i++) {
      if (character.health.shield === corruptionThreshold) {
        if (character.health.corruption === corruptionThreshold * 3) {
          console.log("Max corruption reached");
        }
        character.health.corruption += 1;
      } else {
        character.health.shield += 1;
      }
    }
    update_session(session, websocket, character, isCreature);
  };

  const handleTempSubCorruption = () => {
    let value = 1;
    character.health.shield -= value;

    if (character.health.shield < 0) {
      character.health.shield = 0;
    }
    update_session(session, websocket, character, isCreature);
  };

  const corruptionThreshold = Math.ceil(character.stats.resolute.value / 2);
  const maxCorruptionPermanent = corruptionThreshold * 3;
  const corruptionRulesAdjustment =
    GetEquipmentCorruption(character, equipment) +
    GetAbilityCorruption(character, abilities);

  const remaining_corruption =
    maxCorruptionPermanent -
    character.health.corruption -
    corruptionRulesAdjustment;
  const temporary_corruption = character.health.shield;
  const clean_corruption = corruptionThreshold - temporary_corruption;

  return (
    <Column width={browser ? "50%" : "100%"}>
      <Row height={browser ? "50%" : "75%"}>
        <div style={{ display: "flex", minWidth: "50%" }}>
          {[...Array(remaining_corruption)].map((_, index, array) => (
            <TickBar
              onClick={handleAddCorruption}
              onContextMenu={(e) => {
                e.preventDefault();
                handleSubCorruption();
              }}
              key={index}
              $bgcolor={Constants.TYPE_COLORS["permanent_corruption"]}
              $isFirst={index === 0} // Apply rounded corners on the left for the first item
              $isLast={index === array.length - 1}
            />
          ))}
          {[...Array(maxCorruptionPermanent - remaining_corruption)].map(
            (_, index, array) => (
              <TickBar
                onClick={handleAddCorruption}
                onContextMenu={(e) => {
                  e.preventDefault();
                  handleSubCorruption();
                }}
                key={index}
                $bgcolor={Constants.WIDGET_BACKGROUND_EMPTY}
                $isFirst={index === 0} // Apply rounded corners on the left for the first item
                $isLast={index === array.length - 1}
              />
            ),
          )}
        </div>
        <div style={{ display: "flex", minWidth: "50%" }}>
          {[...Array(clean_corruption)].map((_, index, array) => (
            <TickBar
              key={index}
              $bgcolor={Constants.TYPE_COLORS["temporary_corruption"]}
              $isFirst={index === 0} // Apply rounded corners on the left for the first item
              $isLast={index === array.length - 1}
            ></TickBar>
          ))}
          {[...Array(temporary_corruption)].map((_, index, array) => (
            <TickBar
              key={index}
              $bgcolor={Constants.WIDGET_BACKGROUND_EMPTY}
              $isFirst={index === 0} // Apply rounded corners on the left for the first item
              $isLast={index === array.length - 1}
            />
          ))}
        </div>
      </Row>
      <Row height={browser ? "50%" : "25%"}>
        <Minus className="button-hover" onClick={handleTempAddCorruption}>
          <FontAwesomeIcon icon={faMinus} />
        </Minus>
        <Modifier fontSize={browser ? "16px" : "20px"}>
          <h1>{remaining_corruption}</h1>
          <h2>
            {remaining_corruption}
            <Divider></Divider>

            {maxCorruptionPermanent}
          </h2>
        </Modifier>
        <Modifier fontSize={browser ? "16px" : "20px"}>
          <h1>{clean_corruption}</h1>
          <h2>
            {clean_corruption}

            <Divider></Divider>
            {corruptionThreshold}
          </h2>
        </Modifier>
        <Plus className="button-hover" onClick={handleTempSubCorruption}>
          <FontAwesomeIcon icon={faPlus} />
        </Plus>
      </Row>
    </Column>
  );
}

export default CorruptionStatComponent;
