import { useContext } from "react";
import { CharacterContext } from "../contexts/CharacterContext";

import styled from "styled-components";
import ActiveBox from "./ActiveBox";

const Container = styled.div`
  display: flex;
  flex: 2;
  flex-direction: row;
  gap: 10px;
`;

function CorruptionControls() {
  const { character } = useContext(CharacterContext);

  return (
    <Container>
      <ActiveBox active_name={"attack"} active={character.actives.attack} />
      <ActiveBox active_name={"defense"} active={character.actives.defense} />
      <ActiveBox active_name={"casting"} active={character.actives.casting} />
      <ActiveBox active_name={"sneaking"} active={character.actives.sneaking} />
    </Container>
  );
}

export default CorruptionControls;
