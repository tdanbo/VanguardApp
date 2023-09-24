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
  height: 50px;
  border: 1px solid ${Constants.WIDGET_BORDER};
  background-color: ${Constants.WIDGET_BACKGROUND};
  color: ${Constants.WIDGET_PRIMARY_FONT};
  border-radius: ${Constants.BORDER_RADIUS};
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
