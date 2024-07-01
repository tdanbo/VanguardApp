import * as Constants from "../Constants";

import { useState } from "react";
import {
  ActiveStateType,
  AdvantageType,
  EmptySession,
  NewCharacterEntry,
  SessionEntry,
  DisplayType,
  EquipAbilityType,
} from "../Types";
import GameMaster from "../components_gamemaster/GameMaster";
import useSocketIO from "../socketio";
import Browser from "./Browser";
import CharacterSheet from "./CharacterSheet";
import CombatSection from "./CombatSection";
import FooterCharacterComponent from "../components_cleanup/FooterCharacterComponent";
import { GetGameData } from "../contexts/GameContent";
import FooterCombatComponent from "../components_cleanup/FooterCombatComponent";
import FooterBrowserComponent from "../components_cleanup/FooterBrowserComponent";

import { useEffect } from "react";

function App() {
  console.log("-------------------");
  console.log("RERENDERING APP");
  const { creatures } = GetGameData();
  // This function is the main function for setting the session.
  const [activeState, setActiveState] = useState<ActiveStateType>("");
  const [criticalState, setCriticalState] = useState<boolean>(false);
  const [advantage, setAdvantage] = useState<AdvantageType>("");
  const [session, setSession] = useState<SessionEntry>(EmptySession);
  const [isCreature, setIsCreature] = useState<boolean>(false);
  const [isGm, setIsGm] = useState<boolean>(false);
  const [browserState, setBrowserState] = useState(0);
  const [inventoryState, setInventoryState] = useState(1);
  const [modifierLock, setModifierLock] = useState<boolean>(false);
  const [display, setDisplay] = useState<DisplayType>("character");
  const [rightDisplay, setRightDisplay] = useState<DisplayType>("combatlog");
  const [leftDisplay, setLeftDisplay] = useState<DisplayType>("inventory");
  const [isJoined, setIsJoined] = useState<boolean>(false);
  const [characterId, setCharacterId] = useState<string>("");
  const [equipmentAbilities, setEquipmentAbilities] =
    useState<EquipAbilityType>("equipment");

  const websocket = useSocketIO(Constants.API, setSession);

  const character = isCreature
    ? creatures.find((entry) => entry.id === characterId) || NewCharacterEntry
    : session.characters.find((entry) => entry.id === characterId) ||
      NewCharacterEntry;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1900) {
        // Should be the highest breakpoint
        setDisplay("character");
        setRightDisplay("combatlog");
      }
    };

    // Add event listener when component mounts
    window.addEventListener("resize", handleResize);

    // Call handleResize initially in case the initial window width already meets the condition
    handleResize();

    // Cleanup function to remove event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // UpdateStaticAbilities(character.abilities, abilities);
  // UpdateStaticEquipment(character.inventory, equipment);
  // UpdateStaticEffects(character.effects, effects);

  return (
    <div className="column font padding">
      <div className="row" style={{ gap: "100px" }}>
        <div
          className="column breakpoint show_over_breakpoint4"
          style={{ maxWidth: "25em" }}
        >
          <Browser
            session={session}
            character={character}
            websocket={websocket}
            setInventoryState={setInventoryState}
            isCreature={isCreature}
            advantage={advantage}
            activeState={activeState}
            setActiveState={setActiveState}
            setIsCreature={setIsCreature}
            setAdvantage={setAdvantage}
            setCharacterId={setCharacterId}
            setIsGm={setIsGm}
            isGm={isGm}
            criticalState={criticalState}
            setCriticalState={setCriticalState}
            display={leftDisplay}
            setDisplay={setLeftDisplay}
          />
        </div>

        <div className="column">
          {display === "character" ? (
            <CharacterSheet
              isGm={isGm}
              websocket={websocket}
              session={session}
              setSession={setSession}
              character={character}
              browserState={browserState}
              setBrowserState={setBrowserState}
              inventoryState={inventoryState}
              setInventoryState={setInventoryState}
              isCreature={isCreature}
              advantage={advantage}
              setAdvantage={setAdvantage}
              activeState={activeState}
              setActiveState={setActiveState}
              setCharacterId={setCharacterId}
              criticalState={criticalState}
              setCriticalState={setCriticalState}
              modifierLock={modifierLock}
              setModifierLock={setModifierLock}
              setDisplay={setDisplay}
              equipmentAbilities={equipmentAbilities}
              setIsJoined={setIsJoined}
              isJoined={isJoined}
            />
          ) : display === "combatlog" ? (
            <CombatSection
              websocket={websocket}
              session={session}
              character={character}
              isCreature={isCreature}
              setAdvantage={setAdvantage}
              setActiveState={setActiveState}
              setCharacterId={setCharacterId}
              setIsCreature={setIsCreature}
              setSession={setSession}
              isGm={isGm}
              setIsGm={setIsGm}
              setCriticalState={setCriticalState}
              setDisplay={setDisplay}
            />
          ) : display === "inventory" ? (
            <Browser
              session={session}
              character={character}
              websocket={websocket}
              setInventoryState={setInventoryState}
              isCreature={isCreature}
              advantage={advantage}
              activeState={activeState}
              setActiveState={setActiveState}
              setIsCreature={setIsCreature}
              setAdvantage={setAdvantage}
              setCharacterId={setCharacterId}
              setIsGm={setIsGm}
              isGm={isGm}
              criticalState={criticalState}
              setCriticalState={setCriticalState}
              display={leftDisplay}
              setDisplay={setRightDisplay}
            />
          ) : display === "gamemaster" ? (
            <GameMaster
              isGm={isGm}
              session={session}
              browserState={browserState}
              setBrowserState={setBrowserState}
              setIsGm={setIsGm}
              websocket={websocket}
              setSession={setSession}
              isCreature={isCreature}
              setIsCreature={setIsCreature}
              advantage={advantage}
              activeState={activeState}
              setActiveState={setActiveState}
              setAdvantage={setAdvantage}
              setCharacterId={setCharacterId}
              criticalState={criticalState}
              setCriticalState={setCriticalState}
            />
          ) : (
            <></>
          )}
        </div>

        <div
          className="column breakpoint show_over_breakpoint3"
          style={{ maxWidth: "25em" }}
        >
          {rightDisplay === "combatlog" ? (
            <CombatSection
              websocket={websocket}
              session={session}
              character={character}
              isCreature={isCreature}
              setAdvantage={setAdvantage}
              setActiveState={setActiveState}
              setCharacterId={setCharacterId}
              setIsCreature={setIsCreature}
              setSession={setSession}
              isGm={isGm}
              setIsGm={setIsGm}
              setCriticalState={setCriticalState}
              setDisplay={setRightDisplay}
            />
          ) : (
            <Browser
              session={session}
              character={character}
              websocket={websocket}
              setInventoryState={setInventoryState}
              isCreature={isCreature}
              advantage={advantage}
              activeState={activeState}
              setActiveState={setActiveState}
              setIsCreature={setIsCreature}
              setAdvantage={setAdvantage}
              setCharacterId={setCharacterId}
              setIsGm={setIsGm}
              isGm={isGm}
              criticalState={criticalState}
              setCriticalState={setCriticalState}
              display={rightDisplay}
              setDisplay={setRightDisplay}
            />
          )}
        </div>
      </div>
      <div
        className="row"
        style={{ height: "35px", gap: "100px", justifyContent: "left" }}
      >
        <div
          className="header outline_color breakpoint show_over_breakpoint4 "
          style={{ maxWidth: "25em" }}
        >
          <FooterBrowserComponent setLeftDisplay={setLeftDisplay} isGm={isGm} />
        </div>
        <div className="header outline_color breakpoint show_over_breakpoint1 hide_over_breakpoint4">
          <FooterCharacterComponent
            setEquipmentAbilities={setEquipmentAbilities}
            setDisplay={setDisplay}
            isGm={isGm}
          />
        </div>

        <div
          className="header outline_color breakpoint show_over_breakpoint3 hide_over_breakpoint4"
          style={{ maxWidth: "25em" }}
        >
          <FooterCombatComponent
            setEquipmentAbilities={setEquipmentAbilities}
            setRightDisplay={setRightDisplay}
            isGm={isGm}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
