import "./App.css";
import "./index.css";

import styled from "styled-components";
import * as Constants from "./Constants";

import { useEffect, useRef, useState } from "react";

import {
  CharacterEntry,
  EmptyCharacter,
  EmptySession,
  SessionEntry,
} from "./Types";
import CombatSection from "./components/Sections/CombatSection";

import CharacterSheet from "./CharacterSheet/CharacterSheet";
import GameMaster from "./Gamemaster/GameMaster";

import useWebSocket from "./websocket";
import BrowserSection from "./BrowserSection/BrowserSection";
import JoinComponent from "./components/JoinComponent";
const Row = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: ${Constants.BACKGROUND};
  height: 100%;
`;

function App() {
  // This function is the main function for setting the session.

  const [session, setSession] = useState<SessionEntry>(EmptySession);
  const [characterName, setCharacterName] = useState<string>("");
  const [creaturesList, setCreaturesList] = useState<CharacterEntry[]>([]);
  const [isCreature, setIsCreature] = useState<boolean>(false);
  const [isGm, setIsGm] = useState<boolean>(false);
  const [gmMode, setGmMode] = useState<boolean>(false);
  const [isJoinOpen, setisJoinOpen] = useState<boolean>(true);

  const url = Constants.WEBSOCKET + session.id;

  const character = isCreature
    ? creaturesList.find((entry) => entry.name === characterName) ||
      EmptyCharacter
    : session.characters.find((entry) => entry.name === characterName) ||
      EmptyCharacter;

  const [browserState, setBrowserState] = useState(1);
  const [inventoryState, setInventoryState] = useState(1);

  const [creatureEncounter, setCreatureEncounter] = useState<CharacterEntry[]>(
    [],
  );

  const onDeleteCreature = (id: string) => {
    setCreatureEncounter((currentEncounter) =>
      currentEncounter.filter((creature) => creature.id !== id),
    );
  };

  useEffect(() => {
    setGmMode(false);
  }, [characterName]);

  const scrollableRef = useRef(null);

  console.log("-------------------");
  console.log("Rendering Application");
  console.log("Attempting to connect to: " + url);
  const websocket = useWebSocket(url, setSession);

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
      <Column>
        {browserState === 0 ? (
          <BrowserSection
            isGm={isGm}
            session={session}
            character={character}
            websocket={websocket}
            setInventoryState={setInventoryState}
            gmMode={gmMode}
            encounter={creatureEncounter}
            setEncounter={setCreatureEncounter}
            setCharacterName={setCharacterName}
            creaturesList={creaturesList}
            setCreaturesList={setCreaturesList}
            setIsCreature={setIsCreature}
            isCreature={isCreature}
            setGmMode={setGmMode}
          />
        ) : null}
      </Column>
      <Column>
        {gmMode ? (
          <GameMaster
            isGm={isGm}
            session={session}
            browserState={browserState}
            setBrowserState={setBrowserState}
            gmMode={gmMode}
            creatureEncounter={creatureEncounter}
            setCreatureEncounter={setCreatureEncounter}
            onDeleteCreature={onDeleteCreature}
            setGmMode={setGmMode}
            websocket={websocket}
            setSession={setSession}
            setIsJoinOpen={setisJoinOpen}
            isCreature={isCreature}
            setIsCreature={setIsCreature}
            setCharacterName={setCharacterName}
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
          />
        )}
      </Column>
      <Column>
        <CombatSection
          scrollRef={scrollableRef}
          session={session}
          character={character}
          websocket={websocket}
        />
      </Column>
    </Row>
  );
}

export default App;
