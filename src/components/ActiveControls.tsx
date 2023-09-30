import styled from "styled-components";
import ActiveBox from "./ActiveBox";

import { ActiveKey, AttackActive, DefenseActive, SimpleActive } from "../Types";
import { UpdateActives } from "../functions/ActivesFunction";
import { useContext } from "react";
import { CharacterContext } from "../contexts/CharacterContext";
const Container = styled.div`
  display: flex;
  flex: 2;
  flex-direction: row;
  gap: 10px;
`;

function CorruptionControls() {
  const { character } = useContext(CharacterContext);
  const actives = UpdateActives(character);

  return (
    <Container>
      <ActiveBox
        active_name={"attack"}
        active={actives["attack"] as AttackActive}
      />
      <ActiveBox
        active_name={"defense"}
        active={actives["defense"] as DefenseActive}
      />
      <ActiveBox
        active_name={"casting"}
        active={actives["casting"] as SimpleActive}
      />
      <ActiveBox
        active_name={"sneaking"}
        active={actives["sneaking"] as SimpleActive}
      />
    </Container>
  );
}

export default CorruptionControls;
