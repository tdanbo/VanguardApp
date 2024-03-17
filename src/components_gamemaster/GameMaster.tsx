import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import styled from "styled-components";
import * as Constants from "../Constants";
import {
  ActiveStateType,
  AdvantageType,
  CharacterEntry,
  SessionEntry,
} from "../Types";
import ResetCreatureEncounter from "./ResetCreatureEncounter";
import CreatureEncounterSection from "./CreatureEncounterSection";
import TimeTrackBox from "../components_gamemaster/TimeTrackBox";
import TravelBox from "../components_gamemaster/TravelBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNoteSticky, faShieldAlt } from "@fortawesome/free-solid-svg-icons";

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

const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
  background-color: ${Constants.BACKGROUND};
  height: 100%;
  gap: 25px;
  padding: 25px 100px 25px 100px;
  box-sizing: border-box;
`;

const Navigator = styled.button`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  border-radius: ${Constants.BORDER_RADIUS};
  border: 1px solid ${Constants.WIDGET_BORDER};
  background-color: ${Constants.BACKGROUND};
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: ${Constants.WIDGET_SECONDARY_FONT};
  width: 40px;
  max-width: 40px;
  height: 40px;
`;

interface GameMasterProps {
  session: SessionEntry;
  browserState: number;
  setBrowserState: (value: number) => void;
  gmMode: boolean;
  setGmMode: React.Dispatch<React.SetStateAction<boolean>>;
  websocket: Socket;
  setSession: React.Dispatch<React.SetStateAction<SessionEntry>>;
  isGm: boolean;
  isCreature: boolean;
  setIsCreature: React.Dispatch<React.SetStateAction<boolean>>;
  advantage: AdvantageType;
  activeState: ActiveStateType;
  setActiveState: React.Dispatch<React.SetStateAction<ActiveStateType>>;
  setAdvantage: React.Dispatch<React.SetStateAction<AdvantageType>>;
  setCharacter: React.Dispatch<React.SetStateAction<CharacterEntry>>;
}

function GameMaster({
  session,
  setGmMode,
  websocket,
  isCreature,
  setIsCreature,
  advantage,
  activeState,
  setActiveState,
  setAdvantage,
  isGm,
  gmMode,
  setCharacter,
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
    <Column>
      <Container height={"40px"}>
        <Row width={"100%"}>
          {isGm && (
            <Navigator
              onClick={() => setGmMode((prevMode) => !prevMode)}
              title={"GM Mode"}
            >
              <FontAwesomeIcon icon={gmMode ? faNoteSticky : faShieldAlt} />
            </Navigator>
          )}
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
            characterLog={characterLog}
            advantage={advantage}
            activeState={activeState}
            setActiveState={setActiveState}
            setAdvantage={setAdvantage}
            setCharacter={setCharacter}
          />
        </ScrollColumn>
      </DynamicContainer>
      <Container height={"30px"}>
        <ResetCreatureEncounter session={session} websocket={websocket} />
        <TimeTrackBox session={session} websocket={websocket} />
      </Container>
    </Column>
  );
}

export default GameMaster;
