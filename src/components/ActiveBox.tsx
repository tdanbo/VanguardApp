import * as Constants from "../Constants";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShieldHalved,
  faBolt,
  faCrosshairs,
  faVolumeXmark,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { CharacterContext } from "../contexts/CharacterContext";
import { useContext } from "react";
import { Active } from "../Types";

type Props = {
  active: Active;
  active_name: string;
};

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 2px;
`;

const Row = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  gap: 2px;
`;

const Value = styled.div`
  display: flex;
  flex: 2;
  align-items: center;
  justify-content: center;
  border-radius: ${Constants.BORDER_RADIUS};
  font-size: 2rem;
  font-weight: bold;
  color: ${Constants.WIDGET_PRIMARY_FONT};
  border: 1px solid ${Constants.WIDGET_BORDER};
  background-color: ${Constants.WIDGET_BACKGROUND};
`;

const Modifier = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  border-radius: ${Constants.BORDER_RADIUS};

  font-size: 1rem;
  font-weight: bold;
  color: ${Constants.WIDGET_SECONDARY_FONT};
  border: 1px solid ${Constants.WIDGET_BORDER};
  background-color: ${Constants.WIDGET_BACKGROUND};
`;

type DiceProps = {
  color: string;
};

const Dice = styled.div<DiceProps>`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  border-radius: ${Constants.BORDER_RADIUS};
  font-size: 1rem;
  font-weight: bold;
  color: ${(props) => props.color};
  border: 1px solid ${Constants.WIDGET_BORDER};
  background-color: ${Constants.WIDGET_BACKGROUND};
`;

function ActiveBox({ active_name, active }: Props) {
  const { character } = useContext(CharacterContext);

  const active_value = character.stats[active.stat].value - active.mod;

  const [value, setValue] = useState(active_value);

  const icon = (active_name: string) => {
    if (active_name === "sneaking") {
      return <FontAwesomeIcon icon={faVolumeXmark} />;
    } else if (active_name === "casting") {
      return <FontAwesomeIcon icon={faBolt} />;
    } else if (active_name === "defense") {
      return <FontAwesomeIcon icon={faShieldHalved} />;
    } else if (active_name === "attack") {
      return <FontAwesomeIcon icon={faCrosshairs} />;
    }
  };

  // border: 1px solid ${Constants.BORDER_LIGHT};
  // background-color: ${Constants.PRIMARY_MEDIUM};

  return (
    <Container>
      <Value onClick={() => setValue(value + 1)}>{value}</Value>
      <Row>
        <Modifier>0</Modifier>
        <Dice color={Constants.TYPE_COLORS[active_name]}>d20</Dice>
      </Row>
    </Container>
  );
}

export default ActiveBox;
