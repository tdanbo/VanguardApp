import styled from "styled-components";
import { CharacterEntry } from "../Types";
import * as Constants from "../Constants";

const Container = styled.div`
  display: flex;
  flex-grow: 1;
  flex: 1;
  flex-direction: row;
  align-items: center;
  font-size: 30px;
  font-weight: bold;
  color: ${Constants.WIDGET_PRIMARY_FONT};
`;

interface EncounterBoxProps {
  character: CharacterEntry;
}

function EncounterEntry({ character }: EncounterBoxProps) {
  return <Container>{character.name}</Container>;
}

export default EncounterEntry;
