import {
  IconDefinition,
  faMinus,
  faNotEqual,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Socket } from "socket.io-client";
import styled from "styled-components";
import * as Constants from "../Constants";
import "../Styles.css";
import { CharacterEntry, RollTypeEntry, SessionEntry } from "../Types";

import RollComponent from "../components_general/RollComponent";

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
  $active?: boolean;
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
  display: ${(props) => (props.$active ? "flex" : "none")};
  margin-top: 2px;
`;

const Value = styled.button`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  font-size: 2.3rem;
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
  display: ${(props) => (props.$active ? "flex" : "none")};
`;

interface Props {
  stat_name: RollTypeEntry;
  stat_value: number;
  active?: boolean;
  stat_icon: IconDefinition;
  stat_color: string;
  session: SessionEntry;
  character: CharacterEntry;
  websocket: Socket;
  isCreature: boolean;
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

  return (
    <Container>
      <Row height={"100%"} className="first-row">
        <DiceContainerLeft>
          {stat_icon !== faNotEqual && (
            <FontAwesomeIcon icon={stat_icon} color={stat_color} />
          )}
        </DiceContainerLeft>

        <Value className="dice-icon-hover" title={isCreature ? valueTitle : ""}>
          {Math.max(stat_value + modValue, 1)}
        </Value>
        <DiceContainerRight>
          <DiceContainer className="second-row" $active={active}>
            <RollComponent
              session={session}
              character={character}
              websocket={websocket}
              roll_type={"skill test"}
              roll_source={stat_name}
              isCreature={isCreature}
              roll_values={[{ source: "base", type: "general", value: 20 }]}
              dice_mod={modValue}
              color={color}
              target={Math.max(stat_value + modValue, 1)}
              setModValue={setModvalue}
            />
          </DiceContainer>
        </DiceContainerRight>
      </Row>
      <BottomRow height={"25%"} className="second-row" $active={active}>
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
