import { Container } from "@mui/material";
import styled from "styled-components";
import { useContext } from "react";
import { CharacterContext } from "../contexts/CharacterContext";
import * as Constants from "../Constants";
function CharacterNameBox() {
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

  const { character } = useContext(CharacterContext);
  return <Container>{character.details.name}</Container>;
}

export default CharacterNameBox;
