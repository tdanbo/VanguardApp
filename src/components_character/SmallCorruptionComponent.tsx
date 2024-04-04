import styled from "styled-components";
import * as Constants from "../Constants";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { update_session } from "../functions/SessionsFunctions";
import { Socket } from "socket.io-client";
import { faSkull } from "@fortawesome/free-solid-svg-icons";
import {
  GetAbilityCorruption,
  GetEquipmentCorruption,
} from "../functions/RulesFunctions";
import { GetGameData } from "../contexts/GameContent";
import { CharacterEntry, SessionEntry } from "../Types";
interface ContainerProps {
  width: string;
}

const backgroundcolor = "rgba(19, 23, 22, 0.8)";

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  gap: 2px;
  min-width: ${(props) => props.width};
  max-width: ${(props) => props.width};
  background-color: ${backgroundcolor};
  border-radius: ${Constants.BORDER_RADIUS};
  margin: 2px;
`;
// background-image: url("/dist/assets/portrait1.jpeg");

interface DivProps {
  height: string;
}

interface ColumnProps {
  width: string;
}

const Column = styled.div<ColumnProps>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-basis: 0;
  max-width: ${(props) => props.width};
  cursor: pointer;
  user-select: none;
`;

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

const Value = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;

  color: ${Constants.WIDGET_SECONDARY_FONT};
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  color: ${Constants.WIDGET_SECONDARY_FONT_INACTIVE};
  height: 10%;
`;

const Block = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  align-items: top;
  justify-content: center;
  min-width: 30px;
  max-width: 30px;
  width: 30px;
  padding-top: 5px;
  filter: drop-shadow(1px 1px 0px ${Constants.BACKGROUND});
`;

interface CorruptionSmallComponentProps {
  session: SessionEntry;
  character: CharacterEntry;
  websocket: Socket;
  isCreature: boolean;
}

function SmallCorruptionComponent({
  character,
  session,
  websocket,
  isCreature,
}: CorruptionSmallComponentProps) {
  const { abilities, equipment } = GetGameData();

  const corruptionThreshold = Math.ceil(character.stats.resolute.value / 2);
  const maxCorruptionPermanent = corruptionThreshold * 3;
  const corruptionRulesAdjustment =
    GetEquipmentCorruption(character, equipment) +
    GetAbilityCorruption(character, abilities);

  const current_corruption =
    character.health.corruption + corruptionRulesAdjustment;

  const handleAddCorruption = () => {
    const value_step = 1;

    if (current_corruption === maxCorruptionPermanent) {
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

  return (
    <Container width={"140px"}>
      <Column
        width={"100%"}
        onClick={() => {
          handleAddCorruption();
        }}
        onContextMenu={(event) => {
          event.preventDefault();
          handleSubCorruption();
        }}
      >
        <Row height={"70%"}>
          <Block></Block>
          <Value>
            {current_corruption} / {maxCorruptionPermanent}
          </Value>
          <Block>
            <FontAwesomeIcon
              icon={faSkull}
              color={Constants.PURPLE}
              size="sm"
            />
          </Block>
        </Row>
        <Row height={"30%"}>
          <Title>Corruption</Title>
        </Row>
      </Column>
    </Container>
  );
}

export default SmallCorruptionComponent;
