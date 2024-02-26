import "../App.css";

import styled from "styled-components";
import * as Constants from "../Constants";

import { useEffect, useRef, useState } from "react";

import {
  AbilityEntry,
  ActiveStateType,
  AdvantageType,
  CharacterEntry,
  EmptyCharacter,
  EmptySession,
  SessionEntry,
} from "../Types";
import CharacterSheet from "./CharacterSheet";
import GameMaster from "../components_gamemaster/GameMaster";

import axios from "axios";

import { API } from "../Constants";
import { ItemEntry } from "../Types";
import JoinComponent from "../components_general/JoinComponent";
import useSocketIO from "../socketio";
import CombatSection from "./CombatSection";
import Browser from "./Browser";

const Row = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

function App() {
  // This function is the main function for setting the session.
  const [activeState, setActiveState] = useState<ActiveStateType>("");
  const [advantage, setAdvantage] = useState<AdvantageType>("");
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
      <Browser
        session={session}
        character={character}
        websocket={websocket}
        setCharacterName={setCharacterName}
        isGm={isGm}
        setGmMode={setGmMode}
        categorySelect={categorySelect}
        setCategorySelect={setCategorySelect}
        setSearch={setSearch}
        HideBrowser={HideBrowser}
        setHideBrowser={setHideBrowser}
        setInventoryState={setInventoryState}
        gmMode={gmMode}
        isCreature={isCreature}
        search={search}
        equipment={equipment}
        abilities={abilities}
        creaturesList={creaturesList}
        setCreaturesList={setCreaturesList}
        advantage={advantage}
        activeState={activeState}
        setActiveState={setActiveState}
        setIsCreature={setIsCreature}
        setAdvantage={setAdvantage}
      />
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
          setActiveState={setActiveState}
          setAdvantage={setAdvantage}
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
      <CombatSection
        character={character}
        scrollRef={scrollableRef}
        session={session}
        websocket={websocket}
        setCharacterName={setCharacterName}
        setIsCreature={setIsCreature}
        isCreature={isCreature}
        isConnected={isConnected}
        isGm={isGm}
        gmMode={gmMode}
        setGmMode={setGmMode}
        setActiveState={setActiveState}
        setAdvantage={setAdvantage}
      />
    </Row>
  );
}

export default App;
