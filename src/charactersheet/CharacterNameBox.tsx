import styled from "styled-components";
import * as Constants from "../Constants";
import { CharacterEntry } from "../Types";

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

interface CharacterNameBoxProps {
  character: CharacterEntry;
}

function CharacterNameBox({ character }: CharacterNameBoxProps) {
  return <Container>{character.name}</Container>;
}

export default CharacterNameBox;
