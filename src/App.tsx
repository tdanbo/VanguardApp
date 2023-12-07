import "./App.css";
import "./index.css";

import * as Constants from "./Constants";
import styled from "styled-components";
import CharacterProvider from "./contexts/CharacterContext";
import UserProvider from "./contexts/UserContext";
import SessionProvider from "./contexts/SessionContext";

import EquipmentBrowser from "./components/Modals/EquipmentBrowser";

import { useState, useRef, useEffect } from "react";
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
  SessionEntry,
  EmptySession,
  EmptyCharacter,
} from "./Types";

import CreatureBrowser from "./components/Modals/CreatureBrowser";
import RosterBrowser from "./components/Modals/RosterBrowser";
import EquipmentFooter from "./components/FooterNavigation/EquipmentFooter";
import AbilityFooter from "./components/FooterNavigation/AbilityFooter";
import MonsterFooter from "./components/FooterNavigation/MonsterFooter";
import TradingFooter from "./components/FooterNavigation/TradingFooter";
import SearchRosterBox from "./components/SearchRosterBox";
import SearchCreatureBox from "./components/SearchCreatureBox";

import CharacterSheet from "./character/CharacterSheet";
import GameMaster from "./gamemaster/GameMaster";

import useWebSocket from "./websocket";

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

const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: ${Constants.BACKGROUND};
  height: 100%;
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
import SelectorNavigation from "./components/NavigationControl/SelectorNavigation";
import { getSession } from "./functions/SessionsFunctions";

function App() {
  // This function is the main function for setting the session.

  const [session, setSession] = useState<SessionEntry>(EmptySession);
  const [characterName, setCharacterName] = useState<string>("");

  const websocketURL = Constants.WEBSOCKET + session.id;
  console.log(websocketURL);
  const websocket = useWebSocket(websocketURL);

  const sessionCharacter =
    session.characters.find((entry) => entry.name === characterName) ||
    EmptyCharacter;

  const [browserState, setBrowserState] = useState(0);
  const [inventoryState, setInventoryState] = useState(1);
  const [abilityList, setAbilityList] = useState<AbilityEntry[]>([]);
  const [itemList, setItemList] = useState<ItemEntry[]>([]);
  const [monsterList, setMonsterList] = useState<CreatureEntry[]>([]);
  const [creatureList, setCreatureList] = useState<CharacterEntry[]>([]);
  const [rosterlist, setRosterList] = useState<CharacterEntry[]>([]);
  const [gmMode, setGmMode] = useState<boolean>(true);
  const [creatureEncounter, setCreatureEncounter] = useState<CharacterEntry[]>(
    [],
  );

  const [mainCharacter, setMainCharacter] = useState<
    CharacterEntry | undefined
  >();

  const [creatureEdit, setCreatureEdit] = useState<boolean>(false);

  const onDeleteCreature = (id: string) => {
    setCreatureEncounter((currentEncounter) =>
      currentEncounter.filter((creature) => creature.id !== id),
    );
  };

  const scrollableRef = useRef(null);

  useEffect(() => {
    if (websocket) {
      websocket.onmessage = (message) => {
        console.log("Message Received");
        console.log(message);
        getSession(session.id).then((data) => {
          setSession(data);
        });
      };
    }
  }, [websocket, session]);

  console.log("Session Joined");
  console.log(session);

  return (
    <UserProvider>
      <SessionProvider>
        <CharacterProvider>
          <Row>
            <Column>
              <HeaderContainer>
                <SelectorNavigation
                  gmMode={gmMode}
                  setGmMode={setGmMode}
                  setSession={setSession}
                />
                <SearchRosterBox
                  rosterlist={rosterlist}
                  setList={setRosterList}
                  browserState={browserState}
                />
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
                <CreatureBrowser
                  browserState={browserState}
                  creatureList={creatureList}
                  creatureEncounter={creatureEncounter}
                  setCreatureEncounter={setCreatureEncounter}
                  setCreatureEdit={setCreatureEdit}
                  gmMode={gmMode}
                />
                <RosterBrowser
                  session={session}
                  setCharacterName={setCharacterName}
                  browserState={browserState}
                  rosterlist={rosterlist}
                  creatureEncounter={creatureEncounter}
                  setCreatureEncounter={setCreatureEncounter}
                  setCreatureEdit={setCreatureEdit}
                  gmMode={gmMode}
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
              {gmMode ? (
                creatureEdit ? (
                  <CharacterSheet
                    websocket={websocket}
                    session={session}
                    sessionCharacter={sessionCharacter}
                    browserState={browserState}
                    setBrowserState={setBrowserState}
                    gmMode={gmMode}
                    inventoryState={inventoryState}
                    setInventoryState={setInventoryState}
                    setGmMode={setGmMode}
                    setCreatureEdit={setCreatureEdit}
                    mainCharacter={mainCharacter}
                    setMainCharacter={setMainCharacter}
                  />
                ) : (
                  <GameMaster
                    browserState={browserState}
                    setBrowserState={setBrowserState}
                    gmMode={gmMode}
                    creatureEncounter={creatureEncounter}
                    setCreatureEncounter={setCreatureEncounter}
                    onDeleteCreature={onDeleteCreature}
                    setGmMode={setGmMode}
                    setMainCharacter={setMainCharacter}
                    setCreatureEdit={setCreatureEdit}
                  />
                )
              ) : (
                <CharacterSheet
                  websocket={websocket}
                  session={session}
                  sessionCharacter={sessionCharacter}
                  browserState={browserState}
                  setBrowserState={setBrowserState}
                  gmMode={gmMode}
                  inventoryState={inventoryState}
                  setInventoryState={setInventoryState}
                  setGmMode={setGmMode}
                  setCreatureEdit={setCreatureEdit}
                  mainCharacter={mainCharacter}
                  setMainCharacter={setMainCharacter}
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
