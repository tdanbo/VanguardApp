import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import styled from "styled-components";
import * as Constants from "../Constants";
import { CharacterEntry, SessionEntry } from "../Types";
import ResetCreatureEncounter from "../components/ResetCreatureEncounter";
import CreatureEncounterSection from "../components/Sections/CreatureEncounterSection";
import TimeTrackBox from "../gamemaster/TimeTrackBox";
import TravelBox from "../gamemaster/TravelBox";

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
  setGmMode,
  websocket,
  isCreature,
  setIsCreature,
  setCharacterName,
}: GameMasterProps) {
  const [characterLog, setCharacterLog] = useState<CharacterEntry[]>([]);

  useEffect(() => {
    const combined_creatures = [...session.characters, ...session.encounter];
    combined_creatures.sort((a, b) => {
      if (a.details.initiative > b.details.initiative) {
        return -1;
      } else if (a.details.initiative < b.details.initiative) {
        return 1;
      } else {
        return 0;
      }
    });
    setCharacterLog(combined_creatures);
  }, [session]);

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
            session={session}
            websocket={websocket}
            isCreature={isCreature}
            setIsCreature={setIsCreature}
            setGmMode={setGmMode}
            setCharacterName={setCharacterName}
            characterLog={characterLog}
          />
        </ScrollColumn>
      </DynamicContainer>
      <Container height={"30px"}>
        <ResetCreatureEncounter session={session} websocket={websocket} />
        <TimeTrackBox session={session} websocket={websocket} />
      </Container>
    </>
  );
}

export default GameMaster;
