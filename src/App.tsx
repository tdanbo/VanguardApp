import "./App.css";
import "./index.css";

import styled from "styled-components";
import * as Constants from "./Constants";

import EquipmentBrowser from "./components/Modals/EquipmentBrowser";

import { useRef, useState } from "react";
import AbilityBrowser from "./components/Modals/AbilityBrowser";

import {
  AbilityEntry,
  CharacterEntry,
  CreatureEntry,
  EmptyCharacter,
  EmptySession,
  ItemEntry,
  SessionEntry,
} from "./Types";
import CombatSection from "./components/Sections/CombatSection";
import DiceSection from "./components/Sections/DiceSection";

import AbilityFooter from "./components/FooterNavigation/AbilityFooter";
import EquipmentFooter from "./components/FooterNavigation/EquipmentFooter";
import MonsterFooter from "./components/FooterNavigation/MonsterFooter";
import TradingFooter from "./components/FooterNavigation/TradingFooter";
import CreatureBrowser from "./components/Modals/CreatureBrowser";
import RosterBrowser from "./components/Modals/RosterBrowser";

import CharacterSheet from "./charactersheet/CharacterSheet";
import GameMaster from "./gamemaster/GameMaster";

import SelectorNavigation from "./components/NavigationControl/SelectorNavigation";
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

function App() {
  // This function is the main function for setting the session.

  const [session, setSession] = useState<SessionEntry>(EmptySession);
  const [characterName, setCharacterName] = useState<string>("");

  const url = Constants.WEBSOCKET + session.id;

  const character =
    session.characters.find((entry) => entry.name === characterName) ||
    EmptyCharacter;

  const [browserState, setBrowserState] = useState(0);
  const [inventoryState, setInventoryState] = useState(1);
  const [abilityList, setAbilityList] = useState<AbilityEntry[]>([]);
  const [itemList, setItemList] = useState<ItemEntry[]>([]);
  const [monsterList, setMonsterList] = useState<CreatureEntry[]>([]);
  const [creatureList, setCreatureList] = useState<CharacterEntry[]>([]);
  const [rosterlist, setRosterList] = useState<CharacterEntry[]>([]);
  const [gmMode, setGmMode] = useState<boolean>(false);
  const [creatureEncounter, setCreatureEncounter] = useState<CharacterEntry[]>(
    [],
  );

  const [creatureEdit, setCreatureEdit] = useState<boolean>(false);

  const onDeleteCreature = (id: string) => {
    setCreatureEncounter((currentEncounter) =>
      currentEncounter.filter((creature) => creature.id !== id),
    );
  };

  const scrollableRef = useRef(null);

  console.log("-------------------");
  console.log("Rendering Application");
  console.log("Attempting to connect to: " + url);
  const websocket = useWebSocket(url, setSession);

  // console.log(session);

  return (
    <Row>
      <Column>
        <HeaderContainer>
          <SelectorNavigation
            gmMode={gmMode}
            setGmMode={setGmMode}
            setSession={setSession}
          />
          {/* <SearchRosterBox
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
          /> */}
        </HeaderContainer>
        <BrowserContainer>
          <EquipmentBrowser
            session={session}
            character={character}
            websocket={websocket}
            browserState={browserState}
            itemList={itemList}
            setItemList={setItemList}
            setInventoryState={setInventoryState}
            gmMode={gmMode}
          />
          <AbilityBrowser
            session={session}
            character={character}
            websocket={websocket}
            browserState={browserState}
            abilityList={abilityList}
            setAbilityList={setAbilityList}
            setInventoryState={setInventoryState}
          />
          <CreatureBrowser
            session={session}
            character={character}
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
              <TradingFooter itemList={itemList} setItemList={setItemList} />
            ) : (
              <EquipmentFooter itemList={itemList} setItemList={setItemList} />
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
              character={character}
              browserState={browserState}
              setBrowserState={setBrowserState}
              gmMode={gmMode}
              inventoryState={inventoryState}
              setInventoryState={setInventoryState}
              setGmMode={setGmMode}
              setCreatureEdit={setCreatureEdit}
            />
          ) : (
            <GameMaster
              session={session}
              browserState={browserState}
              setBrowserState={setBrowserState}
              gmMode={gmMode}
              creatureEncounter={creatureEncounter}
              setCreatureEncounter={setCreatureEncounter}
              onDeleteCreature={onDeleteCreature}
              setGmMode={setGmMode}
              setCreatureEdit={setCreatureEdit}
            />
          )
        ) : (
          <CharacterSheet
            websocket={websocket}
            session={session}
            character={character}
            browserState={browserState}
            setBrowserState={setBrowserState}
            gmMode={gmMode}
            inventoryState={inventoryState}
            setInventoryState={setInventoryState}
            setGmMode={setGmMode}
            setCreatureEdit={setCreatureEdit}
          />
        )}
      </Column>
      <Column>
        <CombatContainer ref={scrollableRef}>
          <CombatSection scrollRef={scrollableRef} session={session} />
        </CombatContainer>
        <FooterRightContainer>
          <DiceSection />
        </FooterRightContainer>
      </Column>
    </Row>
  );
}

export default App;
