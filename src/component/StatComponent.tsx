import { faMinus, faNotEqual, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import styled from "styled-components";
import "../App.css";
import * as Constants from "../Constants";
import {
  ActiveStateType,
  CharacterEntry,
  RollTypeEntry,
  SessionEntry,
} from "../Types";
import { toTitleCase } from "../functions/UtilityFunctions";
import RollComponent from "./RollComponent";

const Container = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  &:hover .second-row {
    display: flex; // Or visibility: visible; if you want to keep the space reserved
  }
  &:hover .value-row {
    height: 20%; // Or visibility: visible; if you want to keep the space reserved
  }
  width: 100%;
`;

interface DivProps {
  height?: string;
  active?: boolean;
}

const Row = styled.div<DivProps>`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  border-radius: ${Constants.BORDER_RADIUS};
  max-height: ${(props) => props.height};
  height: ${(props) => props.height};
`;

const BottomRow = styled.div<DivProps>`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  border 1px solid ${Constants.WIDGET_BORDER};
  border-radius: ${Constants.BORDER_RADIUS};
  max-height: ${(props) => props.height};
  min-height: ${(props) => props.height};
  display: ${(props) => (props.active ? "flex" : "none")};
  margin-top: 2px;
`;

const Value = styled.button`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  font-size: 2.5rem;
  font-weight: bold;
  color: ${Constants.WIDGET_PRIMARY_FONT};
  border-top: 1px solid ${Constants.WIDGET_BORDER};
  border-bottom: 0px solid ${Constants.WIDGET_BORDER};
  border-left: 0px solid ${Constants.WIDGET_BORDER};
  border-right: 0px solid ${Constants.WIDGET_BORDER};
  background-color: ${Constants.WIDGET_BACKGROUND};
  p {
    font-size: 10px;
    font-weight: bold;
    color: ${Constants.WIDGET_BACKGROUND};
  }

  width: 26px;
`;

type ActiveProps = {
  active: boolean;
};

const ActiveValue = styled.div<ActiveProps>`
  display: flex;
  align-items: top;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  color: ${Constants.WIDGET_SECONDARY_FONT_INACTIVE};
  letter-spacing: 1px;
  padding-bottom: 5px;
  background-color: ${Constants.WIDGET_BACKGROUND};
  border-bottom-left-radius: ${Constants.BORDER_RADIUS};
  border-bottom-right-radius: ${Constants.BORDER_RADIUS};
  border-bottom: 1px solid ${Constants.WIDGET_BORDER};
  border-top: 0px solid ${Constants.WIDGET_BORDER};
  border-bottom: 1px solid ${Constants.WIDGET_BORDER};
  border-left: 1px solid ${Constants.WIDGET_BORDER};
  border-right: 1px solid ${Constants.WIDGET_BORDER};
  height: ${(props) => (props.active ? "20%" : "50%")};
`;

const Modifier = styled.button`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  color: ${Constants.WIDGET_SECONDARY_FONT};
  border: 1px solid ${Constants.WIDGET_BORDER};
  background-color: ${Constants.WIDGET_BACKGROUND};
  width: 50%;
`;

const DiceContainerLeft = styled.button`
  display: flex;
  flex-grow: 1;
  align-items: top;
  justify-content: center;
  border-top-left-radius: ${Constants.BORDER_RADIUS};
  font-size: 18px;
  border: 1px solid ${Constants.WIDGET_BORDER};
  background-color: ${Constants.WIDGET_BACKGROUND};
  border-top: 1px solid ${Constants.WIDGET_BORDER};
  border-bottom: 0px solid ${Constants.WIDGET_BORDER};
  border-right: 0px solid ${Constants.WIDGET_BORDER};
  border-left: 1px solid ${Constants.WIDGET_BORDER};
  text-shadow: 1px 1px 1px ${Constants.BACKGROUND};
  max-width: 35px;
  min-width: 35px;
  padding-top: 8px;
`;

const DiceContainerRight = styled.button`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  justify-content: top;
  border-top-right-radius: ${Constants.BORDER_RADIUS};
  color: ${(props) => props.color};
  border: 1px solid ${Constants.WIDGET_BORDER};
  background-color: ${Constants.WIDGET_BACKGROUND};
  border-top: 1px solid ${Constants.WIDGET_BORDER};
  border-bottom: 0px solid ${Constants.WIDGET_BORDER};
  border-right: 1px solid ${Constants.WIDGET_BORDER};
  border-left: 0px solid ${Constants.WIDGET_BORDER};
  text-shadow: 1px 1px 1px ${Constants.BACKGROUND};
  max-width: 35px;
  min-width: 35px;
  padding-top: 5px;
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
  max-width: 35px;
  min-width: 35px;
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
  max-width: 35px;
  min-width: 35px;
`;

const DiceContainer = styled.div<DivProps>`
  display: ${(props) => (props.active ? "flex" : "none")};
`;

interface Props {
  stat_name: RollTypeEntry;
  stat_value: number;
  active?: boolean;
  stat_icon: any;
  stat_color: string;
  session: SessionEntry;
  character: CharacterEntry;
  websocket: Socket;
  isCreature: boolean;
  advantage: boolean;
  activeState: ActiveStateType;
}

function StatComponent({
  stat_name,
  stat_value,
  stat_icon,
  stat_color,
  active = false,
  session,
  character,
  websocket,
  isCreature,
  advantage,
  activeState,
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
    if (advantage && stat_name === "attack") {
      setModvalue(modValue + 2);
    } else if (advantage && stat_name === "defense") {
      setModvalue(modValue - 2);
    } else {
      setModvalue(0);
    }
  }, [advantage]);

  let color = Constants.WIDGET_SECONDARY_FONT;
  if (["attack", "defense", "casting", "sneaking"].includes(stat_name)) {
    color = Constants.TYPE_COLORS[stat_name];
  }

  return (
    <Container>
      <Row height={"100%"} className="first-row">
        <DiceContainerLeft>
          {stat_icon !== faNotEqual && (
            <FontAwesomeIcon icon={stat_icon} color={stat_color} />
          )}
        </DiceContainerLeft>

        <Value className="dice-icon-hover">
          {Math.max(stat_value + modValue, 1)}
        </Value>
        <DiceContainerRight>
          <DiceContainer className="second-row" active={active}>
            <RollComponent
              session={session}
              character={character}
              websocket={websocket}
              roll_type={stat_name}
              roll_source={"Skill Test"}
              isCreature={isCreature}
              dice={20}
              dice_mod={modValue}
              color={color}
              target={stat_value + modValue}
              setModValue={setModvalue}
              advantage={advantage}
              activeState={activeState}
            />
          </DiceContainer>
        </DiceContainerRight>
      </Row>
      <ActiveValue className="value-row" active={active}>
        {modValue !== 0 ? "* " : ""}
        {toTitleCase(stat_name)}
        {modValue !== 0 ? " *" : ""}
      </ActiveValue>
      <BottomRow height={"25%"} className="second-row" active={active}>
        <Minus className="button-hover" onClick={handleSubValue}>
          <FontAwesomeIcon
            icon={faMinus}
            color={Constants.WIDGET_SECONDARY_FONT_INACTIVE}
          />
        </Minus>
        <Modifier className="mouse-icon-hover">
          {modValue > 0 ? "+" : ""}
          {modValue}
        </Modifier>
        <Plus className="button-hover" onClick={handleAddValue}>
          <FontAwesomeIcon
            icon={faPlus}
            color={Constants.WIDGET_SECONDARY_FONT_INACTIVE}
          />
        </Plus>
      </BottomRow>
    </Container>
  );
}

export default StatComponent;
