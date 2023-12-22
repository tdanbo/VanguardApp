import styled from "styled-components";
import * as Constants from "../Constants";
import { CharacterEntry, SessionEntry } from "../Types";
import { update_session } from "../functions/SessionsFunctions";

interface ColumnProps {
  width: string;
}

const Container = styled.div<ColumnProps>`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  gap: 2px;
  width: ${(props) => props.width};
`;

interface DivProps {
  height: string;
}

const Row = styled.div<DivProps>`
  display: flex;
  flex-grow: 1;
  flex-basis: 0;
  flex-direction: row;
  border 1px solid ${Constants.WIDGET_BORDER};
  border-radius: ${Constants.BORDER_RADIUS};
  max-height: ${(props) => props.height};
  height: ${(props) => props.height};
`;

const ValueBoxRight = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  user-select: none;
  align-items: center;
  justify-content: center;
  background-color: ${Constants.WIDGET_BACKGROUND};
  color: ${Constants.WIDGET_PRIMARY_FONT};
  border: 1px solid ${Constants.WIDGET_BORDER};
  cursor: pointer;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: ${Constants.BORDER_RADIUS};
  border-bottom-right-radius: ${Constants.BORDER_RADIUS};
  font-weight: bold;
  font-size: 20px;
`;

interface BgColor {
  $bgcolor: string;
  isFirst?: boolean;
  isLast?: boolean;
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
    props.isFirst ? Constants.BORDER_RADIUS : "0"};
  border-bottom-left-radius: ${(props) =>
    props.isFirst ? Constants.BORDER_RADIUS : "0"};
  border-top-right-radius: ${(props) =>
    props.isLast ? Constants.BORDER_RADIUS : "0"};
  border-bottom-right-radius: ${(props) =>
    props.isLast ? Constants.BORDER_RADIUS : "0"};
  border-left: ${(props) =>
    props.isFirst ? "1px solid " + Constants.WIDGET_BORDER : "0"};
`;

const Divider = styled.div`
  display: flex;
  background-color: rgba(255, 255, 255, 0.5);
  width: 2px;
  margin: 4px;
`;

import { Socket } from "socket.io-client";

interface HealthBoxProps {
  character: CharacterEntry;
  session: SessionEntry;
  websocket: Socket;
  isCreature: boolean;
}

function CorruptionStatComponent({
  character,
  session,
  websocket,
  isCreature,
}: HealthBoxProps) {
  const handleAddCorruption = () => {
    const corruptionThreshold = Math.ceil(character.stats.resolute.value / 2);

    const value_step = 1;

    if (character.health.corruption === corruptionThreshold * 3) {
      console.log("Max corruption reached");
    } else {
      character.health.corruption += value_step;
    }
    update_session(session, character, isCreature, websocket);
  };

  const handleSubCorruption = () => {
    const value_step = 1;

    if (character.health.corruption === 0) {
      console.log("Min corruption reached");
    } else {
      character.health.corruption -= value_step;
    }
    update_session(session, character, isCreature, websocket);
  };

  const handleTempAddCorruption = () => {
    console.log("Adding corruption");
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
    update_session(session, character, isCreature, websocket);
  };

  const handleTempSubCorruption = () => {
    console.log("Subtracting corruption");
    let value = 1;
    character.health.shield -= value;

    if (character.health.shield < 0) {
      character.health.shield = 0;
    }
    update_session(session, character, isCreature, websocket);
  };

  const corruptionThreshold = Math.ceil(character.stats.resolute.value / 2);
  const maxCorruptionPermanent = corruptionThreshold * 3;

  const remaining_corruption =
    maxCorruptionPermanent - character.health.corruption;
  const temporary_corruption = character.health.shield;
  const clean_corruption = corruptionThreshold - temporary_corruption;

  return (
    <Row height={"100%"}>
      <Container width={"75%"}>
        <Row height={"70%"}>
          {[...Array(remaining_corruption)].map((_, index, array) => (
            <TickBar
              onClick={handleTempSubCorruption}
              onContextMenu={(e) => {
                e.preventDefault();
                handleTempAddCorruption();
              }}
              key={index}
              $bgcolor={Constants.TYPE_COLORS["permanent_corruption"]}
              isFirst={index === 0} // Apply rounded corners on the left for the first item
              isLast={index === array.length - 1}
            />
          ))}
          {[...Array(maxCorruptionPermanent - remaining_corruption)].map(
            (_, index, array) => (
              <TickBar
                onClick={handleTempSubCorruption}
                onContextMenu={(e) => {
                  e.preventDefault();
                  handleTempAddCorruption();
                }}
                key={index}
                $bgcolor={Constants.WIDGET_BACKGROUND_EMPTY}
                isFirst={index === 0} // Apply rounded corners on the left for the first item
                isLast={index === array.length - 1}
              />
            ),
          )}
        </Row>
        <Row height={"30%"}>
          <ValueBoxRight
            onClick={handleAddCorruption}
            onContextMenu={(e) => {
              e.preventDefault();
              handleSubCorruption();
            }}
          >
            {clean_corruption}
          </ValueBoxRight>
        </Row>
      </Container>
      <Container width={"25%"}>
        <Row height={"70%"}>
          {[...Array(clean_corruption)].map((_, index, array) => (
            <TickBar
              onClick={handleTempSubCorruption}
              onContextMenu={(e) => {
                e.preventDefault();
                handleTempAddCorruption();
              }}
              key={index}
              $bgcolor={Constants.TYPE_COLORS["casting"]}
              isFirst={index === 0} // Apply rounded corners on the left for the first item
              isLast={index === array.length - 1}
            />
          ))}
          {[...Array(temporary_corruption)].map((_, index, array) => (
            <TickBar
              onClick={handleTempSubCorruption}
              onContextMenu={(e) => {
                e.preventDefault();
                handleTempAddCorruption();
              }}
              key={index}
              $bgcolor={Constants.WIDGET_BACKGROUND_EMPTY}
              isFirst={index === 0} // Apply rounded corners on the left for the first item
              isLast={index === array.length - 1}
            />
          ))}
        </Row>
        <Row height={"30%"}>
          <ValueBoxRight
            onClick={handleAddCorruption}
            onContextMenu={(e) => {
              e.preventDefault();
              handleSubCorruption();
            }}
          >
            {clean_corruption}
          </ValueBoxRight>
        </Row>
      </Container>
    </Row>
  );
}

export default CorruptionStatComponent;
