import * as Constants from "../Constants";
import styled from "styled-components";

import { useContext } from "react";
import { CharacterContext } from "../contexts/CharacterContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDroplet, faCarrot } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "@mui/material";

const Container = styled.div`
  display: flex;
  flex-grow: 1;
  border-radius: 100px;
  height: 35px;
  gap: 20px;
  justify-content: left;
`;

const RationContainer = styled.div`
  display: flex;
  flex: 1;
  flex-grow: 1;
  border-radius: 100px;
  justify-content: center;
  align-items: center;
  font-size: 1.25em;
  font-weight: bold;
  background-color: ${Constants.WIDGET_BACKGROUND};
  border: 1px solid ${Constants.WIDGET_BORDER};
  color: ${Constants.WIDGET_PRIMARY_FONT};
  max-width: 100px;
`;

const IconContainer = styled.div`
  display: flex;
  flex: 1;
  flex-grow: 1;
  margin-left: 12px;
  font-size: 20px;
`;

const TextContainer = styled.div`
  display: flex;
  flex: 1;
  flex-grow: 1;
  justify-content: left;
  align-items: center;
  font-size: 20px;
`;

function RationsBox() {
  const { character } = useContext(CharacterContext);

  const used_slots = character.inventory.length;
  const max_slots = character.stats.strong.value;

  return (
    <Container>
      <RationContainer>
        <IconContainer>
          <FontAwesomeIcon icon={faCarrot} />
        </IconContainer>
        <TextContainer>7</TextContainer>
      </RationContainer>
      <RationContainer>
        <IconContainer>
          <FontAwesomeIcon icon={faDroplet} />
        </IconContainer>
        <TextContainer>7</TextContainer>
      </RationContainer>
    </Container>
  );
}
export default RationsBox;
