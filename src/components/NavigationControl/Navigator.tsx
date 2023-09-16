import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { CharacterEntry } from "../../Types";
import { CharacterContext } from "../../contexts/CharacterContext";
import { TempChar } from "../../TempCharacter";
import * as Constants from "../../Constants";
interface NavigationProps {
  icon: any;
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  color: ${Constants.WIDGET_BACKGROUND};
  border-radius: ${Constants.BORDER_RADIUS};
  &:hover {
    background-color: ${Constants.WIDGET_BACKGROUND};
    color: ${Constants.WIDGET_PRIMARY_FONT};
    border: 1px solid ${Constants.WIDGET_BORDER};
  }
  width: 50px;
  height: 50px;
`;

function Navigator({ icon }: NavigationProps) {
  const { character, setCharacter } = useContext(CharacterContext);

  const HandleClick = () => {
    setCharacter(TempChar);
  };

  return (
    <Container onClick={HandleClick}>
      <FontAwesomeIcon icon={icon} />
    </Container>
  );
}

export default Navigator;
