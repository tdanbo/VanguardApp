import "./App.css";
import "./index.css";

import AbilitySection from "./components/Sections/AbilitySection";

import DetailsSection from "./components/Sections/DetailsSection";
import InventorySection from "./components/Sections/InventorySection";
import EquipmentSection from "./components/Sections/EquipmentSection";
import ActiveSection from "./components/Sections/ActiveSection";
import ModifierSection from "./components/Sections/ModifierSection";

import CombatSection from "./components/Sections/CombatSection";
import DiceSection from "./components/Sections/DiceSection";

import * as Constants from "./Constants";
import styled from "styled-components";
import CharacterProvider from "./contexts/CharacterContext";
import UserProvider from "./contexts/UserContext";
import SessionProvider from "./contexts/SessionContext";
import { WebSocketProvider } from "./contexts/WebSocketContext";

import CorruptionBox from "./components/CorruptionBox";
import ToughnessBox from "./components/ToughnessBox/ToughnessBox";
import StatsControls from "./components/StatsControls/StatsControls";
import PortraitBox from "./components/PortraixBox/PortraitBox";
import EquipmentBrowser from "./components/Modals/EquipmentBrowser";
import CorruptionControls from "./components/CorruptionControls/CorruptionControls";

import {
  onAddToughness,
  onSubToughness,
  onAddPermCorruption,
  onSubPermCorruption,
} from "./functions/CharacterFunctions";
import AbilityBrowser from "./components/Modals/AbilityBrowser";

import Navigator from "./components/Navigation/Navigator";

function App() {
  const Row = styled.div`
    display: flex;
    flex-direction: row;
    background-color: rgb(45, 99, 99);
    height: 100%;
  `;
  const Column = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: rgb(45, 99, 99);
    height: 100%;
  `;

  const ColumnM = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: rgb(60, 120, 99);
    height: 100%;
  `;

  const StatsContainer = styled.div`
    display: flex;
    background-color: rgb(255, 150, 0);
    height: 85%;
    margin: 20px;
    gap: 20px;
  `;

  const HealthContainer = styled.div`
    display: flex;
    background-color: rgb(255, 150, 0);
    height: 15%;
    margin: 20px;
    gap: 20px;
  `;

  const NavigationContainer = styled.div`
    display: flex;
    background-color: rgb(255, 150, 0);
    height: 15%;
    margin: 20px;
    gap: 20px;
  `;

  const InventoryContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: rgb(255, 150, 0);
    height: 85%;
    overflow: scroll;
    scrollbar-width: none;
    margin: 20px;
    gap: 20px;
  `;

  return (
    <UserProvider>
      <SessionProvider>
        <CharacterProvider>
          <WebSocketProvider>
            <Row>
              <Column></Column>
              <ColumnM>
                <StatsContainer>
                  <PortraitBox />
                  <StatsControls />
                </StatsContainer>
                <HealthContainer>
                  <CorruptionControls />
                  <ToughnessBox
                    onAddFunction={onAddToughness}
                    onSubFunction={onSubToughness}
                  />
                </HealthContainer>
                <NavigationContainer>
                  <EquipmentBrowser />
                  <Navigator navigation={"Combat"} />
                  <Navigator navigation={"Inventory"} />
                  <Navigator navigation={"Consumables"} />
                  <AbilityBrowser />
                </NavigationContainer>
                <InventoryContainer>
                  <InventorySection />
                </InventoryContainer>
              </ColumnM>
              <Column></Column>
            </Row>
          </WebSocketProvider>
        </CharacterProvider>
      </SessionProvider>
    </UserProvider>
  );
}

{
  /* <EquipmentSection />
<AbilitySection /> 
<ActiveSection />
<ModifierSection />
<DetailsSection 
<RestBox />
        <StatSettings />
/>*/
}

export default App;
