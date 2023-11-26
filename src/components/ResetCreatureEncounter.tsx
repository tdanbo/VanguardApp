import * as Constants from "../Constants";
import { SetStateAction } from "react";
import styled from "styled-components";
import "../App.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { CharacterEntry } from "../Types";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Navigator = styled.button`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 1px solid ${Constants.WIDGET_BACKGROUND_EMPTY};
  font-size: 18px;
  color: ${Constants.WIDGET_BACKGROUND};
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  border-radius: ${Constants.BORDER_RADIUS};
  &:hover {
    background-color: ${Constants.WIDGET_BACKGROUND};
    color: ${Constants.WIDGET_PRIMARY_FONT};
    border: 1px solid ${Constants.WIDGET_BORDER};
  }
  width: 50px;
  height: 35px;
`;

interface ResetEncounterProps {
  setCreatureEncounter: React.Dispatch<SetStateAction<CharacterEntry[]>>;
}

function ResetCreatureEncounter({ setCreatureEncounter }: ResetEncounterProps) {
  const handleResetEncounter = () => {
    setCreatureEncounter([]);
  };

  return (
    <Container>
      <Navigator
        className="mouse-icon-hover button-hover"
        onClick={handleResetEncounter}
      >
        <FontAwesomeIcon icon={faXmark} />
      </Navigator>
    </Container>
  );
}

export default ResetCreatureEncounter;
