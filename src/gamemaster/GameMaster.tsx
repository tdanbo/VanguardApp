import styled from "styled-components";
import { CharacterEntry, SessionEntry } from "../Types";
import CharacterNavigation from "../components/NavigationControl/CharacterNavigation";
import ResetCreatureEncounter from "../components/ResetCreatureEncounter";
import CreatureEncounterSection from "../components/Sections/CreatureEncounterSection";
import TimeTrackBox from "../gamemaster/TimeTrackBox";
import TravelBox from "../gamemaster/TravelBox";

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
  setIsCreature,
  setCharacterName,
}: GameMasterProps) {
  return (
    <>
      <HeaderContainer>
        <TravelBox session={session} websocket={websocket} />
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
            setIsCreature={setIsCreature}
            setGmMode={setGmMode}
            setCharacterName={setCharacterName}
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
