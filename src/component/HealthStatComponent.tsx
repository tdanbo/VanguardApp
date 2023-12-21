import styled from "styled-components";
import * as Constants from "../Constants";
import { CharacterPortraits } from "../Images";
import { CharacterEntry, SessionEntry } from "../Types";
import { GetMaxToughness } from "../functions/RulesFunctions";
import { update_session } from "../functions/SessionsFunctions";

interface PortraitProps {
  src: string;
}

const Container = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  gap: 2px;
`;
// background-image: url("/dist/assets/portrait1.jpeg");

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

const ValueBoxLeft = styled.div`
  user-select: none;
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-grow: 1;
  justify-content: center;
  background-color: ${Constants.WIDGET_BACKGROUND};
  color: ${Constants.WIDGET_PRIMARY_FONT};
  border: 1px solid ${Constants.WIDGET_BORDER};
  cursor: pointer;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: ${Constants.BORDER_RADIUS};
  border-bottom-left-radius: ${Constants.BORDER_RADIUS};

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
    font-size: 25px;
  }

  h2 {
    display: none;
    font-size: 18px;
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
}

const RightTickBar = styled.div<BgColor>`
  display: flex;
  flex-grow: 1;
  background-color: ${(props) => props.$bgcolor};
  border-right: 1px solid ${Constants.WIDGET_BORDER};
  border-top: 1px solid ${Constants.WIDGET_BORDER};
  border-bottom: 1px solid ${Constants.WIDGET_BORDER};
  cursor: pointer;
`;

const Divider = styled.div`
  display: flex;
  background-color: rgba(255, 255, 255, 0.5);
  width: 2px;
  height: 16px;
  margin: 4px;
`;

import { Socket } from "socket.io-client";

interface HealthBoxProps {
  character: CharacterEntry;
  session: SessionEntry;
  websocket: Socket;
  isCreature: boolean;
}

function HealthStatComponent({
  character,
  session,
  websocket,
  isCreature,
}: HealthBoxProps) {
  const handleAddToughness = () => {
    if (character.damage > 0) {
      character.damage -= 1;
    }
    update_session(session, character, isCreature, websocket);
  };

  const handleSubToughness = () => {
    const maxToughness =
      character.stats.strong.value < 10 ? 10 : character.stats.strong.value;

    const value_step = 1;

    if (character.damage === maxToughness) {
      console.log("Max damage reached");
    } else {
      character.damage += value_step;
    }
    update_session(session, character, isCreature, websocket);
  };

  const maxToughness = GetMaxToughness(character);

  const damage_toughness = character.damage;
  const remaining_toughness = maxToughness - character.damage;

  return (
    <Container>
      <Row
        height="70%"
        onClick={handleSubToughness}
        onContextMenu={(e) => {
          e.preventDefault();
          handleAddToughness();
        }}
      >
        {Array.from({ length: remaining_toughness }).map((_, index) => {
          return (
            <RightTickBar
              key={index}
              $bgcolor={Constants.TYPE_COLORS["health"]}
            />
          );
        })}
        {Array.from({ length: damage_toughness }).map((_, index) => {
          return (
            <RightTickBar
              key={index}
              $bgcolor={Constants.WIDGET_BACKGROUND_EMPTY}
            />
          );
        })}
      </Row>
      <Row height="30%">
        <ValueBoxLeft>
          <h1>{remaining_toughness}</h1>
          <h2>
            {remaining_toughness}
            <Divider></Divider>
            {maxToughness}
          </h2>
        </ValueBoxLeft>
      </Row>
    </Container>
  );
}

export default HealthStatComponent;
