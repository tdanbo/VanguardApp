import styled from "styled-components";
import * as Constants from "../Constants";
import { CharacterEntry, SessionEntry } from "../Types";
import { update_session } from "../functions/SessionsFunctions";

const Container = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  gap: 2px;
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
}

const LeftTickBar = styled.div<BgColor>`
  display: flex;
  flex-grow: 1;
  border-left: 1px solid ${Constants.WIDGET_BORDER};
  border-top: 1px solid ${Constants.WIDGET_BORDER};
  border-bottom: 1px solid ${Constants.WIDGET_BORDER};
  background-color: ${(props) => props.$bgcolor};
  cursor: pointer;
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
    const character_corruption = character.corruption;
    const corruptionThreshold = Math.ceil(character.stats.resolute.value / 2);

    const value_step = 1;

    if (character_corruption.permanent === corruptionThreshold * 3) {
      console.log("Max corruption reached");
    } else {
      character_corruption.permanent += value_step;
    }
    update_session(session, character, isCreature, websocket);
  };

  const handleSubCorruption = () => {
    const character_corruption = character.corruption;

    const value_step = 1;

    if (character_corruption.permanent === 0) {
      console.log("Min corruption reached");
    } else {
      character_corruption.permanent -= value_step;
    }
    update_session(session, character, isCreature, websocket);
  };

  const handleTempAddCorruption = () => {
    console.log("Adding corruption");
    let character_corruption = character.corruption;
    const corruptionThreshold = Math.ceil(character.stats.resolute.value / 2);
    let value = 1;
    for (let i = 0; i < value; i++) {
      if (character_corruption.temporary === corruptionThreshold) {
        if (character_corruption.permanent === corruptionThreshold * 3) {
          console.log("Max corruption reached");
        }
        character_corruption.permanent += 1;
      } else {
        character_corruption.temporary += 1;
      }
    }
    update_session(session, character, isCreature, websocket);
  };

  const handleTempSubCorruption = () => {
    console.log("Subtracting corruption");
    let character_corruption = character.corruption;
    let value = 1;
    character_corruption.temporary -= value;

    if (character_corruption.temporary < 0) {
      character_corruption.temporary = 0;
    }
    update_session(session, character, isCreature, websocket);
  };

  const corruptionThreshold = Math.ceil(character.stats.resolute.value / 2);
  const maxCorruptionPermanent = corruptionThreshold * 3;

  const remaining_corruption =
    maxCorruptionPermanent - character.corruption.permanent;
  const temporary_corruption = character.corruption.temporary;
  const clean_corruption = corruptionThreshold - temporary_corruption;

  return (
    <Row height={"100%"}>
      <Container>
        <Row height={"70%"}>
          {[...Array(remaining_corruption)].map((_, index) => (
            <LeftTickBar
              onClick={handleTempSubCorruption}
              onContextMenu={(e) => {
                e.preventDefault();
                handleTempAddCorruption();
              }}
              key={index}
              $bgcolor={Constants.TYPE_COLORS["permanent_corruption"]}
            />
          ))}
          {[...Array(maxCorruptionPermanent - remaining_corruption)].map(
            (_, index) => (
              <LeftTickBar
                onClick={handleTempSubCorruption}
                onContextMenu={(e) => {
                  e.preventDefault();
                  handleTempAddCorruption();
                }}
                key={index}
                $bgcolor={Constants.WIDGET_BACKGROUND_EMPTY}
              />
            ),
          )}
          {[...Array(clean_corruption)].map((_, index) => (
            <LeftTickBar
              onClick={handleTempSubCorruption}
              onContextMenu={(e) => {
                e.preventDefault();
                handleTempAddCorruption();
              }}
              key={index}
              $bgcolor={Constants.TYPE_COLORS["casting"]}
            />
          ))}
          {[...Array(temporary_corruption)].map((_, index) => (
            <LeftTickBar
              onClick={handleTempSubCorruption}
              onContextMenu={(e) => {
                e.preventDefault();
                handleTempAddCorruption();
              }}
              key={index}
              $bgcolor={Constants.WIDGET_BACKGROUND_EMPTY}
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
