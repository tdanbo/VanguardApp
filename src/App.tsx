import "./App.css";
import "./index.css";

import InventorySection from "./components/Sections/InventorySection";

import * as Constants from "./Constants";
import styled from "styled-components";
import CharacterProvider from "./contexts/CharacterContext";
import UserProvider from "./contexts/UserContext";
import SessionProvider from "./contexts/SessionContext";
import HealthBox from "./components/HealthBox";
import StatsControls from "./components/StatsControls/StatsControls";
import EquipmentBrowser from "./components/Modals/EquipmentBrowser";
import CreatureBrowser from "./components/Modals/CreatureBrowser";

import CharacterNavigation from "./components/NavigationControl/CharacterNavigation";
import InventoryNavigation from "./components/NavigationControl/InventoryNavigation";
import ActiveControls from "./components/ActiveControls";
import EmptyNavigation from "./components/NavigationControl/EmptyNavigation";
import DayNavigator from "./components/TravelBox";
import ResourcesBox from "./components/ResourcesBox";
import XpBox from "./components/XpBox";
import SelectorNavigation from "./components/NavigationControl/SelectorNavigation";

import CharacterNameBox from "./components/CharacterNameBox";
import { useState, useRef } from "react";
import AbilityBrowser from "./components/Modals/AbilityBrowser";
import AbilitySection from "./components/Sections/AbilitySection";
import CombatSection from "./components/Sections/CombatSection";
import DiceSection from "./components/Sections/DiceSection";
import SearchAbilityBox from "./components/SearchAbilityBox";
import SearchItemBox from "./components/SearchItemBox";
import SearchCreatureBox from "./components/SearchCreatureBox";
import { AbilityEntry, ItemEntry, CreatureEntry } from "./Types";
import SecondaryStatsControls from "./components/StatsControls/SecondaryStatsControls";
import EncounterSection from "./components/Sections/EncounterSection";
import ResetEncounter from "./components/ResetEncounter";
import GenerateEncounter from "./components/Modals/GenerateEncounter";
import TravelBox from "./components/TimeTrackBox";
import EquipmentFooter from "./components/FooterNavigation/EquipmentFooter";
import AbilityFooter from "./components/FooterNavigation/AbilityFooter";
import CreatureFooter from "./components/FooterNavigation/CreatureFooter";
import TradingFooter from "./components/FooterNavigation/TradingFooter";
import TimeTrackBox from "./components/TimeTrackBox";

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

const FooterLeftContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end; // Align children to the right
  min-height: 50px;
  margin-left: 20px;
  margin-bottom: 5px;
  gap: 20px;
`;

const FooterRightContainer = styled.div`
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
  const [creatureList, setCreatureList] = useState<CreatureEntry[]>([]);
  const [gmMode, setGmMode] = useState<boolean>(true);
  const [encounter, setEncounter] = useState<CreatureEntry[]>([]);

  const onDeleteCreature = (id: string) => {
    setEncounter((currentEncounter) =>
      currentEncounter.filter((creature) => creature.id !== id),
    );
  };

  const scrollableRef = useRef(null);
  return (
    <UserProvider>
      <SessionProvider>
        <CharacterProvider>
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
                <SearchCreatureBox
                  creatureList={creatureList}
                  setList={setCreatureList}
                  browserState={browserState}
                />
              </HeaderContainer>
              <BrowserContainer>
                <EquipmentBrowser
                  browserState={browserState}
                  itemList={itemList}
                  setItemList={setItemList}
                  setInventoryState={setInventoryState}
                  gmMode={gmMode}
                />
                <AbilityBrowser
                  browserState={browserState}
                  abilityList={abilityList}
                  setAbilityList={setAbilityList}
                  setInventoryState={setInventoryState}
                />
                <CreatureBrowser
                  browserState={browserState}
                  creatureList={creatureList}
                  encounter={encounter}
                  setEncounter={setEncounter}
                />
                <GenerateEncounter browserState={browserState} />
              </BrowserContainer>
              <FooterLeftContainer>
                {browserState === 1 ? (
                  gmMode === true ? (
                    <TradingFooter
                      itemList={itemList}
                      setItemList={setItemList}
                    />
                  ) : (
                    <EquipmentFooter
                      itemList={itemList}
                      setItemList={setItemList}
                    />
                  )
                ) : browserState === 2 ? (
                  <AbilityFooter
                    abilityList={abilityList}
                    setAbilityList={setAbilityList}
                  />
                ) : browserState === 3 ? (
                  <CreatureFooter
                    creatureList={creatureList}
                    setCreatureList={setCreatureList}
                  />
                ) : null}
              </FooterLeftContainer>
            </Column>
            <Column>
              <HeaderContainer>
                <SelectorNavigation gmMode={gmMode} setGmMode={setGmMode} />
                {gmMode ? (
                  <>
                    <DayNavigator />
                    <ResetEncounter setEncounter={setEncounter} />
                  </>
                ) : (
                  <>
                    <CharacterNameBox />
                    <XpBox />
                  </>
                )}
              </HeaderContainer>
              {gmMode ? (
                <>
                  <EncounterContainer key="container">
                    <CharacterNavigation
                      browserState={browserState}
                      setBrowserState={setBrowserState}
                      gmMode={gmMode}
                    />
                    <ScrollContainer>
                      <EncounterSection
                        encounter={encounter}
                        setEncounter={setEncounter}
                        onDeleteCreature={onDeleteCreature}
                      />
                    </ScrollContainer>
                  </EncounterContainer>
                  <FooterCenterContainer>
                    <EmptyNavigation />
                    <TimeTrackBox />
                  </FooterCenterContainer>
                </>
              ) : (
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
              <FooterRightContainer>
                <DiceSection />
              </FooterRightContainer>
            </Column>
          </Row>
        </CharacterProvider>
      </SessionProvider>
    </UserProvider>
  );
}

export default App;
