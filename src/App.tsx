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

import CharacterNavigation from "./components/NavigationControl/CharacterNavigation";
import HealthNavigation from "./components/NavigationControl/HealthNavigation";
import InventoryNavigation from "./components/NavigationControl/InventoryNavigation";

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
    margin: 20px;
    gap: 20px;
    height: 40%;
  `;

  const HealthContainer = styled.div`
    display: flex;
    background-color: rgb(255, 150, 0);
    margin: 20px;
    gap: 20px;
    height: 10%;
  `;

  const InventoryContainer = styled.div`
    display: flex;
    flex-direction: row;
    background-color: rgb(255, 150, 0);
    margin: 20px;
    gap: 20px;
    height: 50%;
    overflow: scroll;
  `;

  const ColumnNarrow = styled.div`
    display: flex;
    flex-direction: column;
    background-color: rgb(60, 120, 99);
    height: 100%;
    width: 50px;
  `;

  const NavigationTop = styled.div`
    display: flex;
    flex-direction: column;
    background-color: rgb(255, 150, 0);
    margin-top: 20px;
    margin-bottom: 20px;
    height: 40%;
  `;

  const NavigationMid = styled.div`
    display: flex;
    flex-direction: column;
    background-color: rgb(255, 150, 0);
    margin-top: 20px;
    margin-bottom: 20px;
    height: 10%;
  `;

  const NavigationBot = styled.div`
    display: flex;
    flex-direction: column;
    background-color: rgb(255, 150, 0);
    margin-top: 20px;
    margin-bottom: 20px;
    height: 50%;
  `;

  return (
    <UserProvider>
      <SessionProvider>
        <CharacterProvider>
          <WebSocketProvider>
            <Row>
              <Column></Column>
              <ColumnNarrow>
                <NavigationTop>
                  <CharacterNavigation />
                </NavigationTop>
                <NavigationMid>
                  <HealthNavigation />
                </NavigationMid>
                <NavigationBot>
                  <InventoryNavigation />
                </NavigationBot>
              </ColumnNarrow>
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
