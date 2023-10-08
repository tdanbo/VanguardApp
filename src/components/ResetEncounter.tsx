import * as Constants from "../Constants";
import { SetStateAction } from "react";
import styled from "styled-components";
import "../App.css";

import { CreatureEntry } from "../Types";
const Container = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: right;
  font-weight: bold;
  color: ${Constants.WIDGET_SECONDARY_FONT};
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  border-radius: ${Constants.BORDER_RADIUS};
  margin-right: 20px;
  margin-top: 5px;
  margin-bottom: 5px;
  padding: 10px;
  border: 1px solid ${Constants.WIDGET_BORDER};
`;

interface ResetEncounterProps {
  setEncounter: React.Dispatch<SetStateAction<CreatureEntry[]>>;
}

function ResetEncounter({ setEncounter }: ResetEncounterProps) {
  const handleResetEncounter = () => {
    setEncounter([]);
  };

  return (
    <Container
      className="mouse-icon-hover button-hover"
      onClick={handleResetEncounter}
    >
      Reset Encounter
    </Container>
  );
}

export default ResetEncounter;
