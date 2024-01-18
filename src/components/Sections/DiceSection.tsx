import { Socket } from "socket.io-client";
import styled from "styled-components";
import * as Constants from "../../Constants";
import { CharacterEntry, SessionEntry } from "../../Types";
import RollComponent from "../../component/RollComponent";
const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  justify-content: flex-end;
  gap: 10px;
  width: 100%;
`;

const DiceContainer = styled.button`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  border-radius: ${Constants.BORDER_RADIUS};
  justify-content: center;
  align-items: center;
  font-size: 15px;
  font-weight: bold;
  background-color: ${Constants.WIDGET_BACKGROUND};
  border: 1px solid ${Constants.WIDGET_BORDER};
  color: ${Constants.WIDGET_PRIMARY_FONT};
  
`;

interface DiceBoxProps {
  character: CharacterEntry;
  session: SessionEntry;
  websocket: Socket;
}

function DiceSection({ character, session, websocket }: DiceBoxProps) {
  return (
    <Container>
      <DiceContainer>
      <RollComponent dice={4}/>
      </DiceContainer>
      <DiceContainer>
      <RollComponent dice={6} />
      </DiceContainer>
      <DiceContainer>
      <RollComponent dice={8} />
      </DiceContainer>
      <DiceContainer>
      <RollComponent dice={10} />
      </DiceContainer>
      <DiceContainer>
      <RollComponent dice={12} />
      </DiceContainer>
      <DiceContainer>
      <RollComponent dice={20} />
      </DiceContainer>
      <DiceContainer>
      <RollComponent dice={100} />
      </DiceContainer>
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
