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

  const temporary_corruption = character.corruption.temporary;
  const clean_corruption =
    character.corruption.threshold - temporary_corruption;

  character.actives.attack;

  return (
    <Container>
      <ActiveBox active_name={"attack"} active={character.actives.attack} />
      <ActiveBox active_name={"defense"} active={character.actives.defense} />
      <ActiveBox active_name={"sneaking"} active={character.actives.sneaking} />
      <ActiveBox active_name={"casting"} active={character.actives.casting} />
    </Container>
  );
}

export default CorruptionControls;
