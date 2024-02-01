import "./App.css";
import "./index.css";

import styled from "styled-components";
import * as Constants from "./Constants";

import { useEffect, useRef, useState } from "react";

import PartySection from "./BrowserSection/PartySection";
import {
  AbilityEntry,
  ActiveStateType,
  CharacterEntry,
  EmptyCharacter,
  EmptySession,
  SessionEntry,
} from "./Types";
import CharacterSheet from "./charactersheet/CharacterSheet";
import CombatSection from "./components/Sections/CombatSection";
import GameMaster from "./gamemaster/GameMaster";

import axios from "axios";
import AbilityBrowser from "./BrowserSection/AbilityBrowser";
import BrowserHeader from "./BrowserSection/BrowserHeader";
import CreatureBrowser from "./BrowserSection/CreatureBrowser";
import DropsBrowser from "./BrowserSection/DropsBrowser";
import EquipmentBrowser from "./BrowserSection/EquipmentBrowser";
import { API } from "./Constants";
import { ItemEntry } from "./Types";
import JoinComponent from "./components/JoinComponent";
import useSocketIO from "./socketio";
const Row = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
  background-color: ${Constants.BACKGROUND};
  height: 100%;
  gap: 25px;
  padding: 25px 100px 25px 100px;
  box-sizing: border-box;
`;

const SideColumn = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: ${Constants.BACKGROUND};
  height: 100%;
  gap: 25px;
  padding: 25px 25px 25px 25px;
  box-sizing: border-box;
`;

function App() {
  // This function is the main function for setting the session.
  const [activeState, setActiveState] = useState<ActiveStateType>("normal");
  const [advantage, setAdvantage] = useState<boolean>(false);
  const [search, setSearch] = useState("");
  const [session, setSession] = useState<SessionEntry>(EmptySession);
  const [characterName, setCharacterName] = useState<string>("");
  const [creaturesList, setCreaturesList] = useState<CharacterEntry[]>([]);
  const [isCreature, setIsCreature] = useState<boolean>(false);
  const [isGm, setIsGm] = useState<boolean>(false);
  const [gmMode, setGmMode] = useState<boolean>(false);
  const [isJoinOpen, setisJoinOpen] = useState<boolean>(true);
  const [categorySelect, setCategorySelect] = useState<string>("");
  const [HideBrowser, setHideBrowser] = useState<boolean>(true);
  const url = Constants.WEBSOCKET + session.id;

  const character = isCreature
    ? creaturesList.find((entry) => entry.name === characterName) ||
      EmptyCharacter
    : session.characters.find((entry) => entry.name === characterName) ||
      EmptyCharacter;

  const [browserState, setBrowserState] = useState(0);
  const [inventoryState, setInventoryState] = useState(1);

  useEffect(() => {
    setGmMode(false);
  }, [characterName]);

  const scrollableRef = useRef(null);

  console.log("-------------------");
  console.log("Rendering Application");
  console.log("Session: " + url);

  // const websocket = useWebSocket(url, setSession);
  const [isConnected, setIsConnected] = useState(false);
  const websocket = useSocketIO(Constants.API, setSession, setIsConnected);
  console.log(categorySelect);

  const [equipment, setEquipment] = useState<ItemEntry[]>([]);
  const [abilities, setAbilities] = useState<AbilityEntry[]>([]);

  useEffect(() => {
    const fetchEquipment = async () => {
      const equipmentResponse = await axios.get(`${API}/api/equipment`);
      const abilitiesResponse = await axios.get(`${API}/api/abilities`);

      const filteredAbilities = abilitiesResponse.data.filter(
        (item: AbilityEntry) =>
          !isGm || (item.type !== "monsterous trait" && item.type !== "burden"),
      );

      setEquipment(equipmentResponse.data);
      setAbilities(filteredAbilities);
    };
    fetchEquipment();
  }, []); // Empty dependency array to ensure it runs only once

  return (
    <Row>
      {isJoinOpen ? (
        <JoinComponent
          setGmMode={setGmMode}
          setSession={setSession}
          setIsJoinOpen={setisJoinOpen}
          setIsGm={setIsGm}
        />
      ) : null}
      <SideColumn>
        <BrowserHeader
          session={session}
          websocket={websocket}
          setCharacterName={setCharacterName}
          isGm={isGm}
          categorySelect={categorySelect}
          setCategorySelect={setCategorySelect}
          setSearch={setSearch}
          HideBrowser={HideBrowser}
          setHideBrowser={setHideBrowser}
          // Add the other missing props here
        />
        {categorySelect === "drops" && HideBrowser ? (
          <DropsBrowser
            isGm={isGm}
            session={session}
            character={character}
            websocket={websocket}
            setInventoryState={setInventoryState}
            gmMode={gmMode}
            isCreature={isCreature}
            search={search}
            advantage={advantage}
            activeState={activeState}
          />
        ) : categorySelect === "equipment" && HideBrowser ? (
          <EquipmentBrowser
            session={session}
            character={character}
            websocket={websocket}
            setInventoryState={setInventoryState}
            gmMode={gmMode}
            isCreature={isCreature}
            search={search}
            equipment={equipment}
            isGm={isGm}
            advantage={advantage}
            activeState={activeState}
          />
        ) : categorySelect === "abilities" && HideBrowser ? (
          <AbilityBrowser
            session={session}
            character={character}
            websocket={websocket}
            setInventoryState={setInventoryState}
            isCreature={isCreature}
            search={search}
            abilities={abilities}
            isGm={isGm}
            activeState={activeState}
            advantage={advantage}
          />
        ) : categorySelect === "creatures" && HideBrowser ? (
          <CreatureBrowser
            session={session}
            character={character}
            websocket={websocket}
            search={search}
            gmMode={gmMode}
            setGmMode={setGmMode}
            setCharacterName={setCharacterName}
            setIsCreature={setIsCreature}
            setCreaturesList={setCreaturesList}
            creaturesList={creaturesList}
          />
        ) : null}
      </SideColumn>
      <Column>
        {gmMode ? (
          <GameMaster
            isGm={isGm}
            session={session}
            browserState={browserState}
            setBrowserState={setBrowserState}
            gmMode={gmMode}
            setGmMode={setGmMode}
            websocket={websocket}
            setSession={setSession}
            setIsJoinOpen={setisJoinOpen}
            isCreature={isCreature}
            setIsCreature={setIsCreature}
            setCharacterName={setCharacterName}
            advantage={advantage}
            activeState={activeState}
          />
        ) : (
          <CharacterSheet
            isGm={isGm}
            websocket={websocket}
            session={session}
            setSession={setSession}
            character={character}
            browserState={browserState}
            setBrowserState={setBrowserState}
            gmMode={gmMode}
            inventoryState={inventoryState}
            setInventoryState={setInventoryState}
            setGmMode={setGmMode}
            setIsJoinOpen={setisJoinOpen}
            isCreature={isCreature}
            setCharacterName={setCharacterName}
            advantage={advantage}
            setAdvantage={setAdvantage}
            activeState={activeState}
            setActiveState={setActiveState}
          />
        )}
      </Column>
      <SideColumn>
        <PartySection
          session={session}
          websocket={websocket}
          setCharacterName={setCharacterName}
          setIsCreature={setIsCreature}
          isCreature={isCreature}
          isConnected={isConnected}
          isGm={isGm}
          gmMode={gmMode}
          setGmMode={setGmMode}
        />
        <CombatSection
          scrollRef={scrollableRef}
          session={session}
          character={character}
          websocket={websocket}
          isCreature={isCreature}
        />
      </SideColumn>
    </Row>
  );
}

export default App;
