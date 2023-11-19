import InventorySection from "../components/Sections/InventorySection";
import HealthBox from "../components/HealthBox";
import StatsControls from "../components/StatsControls/StatsControls";
import InventoryNavigation from "../components/NavigationControl/InventoryNavigation";
import ActiveControls from "../components/ActiveControls";
import EmptyNavigation from "../components/NavigationControl/EmptyNavigation";
import ResourcesBox from "../components/ResourcesBox";
import AbilitySection from "../components/Sections/AbilitySection";
import SecondaryStatsControls from "../components/StatsControls/SecondaryStatsControls";
import RestBox from "../components/RestBox";
import CharacterNavigation from "../components/NavigationControl/CharacterNavigation";
import styled from "styled-components";

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

type CharacterSheetProps = {
  browserState: number;
  setBrowserState: (value: number) => void;
  gmMode: boolean;
  inventoryState: number;
  setInventoryState: (value: number) => void;
};

function CharacterSheet({
  browserState,
  setBrowserState,
  gmMode,
  inventoryState,
  setInventoryState,
}: CharacterSheetProps) {
  return (
    <>
      <StatsContainer key="container">
        <CharacterNavigation
          browserState={browserState}
          setBrowserState={setBrowserState}
          gmMode={gmMode}
        />
        <HealthBox />
        <StatsControls />
      </StatsContainer>
      <HealthContainer>
        <EmptyNavigation />
        <ActiveControls />
        <SecondaryStatsControls />
      </HealthContainer>
      <InventoryContainer>
        <InventoryNavigation
          inventoryState={inventoryState}
          setInventoryState={setInventoryState}
        />
        <ScrollContainer>
          <InventorySection inventoryState={inventoryState} />
          <AbilitySection inventoryState={inventoryState} />
        </ScrollContainer>
      </InventoryContainer>
      <FooterCenterContainer>
        <RestBox />
        <ResourcesBox />
      </FooterCenterContainer>
    </>
  );
}

export default CharacterSheet;
