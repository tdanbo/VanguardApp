import * as Constants from "../Constants";
import styled from "styled-components";

import { useContext } from "react";
import { CharacterContext } from "../contexts/CharacterContext";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  width: 50px;
  height: 50px;
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  color: ${Constants.WIDGET_BACKGROUND};
  border-radius: ${Constants.BORDER_RADIUS};
  &:hover {
    background-color: ${Constants.WIDGET_BACKGROUND};
    color: ${Constants.WIDGET_PRIMARY_FONT};
    border: 1px solid ${Constants.WIDGET_BORDER};
  }
`;

function OverburdenBox() {
  const { character } = useContext(CharacterContext);

  const used_slots = character.inventory.length;
  const max_slots = character.stats.strong.value;

  return (
    <Container>
      {used_slots} / {max_slots}
    </Container>
  );
}
export default OverburdenBox;
