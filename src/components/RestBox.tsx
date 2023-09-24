import * as Constants from "../Constants";
import { useContext } from "react";
import { CharacterContext } from "../contexts/CharacterContext";
import { RestCharacter } from "../functions/CharacterFunctions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const Navigator = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  color: ${Constants.WIDGET_BACKGROUND};
  border-radius: ${Constants.BORDER_RADIUS};
  border: 1px solid ${Constants.WIDGET_BACKGROUND_EMPTY};
  &:hover {
    background-color: ${Constants.WIDGET_BACKGROUND};
    color: ${Constants.WIDGET_PRIMARY_FONT};
    border: 1px solid ${Constants.WIDGET_BORDER};
  }
  height: 50px;
`;

function RestBox() {
  const { character, setCharacter } = useContext(CharacterContext);

  const HandleRest = () => {
    const updatedCharacter = RestCharacter(character);
    if (updatedCharacter) {
      setCharacter(updatedCharacter);
    }
  };

  return (
    <Navigator onClick={HandleRest}>
      <FontAwesomeIcon icon={faMoon} />
    </Navigator>
  );
}

export default RestBox;
