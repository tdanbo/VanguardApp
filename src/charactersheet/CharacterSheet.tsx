import InventorySection from "./InventorySection";
import HealthBox from "./HealthBox";
import StatsControls from "./StatsControls";
import InventoryNavigation from "../components/NavigationControl/InventoryNavigation";
import ActiveControls from "./ActiveControls";
import EmptyNavigation from "../components/NavigationControl/EmptyNavigation";
import ResourcesBox from "./ResourcesBox";
import AbilitySection from "./AbilitySection";
import SecondaryStatsControls from "./SecondaryStatsControls";
import RestBox from "./RestBox";
import CharacterNavigation from "../components/NavigationControl/CharacterNavigation";
import styled from "styled-components";
import XpBox from "./XpBox";
import CharacterNameBox from "./CharacterNameBox";
import * as Constants from "../Constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { CharacterEntry, SessionEntry } from "../Types";
import { deleteSessionCharacter } from "../functions/SessionsFunctions";
import { deleteCreature } from "../functions/CharacterFunctions";
import {
  postSelectedCharacter,
  addNewRoster,
} from "../functions/CharacterFunctions";
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

const Button = styled.button`
  display: flex;
  flex: 1;
  flex-grow: 1;
  border-radius: ${Constants.BORDER_RADIUS};
  justify-content: center;
  align-items: center;
  font-size: 15px;
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  border: 1px solid ${Constants.WIDGET_BORDER};
  color: ${Constants.WIDGET_SECONDARY_FONT};
  height: 35px;
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
  setCreatureEdit: React.Dispatch<React.SetStateAction<boolean>>;
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
  setCreatureEdit,
}: CharacterSheetProps) {
  return (
    <>
      <HeaderContainer>
        <CharacterNameBox character={character} />
        <XpBox websocket={websocket} session={session} character={character} />
      </HeaderContainer>
      <StatsContainer key="container">
        <CharacterNavigation
          browserState={browserState}
          setBrowserState={setBrowserState}
          gmMode={gmMode}
        />
        <HealthBox character={character} />
        <StatsControls character={character} />
      </StatsContainer>
      <HealthContainer>
        <EmptyNavigation />
        <ActiveControls character={character} session={session} />
        <SecondaryStatsControls character={character} />
      </HealthContainer>
      <InventoryContainer>
        <InventoryNavigation
          inventoryState={inventoryState}
          setInventoryState={setInventoryState}
          setCreatureEdit={setCreatureEdit}
          gmMode={gmMode}
        />
        <ScrollContainer>
          <InventorySection
            session={session}
            inventoryState={inventoryState}
            character={character}
          />
          <AbilitySection
            session={session}
            inventoryState={inventoryState}
            character={character}
          />
        </ScrollContainer>
      </InventoryContainer>
      <FooterCenterContainer>
        <RestBox character={character} session={session} />
        <ResourcesBox character={character} />
      </FooterCenterContainer>
    </>
  );
}

export default CharacterSheet;
