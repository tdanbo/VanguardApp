import styled from "styled-components";
import { CharacterEntry, SessionEntry } from "../Types";
import CharacterNavigation from "../components/NavigationControl/CharacterNavigation";
import EmptyNavigation from "../components/NavigationControl/EmptyNavigation";
import InventoryNavigation from "../components/NavigationControl/InventoryNavigation";
import XpBox from "../CharacterSheet/XpBox";
import CharacterNameBox from "../CharacterSheet/CharacterNameBox";
import HealthBox from "../CharacterSheet/HealthBox";
import StatsControls from "../CharacterSheet/StatsControls";
import ActiveControls from "../CharacterSheet/ActiveControls";
import SecondaryStatsControls from "../CharacterSheet/SecondaryStatsControls";
import RestBox from "../CharacterSheet/RestBox";
import ResourcesBox from "../CharacterSheet/ResourcesBox";
import InventorySection from "../CharacterSheet/InventorySection";
import AbilitySection from "../CharacterSheet/AbilitySection";

const StatsContainer = styled.div`
  display: flex;
  margin: 20px;
  gap: 20px;
`;

const HealthContainer = styled.div`
  display: flex;
  margin: 20px;
  gap: 20px;
`;

const InventoryContainer = styled.div`
  display: flex;
  flex-direction: row;

  margin: 20px;
  gap: 20px;

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

const FooterCenterContainer = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 50px;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 5px;
  gap: 20px;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 50px;
  margin-left: 90px;
  margin-top: 5px;
  gap: 20px;
  height: 50px;
`;

type CharacterSheetProps = {
  websocket: WebSocket;
  session: SessionEntry;
  character: CharacterEntry;
  browserState: number;
  setBrowserState: (value: number) => void;
  gmMode: boolean;
  inventoryState: number;
  setInventoryState: (value: number) => void;
  setGmMode: React.Dispatch<React.SetStateAction<boolean>>;
  setSession: React.Dispatch<React.SetStateAction<SessionEntry>>;
  setIsJoinOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isGm: boolean;
  isCreature: boolean;
  setCharacterName: React.Dispatch<React.SetStateAction<string>>;
};

function CharacterSheet({
  websocket,
  session,
  character,
  browserState,
  setBrowserState,
  gmMode,
  inventoryState,
  setInventoryState,
  setGmMode,
  setSession,
  isGm,
  isCreature,
}: CharacterSheetProps) {
  return (
    <>
      <HeaderContainer>
        <CharacterNameBox character={character} />
        <XpBox
          websocket={websocket}
          session={session}
          character={character}
          isCreature={isCreature}
        />
      </HeaderContainer>
      <StatsContainer key="container">
        <CharacterNavigation
          browserState={browserState}
          setBrowserState={setBrowserState}
          gmMode={gmMode}
          setGmMode={setGmMode}
          setSession={setSession}
          isGm={isGm}
        />
        <HealthBox
          websocket={websocket}
          session={session}
          character={character}
          isCreature={isCreature}
        />
        <StatsControls
          websocket={websocket}
          session={session}
          character={character}
          isCreature={isCreature}
        />
      </StatsContainer>
      <HealthContainer>
        <EmptyNavigation />
        <ActiveControls
          websocket={websocket}
          session={session}
          character={character}
          isCreature={isCreature}
        />
        <SecondaryStatsControls character={character} />
      </HealthContainer>
      <InventoryContainer>
        <InventoryNavigation
          character={character}
          inventoryState={inventoryState}
          setInventoryState={setInventoryState}
          gmMode={gmMode}
          session={session}
          websocket={websocket}
          isCreature={isCreature}
        />
        <ScrollContainer>
          <InventorySection
            session={session}
            inventoryState={inventoryState}
            character={character}
            websocket={websocket}
            isCreature={isCreature}
          />
          <AbilitySection
            session={session}
            inventoryState={inventoryState}
            character={character}
            websocket={websocket}
            isCreature={isCreature}
          />
        </ScrollContainer>
      </InventoryContainer>
      <FooterCenterContainer>
        <RestBox
          character={character}
          session={session}
          websocket={websocket}
          isCreature={isCreature}
        />
        <ResourcesBox
          character={character}
          session={session}
          websocket={websocket}
          isCreature={isCreature}
        />
      </FooterCenterContainer>
    </>
  );
}

export default CharacterSheet;
