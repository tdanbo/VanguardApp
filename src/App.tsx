import "./App.css";
import "./index.css";

import InventorySection from "./components/Sections/InventorySection";

import * as Constants from "./Constants";
import styled from "styled-components";
import CharacterProvider from "./contexts/CharacterContext";
import UserProvider from "./contexts/UserContext";
import SessionProvider from "./contexts/SessionContext";
import { WebSocketProvider } from "./contexts/WebSocketContext";
import HealthBox from "./components/HealthBox";
import StatsControls from "./components/StatsControls/StatsControls";
import EquipmentBrowser from "./components/Modals/EquipmentBrowser";
import CorruptionControls from "./components/CorruptionControls/CorruptionControls";

import CharacterNavigation from "./components/NavigationControl/CharacterNavigation";
import HealthNavigation from "./components/NavigationControl/HealthNavigation";
import InventoryNavigation from "./components/NavigationControl/InventoryNavigation";
import ActiveControls from "./components/ActiveControls";

import OverburdenBox from "./components/OverburdenBox";
import CurrencyBox from "./components/CurrencyBox";
import XpBox from "./components/XpBox";

import { onAddUnspentXp } from "./functions/CharacterFunctions";
import { onSubUnspentXp } from "./functions/CharacterFunctions";
import CharacterNameBox from "./components/CharacterNameBox";
import { useContext, useState } from "react";

import { CharacterContext } from "./contexts/CharacterContext";
import SelectorComponent from "./components/SelectorPage/Selector";
import RationsBox from "./components/RationsBox";
import AbilityBrowser from "./components/Modals/AbilityBrowser";
import AbilitySection from "./components/Sections/AbilitySection";
import CombatSection from "./components/Sections/CombatSection";
import DiceSection from "./components/Sections/DiceSection";

const Row = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 50px;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 5px;
  gap: 20px;
`;

const FooterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end; // Align children to the right
  min-height: 50px;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 5px;
  gap: 20px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: ${Constants.BACKGROUND};
  height: 100%;
`;

const ColumnNarrow = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${Constants.BACKGROUND};
  height: 100%;
  width: 50px;
`;

const StatsContainer = styled.div`
  display: flex;
  margin: 20px;
  gap: 20px;
  height: 40%;
`;

const HealthContainer = styled.div`
  display: flex;
  margin: 20px;
  gap: 20px;
  height: 10%;
`;

const InventoryContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px;
  gap: 20px;
  height: 50%;
  overflow: scroll;
`;

const CombatContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px;
  gap: 20px;
  height: 100%;
  overflow: scroll;
`;

const NavigationTop = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 75px;
  margin-bottom: 20px;
  height: 40%;
`;

const NavigationMid = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-bottom: 20px;
  height: 10%;
`;

const NavigationBot = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-bottom: 75px;
  height: 50%;
`;

const BrowserContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px;
  margin-bottom: 75px;
  gap: 20px;
  height: 100%;
  overflow: scroll;
`;

function App() {
  const [browserState, setBrowserState] = useState(0);
  const [inventoryState, setInventoryState] = useState(0);
  return (
    <UserProvider>
      <SessionProvider>
        <CharacterProvider>
          <WebSocketProvider>
            <SelectorComponent />
            <Row>
              <Column>
                <BrowserContainer>
                  <EquipmentBrowser browserState={browserState} />
                  <AbilityBrowser browserState={browserState} />
                </BrowserContainer>
              </Column>
              <ColumnNarrow>
                <NavigationTop>
                  <CharacterNavigation
                    browserState={browserState}
                    setBrowserState={setBrowserState}
                  />
                </NavigationTop>
                <NavigationMid></NavigationMid>
                <NavigationBot>
                  <InventoryNavigation
                    inventoryState={inventoryState}
                    setInventoryState={setInventoryState}
                  />
                </NavigationBot>
              </ColumnNarrow>
              <Column>
                <HeaderContainer>
                  <CharacterNameBox />
                  <XpBox />
                </HeaderContainer>
                <StatsContainer>
                  <HealthBox />
                  <StatsControls />
                </StatsContainer>
                <HealthContainer>
                  <ActiveControls />
                  <CorruptionControls />
                </HealthContainer>
                <InventoryContainer>
                  <InventorySection inventoryState={inventoryState} />
                  <AbilitySection inventoryState={inventoryState} />
                </InventoryContainer>
                <FooterContainer>
                  <RationsBox />
                  <CurrencyBox />
                </FooterContainer>
              </Column>
              <Column>
                <CombatContainer>
                  <CombatSection />
                </CombatContainer>
                <FooterContainer>
                  <DiceSection />
                </FooterContainer>
              </Column>
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
