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

import CharacterNavigation from "./components/NavigationControl/CharacterNavigation";
import InventoryNavigation from "./components/NavigationControl/InventoryNavigation";
import ActiveControls from "./components/ActiveControls";
import EmptyNavigation from "./components/NavigationControl/EmptyNavigation";
import ResourcesBox from "./components/ResourcesBox";
import XpBox from "./components/XpBox";

import CharacterNameBox from "./components/CharacterNameBox";
import { useState, useRef, useContext } from "react";
import AbilityBrowser from "./components/Modals/AbilityBrowser";
import AbilitySection from "./components/Sections/AbilitySection";
import CombatSection from "./components/Sections/CombatSection";
import DiceSection from "./components/Sections/DiceSection";
import SearchAbilityBox from "./components/SearchAbilityBox";
import SearchItemBox from "./components/SearchItemBox";
import { AbilityEntry, ItemEntry } from "./Types";
import SecondaryStatsControls from "./components/StatsControls/SecondaryStatsControls";
import { CharacterContext } from "./contexts/CharacterContext";

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

const FooterCenterContainer = styled.div`
  display: flex;
  flex-direction: row;
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

const CombatContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin: 20px;
  gap: 20px;
  height: 100%;
  overflow: scroll;
  scrollbar-width: none !important;
`;

const BrowserContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 20px;
  gap: 20px;
  height: 100%;
  overflow: scroll;
  scrollbar-width: none !important;
`;

function App() {
  const [browserState, setBrowserState] = useState(0);
  const [inventoryState, setInventoryState] = useState(1);
  const [abilityList, setAbilityList] = useState<AbilityEntry[]>([]);
  const [itemList, setItemList] = useState<ItemEntry[]>([]);
  const { character } = useContext(CharacterContext);
  const [gmMode, setGmMode] = useState<boolean>(true);

  const scrollableRef = useRef(null);
  return (
    <UserProvider>
      <SessionProvider>
        <CharacterProvider>
          <WebSocketProvider>
            <Row>
              <Column>
                <HeaderContainer>
                  <SearchItemBox
                    itemList={itemList}
                    setList={setItemList}
                    browserState={browserState}
                  />
                  <SearchAbilityBox
                    itemList={abilityList}
                    setList={setAbilityList}
                    browserState={browserState}
                  />
                </HeaderContainer>
                <BrowserContainer>
                  <EquipmentBrowser
                    browserState={browserState}
                    itemList={itemList}
                    setItemList={setItemList}
                    setInventoryState={setInventoryState}
                  />
                  <AbilityBrowser
                    browserState={browserState}
                    abilityList={abilityList}
                    setAbilityList={setAbilityList}
                    setInventoryState={setInventoryState}
                  />
                </BrowserContainer>
                <FooterContainer></FooterContainer>
              </Column>
              <Column>
                {gmMode ? (
                  <>
                    <HeaderContainer>
                      <EmptyNavigation />

                      <CharacterNameBox />
                    </HeaderContainer>
                    <StatsContainer>
                      <CharacterNavigation
                        browserState={browserState}
                        setBrowserState={setBrowserState}
                        setGmMode={setGmMode}
                      />
                      <HealthBox />
                      <StatsControls />
                    </StatsContainer>
                    <FooterCenterContainer></FooterCenterContainer>
                  </>
                ) : (
                  <>
                    <HeaderContainer>
                      <EmptyNavigation />
                      <CharacterNameBox />
                      <XpBox />
                    </HeaderContainer>
                    <StatsContainer>
                      <CharacterNavigation
                        browserState={browserState}
                        setBrowserState={setBrowserState}
                        setGmMode={setGmMode}
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
                      <EmptyNavigation />
                      <ResourcesBox />
                    </FooterCenterContainer>
                  </>
                )}
              </Column>
              <Column>
                <CombatContainer ref={scrollableRef}>
                  <CombatSection scrollRef={scrollableRef} />
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

export default App;
