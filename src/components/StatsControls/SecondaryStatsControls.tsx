import StatBox from "./StatBox";

import { useContext, useState } from "react";
import { CharacterContext } from "../../contexts/CharacterContext";
import { getCharacterMovement } from "../../functions/CharacterFunctions";

import styled from "styled-components";
import * as Constants from "../../Constants";

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  gap: 10px;
`;

const BoxContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex: 1;
  flex-direction: column;
  gap: ${Constants.WIDGET_GAB};
  min-height: 40px;
`;

const ValueName = styled.button`
  display: flex;
  flex-grow: 1;
  flex: 1;
  background-color: rgb(0, 255, 0);
  align-items: center;
  justify-content: center;
  color: ${Constants.WIDGET_SECONDARY_FONT};
  color: ${Constants.WIDGET_SECONDARY_FONT};
  font-size: 14px;
  font-weight: bold;
  background-color: ${Constants.WIDGET_BACKGROUND};
  border: 1px solid ${Constants.WIDGET_BORDER};
  border-radius: ${Constants.BORDER_RADIUS};
`;

const ValueButton = styled.button`
  display: flex;
  flex-gorw: 1;
  flex: 2;
  align-items: center;
  justify-content: center;
  color: ${Constants.WIDGET_PRIMARY_FONT};
  font-size: 2.5rem;
  font-weight: bold;
  background-color: ${Constants.WIDGET_BACKGROUND};
  border: 1px solid ${Constants.WIDGET_BORDER};
  border-radius: ${Constants.BORDER_RADIUS};
  p {
    font-size: 1rem;
    font-weight: bold;
    font-style: italic;
    margin-top: 20px;
    color: ${Constants.WIDGET_SECONDARY_FONT};
  }
`;

function SecondaryStatsControls() {
  const { character } = useContext(CharacterContext);
  const [swapSource, setSwapSource] = useState<null | string>(null);
  const movement = getCharacterMovement(character);
  return (
    <Container>
      <BoxContainer>
        <ValueButton>{Math.ceil(character.stats.strong.value / 2)}</ValueButton>
        <ValueName>Pain Threshold</ValueName>
      </BoxContainer>
      <BoxContainer>
        <ValueButton>
          {movement / 5}
          <p>sq</p>
        </ValueButton>
        <ValueName>Movement</ValueName>
      </BoxContainer>
    </Container>
  );
}

export default SecondaryStatsControls;
