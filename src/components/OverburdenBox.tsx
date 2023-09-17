import * as Constants from "../Constants";
import styled from "styled-components";

import { useContext } from "react";
import { CharacterContext } from "../contexts/CharacterContext";

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  font-weight: bold;
  h1 {
    font-size: 1.5em;
    color: ${Constants.WIDGET_PRIMARY_FONT};
  }
  h2 {
    font-size: 0.75em;
    margin-left: 10px;
    margin-top: 10px;

    color: ${Constants.WIDGET_SECONDARY_FONT};
  }
`;

function OverburdenBox() {
  const { character } = useContext(CharacterContext);

  const used_slots = character.inventory.length;
  const max_slots = character.stats.strong.value;

  return (
    <Container>
      <h1>
        {used_slots} / {max_slots}
      </h1>
      <h2>BAGS</h2>
    </Container>
  );
}
export default OverburdenBox;
