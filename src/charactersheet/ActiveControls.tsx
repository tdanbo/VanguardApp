import styled from "styled-components";
import ActiveBox from "../components/ActiveBox";

import {
  AttackActive,
  CharacterEntry,
  DefenseActive,
  SessionEntry,
  SimpleActive,
} from "../Types";
import { UpdateActives } from "../functions/ActivesFunction";
const Container = styled.div`
  display: flex;
  flex: 2;
  flex-direction: row;
  gap: 10px;
`;

interface CorruptionControlsProps {
  character: CharacterEntry;
  session: SessionEntry;
}

function CorruptionControls({ character, session }: CorruptionControlsProps) {
  const actives = UpdateActives(character);

  return (
    <Container>
      <ActiveBox
        session={session}
        active_name={"attack"}
        active={actives["attack"] as AttackActive}
        character={character}
      />
      <ActiveBox
        session={session}
        active_name={"defense"}
        active={actives["defense"] as DefenseActive}
        character={character}
      />
      <ActiveBox
        session={session}
        active_name={"casting"}
        active={actives["casting"] as SimpleActive}
        character={character}
      />
      <ActiveBox
        session={session}
        active_name={"sneaking"}
        active={actives["sneaking"] as SimpleActive}
        character={character}
      />
    </Container>
  );
}

export default CorruptionControls;
