import { Socket } from "socket.io-client";
import styled from "styled-components";
import { CharacterEntry, SessionEntry } from "../../Types";
import DiceBox from "../DiceBox";
import RollComponent from "../../component/RollComponent";
const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  justify-content: flex-end;
  gap: 10px;
  width: 100%;
`;

interface DiceBoxProps {
  character: CharacterEntry;
  session: SessionEntry;
  websocket: Socket;
}

function DiceSection({ character, session, websocket }: DiceBoxProps) {
  return (
    <Container>
      <RollComponent dice={4} />
      <RollComponent dice={6} />
      <RollComponent dice={8} />
      <RollComponent dice={10} />
      <RollComponent dice={12} />
      <RollComponent dice={20} />
      <RollComponent dice={100} />
      {/* <DiceBox
        type_name={4}
        character={character}
        session={session}
        websocket={websocket}
        isCreature={false}
      />
      <DiceBox
        type_name={6}
        character={character}
        session={session}
        websocket={websocket}
        isCreature={false}
      />
      <DiceBox
        type_name={8}
        character={character}
        session={session}
        websocket={websocket}
        isCreature={false}
      />
      <DiceBox
        type_name={10}
        character={character}
        session={session}
        websocket={websocket}
        isCreature={false}
      />
      <DiceBox
        type_name={12}
        character={character}
        session={session}
        websocket={websocket}
        isCreature={false}
      />
      <DiceBox
        type_name={20}
        character={character}
        session={session}
        websocket={websocket}
        isCreature={false}
      />
      <DiceBox
        type_name={100}
        character={character}
        session={session}
        websocket={websocket}
        isCreature={false}
      /> */}
    </Container>
  );
}

export default DiceSection;
