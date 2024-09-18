import { Socket } from "socket.io-client";
import styled from "styled-components";
import * as Constants from "../Constants";
import { CharacterEntry, SessionEntry } from "../Types";
import RollComponent from "../components_general/RollComponent";
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
  isCreature: boolean;
}

function DiceSection({
  character,
  session,
  websocket,
  isCreature,
}: DiceBoxProps) {
  return (
    <Container>
      <DiceContainer>
        <RollComponent
          session={session}
          character={character}
          websocket={websocket}
          roll_type={"dice"}
          roll_source={"d4"}
          isCreature={isCreature}
          roll_values={[{ source: "base", type: "general", value: 4 }]}
          color={Constants.TYPE_COLORS["custom"]}
        />
      </DiceContainer>
      <DiceContainer>
        <RollComponent
          session={session}
          character={character}
          websocket={websocket}
          roll_type={"dice"}
          roll_source={"d6"}
          isCreature={isCreature}
          roll_values={[{ source: "base", type: "general", value: 6 }]}
          color={Constants.TYPE_COLORS["custom"]}
        />
      </DiceContainer>
      <DiceContainer>
        <RollComponent
          session={session}
          character={character}
          websocket={websocket}
          roll_type={"dice"}
          roll_source={"d8"}
          isCreature={isCreature}
          roll_values={[{ source: "base", type: "general", value: 8 }]}
          color={Constants.TYPE_COLORS["custom"]}
        />
      </DiceContainer>
      <DiceContainer>
        <RollComponent
          session={session}
          character={character}
          websocket={websocket}
          roll_type={"dice"}
          roll_source={"d10"}
          isCreature={isCreature}
          roll_values={[{ source: "base", type: "general", value: 10 }]}
          color={Constants.TYPE_COLORS["custom"]}
        />
      </DiceContainer>
      <DiceContainer>
        <RollComponent
          session={session}
          character={character}
          websocket={websocket}
          roll_type={"dice"}
          roll_source={"d4"}
          isCreature={isCreature}
          roll_values={[{ source: "base", type: "general", value: 12 }]}
          color={Constants.TYPE_COLORS["custom"]}
        />
      </DiceContainer>
      <DiceContainer>
        <RollComponent
          session={session}
          character={character}
          websocket={websocket}
          roll_type={"dice"}
          roll_source={"d20"}
          isCreature={isCreature}
          roll_values={[{ source: "base", type: "general", value: 20 }]}
          color={Constants.TYPE_COLORS["custom"]}
        />
      </DiceContainer>
      <DiceContainer>
        <RollComponent
          session={session}
          character={character}
          websocket={websocket}
          roll_type={"dice"}
          roll_source={"d100"}
          isCreature={isCreature}
          roll_values={[{ source: "base", type: "general", value: 100 }]}
          color={Constants.TYPE_COLORS["custom"]}
        />
      </DiceContainer>
    </Container>
  );
}

export default DiceSection;
