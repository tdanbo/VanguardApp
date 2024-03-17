import "../App.css";

import styled from "styled-components";
import * as Constants from "../Constants";

import { useRef, useState } from "react";

import {
  ActiveStateType,
  AdvantageType,
  CharacterEntry,
  NewCharacterEntry,
  EmptySession,
  SessionEntry,
} from "../Types";
import CharacterSheet from "./CharacterSheet";
import GameMaster from "../components_gamemaster/GameMaster";

import useSocketIO from "../socketio";
import CombatSection from "./CombatSection";
import Browser from "./Browser";

const Row = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

function App() {
  console.log("-------------------");
  console.log("RERENDERING APP");
  // This function is the main function for setting the session.
  const [activeState, setActiveState] = useState<ActiveStateType>("");
  const [advantage, setAdvantage] = useState<AdvantageType>("");
  const [session, setSession] = useState<SessionEntry>(EmptySession);
  const [character, setCharacter] = useState<CharacterEntry>(NewCharacterEntry);
  const [isCreature, setIsCreature] = useState<boolean>(false);
  const [isGm, setIsGm] = useState<boolean>(false);
  const [gmMode, setGmMode] = useState<boolean>(false);

  const [browserState, setBrowserState] = useState(0);
  const [inventoryState, setInventoryState] = useState(1);

  const scrollableRef = useRef(null);
  const websocket = useSocketIO(Constants.API, setSession);

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
        setCharacter={setCharacter}
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
          setCharacter={setCharacter}
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
          setCharacter={setCharacter}
        />
      )}
      <CombatSection
        character={character}
        scrollRef={scrollableRef}
        session={session}
        websocket={websocket}
        setCharacter={setCharacter}
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
