import styled from "styled-components";
import * as Constants from "../Constants";
import { CharacterPortraits } from "../Images";
import { CharacterEntry, SessionEntry } from "../Types";
import { GetMaxToughness } from "../functions/RulesFunctions";
import { update_session } from "../functions/SessionsFunctions";

interface PortraitProps {
  src: string;
}

interface ContainerProps {
  width: string;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  gap: 2px;
  width: ${(props) => props.width};
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
  gap: 2px;
  max-width: ${(props) => props.width};
  overflow: scroll;
  scrollbar-width: none !important;
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

interface ButtonProps {
  fontsize: string;
}

const Modifier = styled.button<ButtonProps>`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: bold;
  color: ${Constants.WIDGET_SECONDARY_FONT};
  border: 1px solid ${Constants.WIDGET_BORDER};
  background-color: ${Constants.WIDGET_BACKGROUND};
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
    font-size: ${(props) => props.fontsize};
  }
  h2 {
    display: none;
    font-size: ${(props) => props.fontsize};
  }
  &:hover h1 {
    display: none;
  }
  &:hover h2 {
    display: flex;
  }
`;

import { Socket } from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

interface HealthBoxProps {
  character: CharacterEntry;
  session: SessionEntry;
  websocket: Socket;
  isCreature: boolean;
  browser: boolean;
}

function HealthStatComponent({
  character,
  session,
  websocket,
  isCreature,
  browser,
}: HealthBoxProps) {
  const handleAddToughness = () => {
    if (character.health.damage > 0) {
      character.health.damage -= 1;
    }
    update_session(session, character, isCreature, websocket);
  };

  const handleSubToughness = () => {
    const maxToughness =
      character.stats.strong.value < 10 ? 10 : character.stats.strong.value;

    const value_step = 1;

    if (character.health.damage === maxToughness) {
      console.log("Max damage reached");
    } else {
      character.health.damage += value_step;
    }
    update_session(session, character, isCreature, websocket);
  };

  const maxToughness = GetMaxToughness(character);

  const damage_toughness = character.health.damage;
  const remaining_toughness = maxToughness - character.health.damage;

  return (
    <Column width={"100%"}>
      <Row height={browser ? "50%" : "70%"}>
        {Array.from({ length: remaining_toughness }).map((_, index, array) => {
          return (
            <TickBar
              key={index}
              $bgcolor={Constants.TYPE_COLORS["health"]}
              isFirst={index === 0} // Apply rounded corners on the left for the first item
              isLast={index === array.length - 1}
            />
          );
        })}
        {Array.from({ length: damage_toughness }).map((_, index, array) => {
          return (
            <TickBar
              key={index}
              $bgcolor={Constants.WIDGET_BACKGROUND_EMPTY}
              isFirst={index === 0} // Apply rounded corners on the left for the first item
              isLast={index === array.length - 1} // Apply rounded corners on the right for the last item
            />
          );
        })}
      </Row>
      <Row
        height={browser ? "50%" : "30%"}
        className="button-hover"
        onClick={handleSubToughness}
        onContextMenu={(e) => {
          e.preventDefault();
          handleAddToughness();
        }}
      >
        <Minus>
          <FontAwesomeIcon
            icon={faMinus}
            color={Constants.WIDGET_SECONDARY_FONT_INACTIVE}
          />
        </Minus>
        <Modifier fontsize={browser ? "16px" : "20px"}>
          <h1>{remaining_toughness}</h1>
          <h2>
            {maxToughness}
            <Divider></Divider>
            {remaining_toughness}
          </h2>
        </Modifier>
        <Plus>
          <FontAwesomeIcon
            icon={faPlus}
            color={Constants.WIDGET_SECONDARY_FONT_INACTIVE}
          />
        </Plus>
      </Row>
    </Column>
  );
}

export default HealthStatComponent;
