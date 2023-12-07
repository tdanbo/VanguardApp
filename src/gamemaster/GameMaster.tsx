import CharacterNavigation from "../components/NavigationControl/CharacterNavigation";
import CreatureEncounterSection from "../components/Sections/CreatureEncounterSection";
import ResetCreatureEncounter from "../components/ResetCreatureEncounter";
import TimeTrackBox from "./TimeTrackBox";

import DayNavigator from "./TravelBox";

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
  setCreatureEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

function GameMaster({
  session,
  browserState,
  gmMode,
  creatureEncounter,
  setBrowserState,
  setCreatureEncounter,
  onDeleteCreature,
  setCreatureEdit,
}: GameMasterProps) {
  return (
    <>
      <HeaderContainer>
        <DayNavigator session={session} />
      </HeaderContainer>
      <EncounterContainer key="container">
        <CharacterNavigation
          browserState={browserState}
          setBrowserState={setBrowserState}
          gmMode={gmMode}
        />
        <ScrollContainer>
          <CreatureEncounterSection
            setCreatureEdit={setCreatureEdit}
            encounter={creatureEncounter}
            setCreatureEncounter={setCreatureEncounter}
            onDeleteCreature={onDeleteCreature}
          />
        </ScrollContainer>
      </EncounterContainer>
      <FooterCenterContainer>
        <ResetCreatureEncounter setCreatureEncounter={setCreatureEncounter} />
        <TimeTrackBox session={session} />
      </FooterCenterContainer>
    </>
  );
}

export default GameMaster;
