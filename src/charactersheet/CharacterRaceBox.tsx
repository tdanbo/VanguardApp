import styled from "styled-components";
import * as Constants from "../Constants";
import { CharacterEntry } from "../Types";

const Container = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  align-items: center;
  justify-content: right;
  font-size: clamp(1px, ${Constants.VW}, 30px);
  font-weight: bold;
  color: ${Constants.WIDGET_PRIMARY_FONT};
`;

interface CharacterRaceBoxProps {
  character: CharacterEntry;
}

function CharacterRaceBox({ character }: CharacterRaceBoxProps) {
  return <Container>{character.details.race}</Container>;
}

export default CharacterRaceBox;
