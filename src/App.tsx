import "./App.css";
import "./index.css";

import * as Constants from "./Constants";
import styled from "styled-components";
import CharacterProvider from "./contexts/CharacterContext";
import UserProvider from "./contexts/UserContext";
import SessionProvider from "./contexts/SessionContext";

import EquipmentBrowser from "./components/Modals/EquipmentBrowser";
import MonsterBrowser from "./components/Modals/MonsterBrowser";

import CharacterNavigation from "./components/NavigationControl/CharacterNavigation";

import DayNavigator from "./components/TravelBox";

import XpBox from "./components/XpBox";
import SelectorNavigation from "./components/NavigationControl/SelectorNavigation";

import CharacterNameBox from "./components/CharacterNameBox";
import { useState, useRef } from "react";
import AbilityBrowser from "./components/Modals/AbilityBrowser";

import CombatSection from "./components/Sections/CombatSection";
import DiceSection from "./components/Sections/DiceSection";
import SearchAbilityBox from "./components/SearchAbilityBox";
import SearchItemBox from "./components/SearchItemBox";
import SearchMonsterBox from "./components/SearchMonsterBox";
import {
  AbilityEntry,
  ItemEntry,
  CreatureEntry,
  CharacterEntry,
} from "./Types";

import EncounterSection from "./components/Sections/EncounterSection";
import ResetEncounter from "./components/ResetEncounter";
import CreatureBrowser from "./components/Modals/CreatureBrowser";
import EquipmentFooter from "./components/FooterNavigation/EquipmentFooter";
import AbilityFooter from "./components/FooterNavigation/AbilityFooter";
import MonsterFooter from "./components/FooterNavigation/MonsterFooter";
import TradingFooter from "./components/FooterNavigation/TradingFooter";
import TimeTrackBox from "./components/TimeTrackBox";
import SearchCreatureBox from "./components/SearchCreatureBox";

import CharacterSheet from "./character/CharacterSheet";

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
  const [monsterList, setMonsterList] = useState<CreatureEntry[]>([]);
  const [creatureList, setCreatureList] = useState<CharacterEntry[]>([]);
  const [gmMode, setGmMode] = useState<boolean>(true);
  const [encounter, setEncounter] = useState<CreatureEntry[]>([]);
  const [creatureEncounter, setCreatureEncounter] = useState<CharacterEntry[]>(
    [],
  );

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
                <SearchMonsterBox
                  monsterList={monsterList}
                  setList={setMonsterList}
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
                <MonsterBrowser
                  browserState={browserState}
                  monsterList={monsterList}
                  encounter={encounter}
                  setEncounter={setEncounter}
                />
                <CreatureBrowser
                  browserState={browserState}
                  creatureList={creatureList}
                  creatureEncounter={creatureEncounter}
                  setCreatureEncounter={setCreatureEncounter}
                />
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
                  <MonsterFooter
                    monsterList={monsterList}
                    setMonsterList={setMonsterList}
                  />
                ) : null}
              </FooterLeftContainer>
            </Column>
            <Column>
              <HeaderContainer>
                <SelectorNavigation gmMode={gmMode} setGmMode={setGmMode} />
                {gmMode ? (
                  <DayNavigator />
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
                    <ResetEncounter setEncounter={setEncounter} />
                    <TimeTrackBox />
                  </FooterCenterContainer>
                </>
              ) : (
                <CharacterSheet
                  browserState={browserState}
                  setBrowserState={setBrowserState}
                  gmMode={gmMode}
                  inventoryState={inventoryState}
                  setInventoryState={setInventoryState}
                />
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
