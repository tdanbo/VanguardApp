import CharacterNavigation from "../components/NavigationControl/CharacterNavigation";
import CreatureEncounterSection from "../components/Sections/CreatureEncounterSection";
import ResetCreatureEncounter from "../components/ResetCreatureEncounter";
import TimeTrackBox from "../Gamemaster/TimeTrackBox";

import DayNavigator from "../Gamemaster/TravelBox";

import styled from "styled-components";
import { CharacterEntry, SessionEntry } from "../Types";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 50px;
  margin-left: 90px;
  margin-top: 5px;
  gap: 20px;
`;

const FooterCenterContainer = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 50px;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 5px;
  gap: 20px;
`;

const EncounterContainer = styled.div`
  display: flex;
  flex-direction: row;

  margin: 20px;
  gap: 20px;
  height: 100%;

  overflow: scroll;
  scrollbar-width: none !important;
`;

const ScrollContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  overflow: scroll;
  scrollbar-width: none !important;
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
  websocket: WebSocket;
  setSession: React.Dispatch<React.SetStateAction<SessionEntry>>;
  setIsJoinOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isGm: boolean;
  isCreature: boolean;
}

function GameMaster({
  session,
  browserState,
  gmMode,
  creatureEncounter,
  setBrowserState,
  setCreatureEncounter,
  onDeleteCreature,
  setGmMode,
  websocket,
  setSession,
  isGm,
  isCreature,
}: GameMasterProps) {
  return (
    <>
      <HeaderContainer>
        <DayNavigator session={session} websocket={websocket} />
      </HeaderContainer>
      <EncounterContainer key="container">
        <CharacterNavigation
          browserState={browserState}
          setBrowserState={setBrowserState}
          gmMode={gmMode}
          setGmMode={setGmMode}
          setSession={setSession}
          isGm={isGm}
        />
        <ScrollContainer>
          <CreatureEncounterSection
            encounter={creatureEncounter}
            setCreatureEncounter={setCreatureEncounter}
            onDeleteCreature={onDeleteCreature}
            session={session}
            websocket={websocket}
            isCreature={isCreature}
          />
        </ScrollContainer>
      </EncounterContainer>
      <FooterCenterContainer>
        <ResetCreatureEncounter setCreatureEncounter={setCreatureEncounter} />
        <TimeTrackBox session={session} websocket={websocket} />
      </FooterCenterContainer>
    </>
  );
}

export default GameMaster;
