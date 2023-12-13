import { Socket } from "socket.io-client";
import styled from "styled-components";
import {
  AttackActive,
  CharacterEntry,
  DefenseActive,
  SessionEntry,
  SimpleActive,
} from "../Types";
import ActiveBox from "../components/ActiveBox";
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
  websocket: Socket;
  isCreature: boolean;
}

function CorruptionControls({
  character,
  session,
  websocket,
  isCreature,
}: CorruptionControlsProps) {
  const actives = UpdateActives(character);

  return (
    <Container>
      <ActiveBox
        websocket={websocket}
        session={session}
        active_name={"attack"}
        active={actives["attack"] as AttackActive}
        character={character}
        isCreature={isCreature}
      />
      <ActiveBox
        websocket={websocket}
        session={session}
        active_name={"defense"}
        active={actives["defense"] as DefenseActive}
        character={character}
        isCreature={isCreature}
      />
      <ActiveBox
        websocket={websocket}
        session={session}
        active_name={"casting"}
        active={actives["casting"] as SimpleActive}
        character={character}
        isCreature={isCreature}
      />
      <ActiveBox
        websocket={websocket}
        session={session}
        active_name={"sneaking"}
        active={actives["sneaking"] as SimpleActive}
        character={character}
        isCreature={isCreature}
      />
    </Container>
  );
}

export default CorruptionControls;
