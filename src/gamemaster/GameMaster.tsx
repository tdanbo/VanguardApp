import { Socket } from "socket.io-client";
import styled from "styled-components";
import { CharacterEntry, SessionEntry } from "../Types";
import ResetCreatureEncounter from "../components/ResetCreatureEncounter";
import CreatureEncounterSection from "../components/Sections/CreatureEncounterSection";
import TimeTrackBox from "../gamemaster/TimeTrackBox";
import TravelBox from "../gamemaster/TravelBox";
import * as Constants from "../Constants";

interface ContainerProps {
  height: string;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  gap: ${Constants.WIDGET_GAB};
  height: ${(props) => props.height};
  max-height: ${(props) => props.height};
`;

interface DivProps {
  width: string;
}

const Row = styled.div<DivProps>`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  flex-basis: 0;
  gap: ${Constants.WIDGET_GAB};
  max-width: ${(props) => props.width};
`;

const DynamicContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  gap: ${Constants.WIDGET_GAB};
  height: 0px; /* or another fixed value */
`;

const ScrollColumn = styled.div<DivProps>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-basis: 0;
  gap: ${Constants.WIDGET_GAB};
  max-width: ${(props) => props.width};
  overflow-y: scroll;
`;

interface GameMasterProps {
  session: SessionEntry;
  browserState: number;
  setBrowserState: (value: number) => void;
  gmMode: boolean;
  creatureEncounter: CharacterEntry[];
  setCreatureEncounter: React.Dispatch<React.SetStateAction<CharacterEntry[]>>;
  onDeleteCreature: (id: string) => void;
  setGmMode: React.Dispatch<React.SetStateAction<boolean>>;
  websocket: Socket;
  setSession: React.Dispatch<React.SetStateAction<SessionEntry>>;
  setIsJoinOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isGm: boolean;
  isCreature: boolean;
  setIsCreature: React.Dispatch<React.SetStateAction<boolean>>;
  setCharacterName: React.Dispatch<React.SetStateAction<string>>;
}

function GameMaster({
  session,

  creatureEncounter,

  setCreatureEncounter,
  onDeleteCreature,
  setGmMode,
  websocket,

  isCreature,
  setIsCreature,
  setCharacterName,
}: GameMasterProps) {
  return (
    <>
      <Container height={"40px"}>
        <Row width={"100%"}>
          <TravelBox session={session} websocket={websocket} />
        </Row>
      </Container>
      <DynamicContainer key="container">
        <ScrollColumn width="100%">
          <CreatureEncounterSection
            encounter={creatureEncounter}
            setCreatureEncounter={setCreatureEncounter}
            onDeleteCreature={onDeleteCreature}
            session={session}
            websocket={websocket}
            isCreature={isCreature}
            setIsCreature={setIsCreature}
            setGmMode={setGmMode}
            setCharacterName={setCharacterName}
          />
        </ScrollColumn>
      </DynamicContainer>
      <Container height={"30px"}>
        <ResetCreatureEncounter setCreatureEncounter={setCreatureEncounter} />
        <TimeTrackBox session={session} websocket={websocket} />
      </Container>
    </>
  );
}

export default GameMaster;
