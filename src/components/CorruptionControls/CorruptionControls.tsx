import CorruptionToken from "../CorruptionToken";

import { useContext } from "react";
import { CharacterContext } from "../../contexts/CharacterContext";

import styled from "styled-components";

import * as Constants from "../../Constants";

import {
  onAddPermCorruption,
  onSubPermCorruption,
} from "../../functions/CharacterFunctions";

function CorruptionControls() {
  const { character } = useContext(CharacterContext);

  const temporary_corruption = character.corruption.temporary;
  const clean_corruption =
    character.corruption.threshold - temporary_corruption;

  console.log("Temporary corruption: ", temporary_corruption);
  console.log("Clean corruption: ", clean_corruption);

  const Container = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
    gap: ${Constants.WIDGET_GAB};
  `;

  return (
    <Container>
      {[...Array(temporary_corruption)].map((_, index) => (
        <CorruptionToken key={index} state={"filled"} />
      ))}
      {[...Array(clean_corruption)].map((_, index) => (
        <CorruptionToken key={index} state={"empty"} />
      ))}
    </Container>
  );
}

export default CorruptionControls;
