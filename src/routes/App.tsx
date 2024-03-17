import "../App.css";

import styled from "styled-components";
import * as Constants from "../Constants";

import { useRef, useState } from "react";

import {
  ActiveStateType,
  AdvantageType,
  NewCharacterEntry,
  EmptySession,
  SessionEntry,
} from "../Types";
import CharacterSheet from "./CharacterSheet";
import GameMaster from "../components_gamemaster/GameMaster";

import useSocketIO from "../socketio";
import CombatSection from "./CombatSection";
import Browser from "./Browser";

import { GetGameData } from "../contexts/GameContent";

const Row = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

function App() {
  console.log("-------------------");
  console.log("RERENDERING APP");
  const { creatures } = GetGameData();
  // This function is the main function for setting the session.
  const [activeState, setActiveState] = useState<ActiveStateType>("");
  const [advantage, setAdvantage] = useState<AdvantageType>("");
  const [session, setSession] = useState<SessionEntry>(EmptySession);
  const [isCreature, setIsCreature] = useState<boolean>(false);
  const [isGm, setIsGm] = useState<boolean>(false);
  const [gmMode, setGmMode] = useState<boolean>(false);
  const [browserState, setBrowserState] = useState(0);
  const [inventoryState, setInventoryState] = useState(1);

  const [characterId, setCharacterId] = useState<string>("");

  const scrollableRef = useRef(null);
  const websocket = useSocketIO(Constants.API, setSession);

  const character = isCreature
    ? creatures.find((entry) => entry.id === characterId) || NewCharacterEntry
    : session.characters.find((entry) => entry.id === characterId) ||
      NewCharacterEntry;

  return (
    <Row>
      <Browser
        session={session}
        character={character}
        websocket={websocket}
        isGm={isGm}
        setGmMode={setGmMode}
        setInventoryState={setInventoryState}
        gmMode={gmMode}
        isCreature={isCreature}
        advantage={advantage}
        activeState={activeState}
        setActiveState={setActiveState}
        setIsCreature={setIsCreature}
        setAdvantage={setAdvantage}
        setCharacterId={setCharacterId}
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
          isCreature={isCreature}
          setIsCreature={setIsCreature}
          advantage={advantage}
          activeState={activeState}
          setActiveState={setActiveState}
          setAdvantage={setAdvantage}
          setCharacterId={setCharacterId}
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
          isCreature={isCreature}
          advantage={advantage}
          setAdvantage={setAdvantage}
          activeState={activeState}
          setActiveState={setActiveState}
          setCharacterId={setCharacterId}
        />
      )}
      <CombatSection
        character={character}
        scrollRef={scrollableRef}
        session={session}
        websocket={websocket}
        setCharacterId={setCharacterId}
        setIsCreature={setIsCreature}
        isCreature={isCreature}
        isGm={isGm}
        gmMode={gmMode}
        setGmMode={setGmMode}
        setActiveState={setActiveState}
        setAdvantage={setAdvantage}
        setSession={setSession}
        setIsGm={setIsGm}
      />
    </Row>
  );
}

export default App;
