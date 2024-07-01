import { NewCharacterEntry } from "../Types";
import { v4 as uuidv4 } from "uuid";
import { addNewCreature } from "../functions/CharacterFunctions";

import { cloneDeep } from "lodash";
import { GetGameData } from "../contexts/GameContent";

import { ActiveStateType, AdvantageType, DisplayType } from "../Types";
import AbilityBrowser from "../components_browser/AbilityBrowser";
import CreatureBrowser from "../components_browser/CreatureBrowser";

import EquipmentBrowser from "../components_browser/EquipmentBrowser";
import { useState } from "react";
import Inventory from "./Inventory";

import { Socket } from "socket.io-client";
import { CharacterEntry, SessionEntry } from "../Types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

type BrowserProps = {
  session: SessionEntry;
  character: CharacterEntry;
  websocket: Socket;
  isGm: boolean;
  setInventoryState: React.Dispatch<React.SetStateAction<number>>;
  isCreature: boolean;
  advantage: AdvantageType;
  activeState: ActiveStateType;
  setActiveState: React.Dispatch<React.SetStateAction<ActiveStateType>>;
  setAdvantage: React.Dispatch<React.SetStateAction<AdvantageType>>;
  setIsCreature: React.Dispatch<React.SetStateAction<boolean>>;
  setCharacterId: React.Dispatch<React.SetStateAction<string>>;
  setIsGm: React.Dispatch<React.SetStateAction<boolean>>;
  criticalState: boolean;
  setCriticalState: React.Dispatch<React.SetStateAction<boolean>>;
  display: DisplayType;
  setDisplay: React.Dispatch<React.SetStateAction<DisplayType>>;
};

function Browser({
  session,
  character,
  websocket,
  isGm,
  setInventoryState,
  isCreature,
  advantage,
  activeState,
  setActiveState,
  setIsCreature,
  setAdvantage,
  setCharacterId,
  setIsGm,
  criticalState,
  setCriticalState,
  display,
  setDisplay,
}: BrowserProps) {
  const [refetch, setRefetch] = useState(0);
  const [search, setSearch] = useState("");
  const [tempSearch, setTempSearch] = useState("");

  const { updateCreatureData } = GetGameData();

  const handlePostCreature = async () => {
    const NewCreature = cloneDeep(NewCharacterEntry);
    NewCreature.id = uuidv4();
    NewCreature.name = "Creature Character";
    await addNewCreature(NewCreature);
    await updateCreatureData();
    // setRefetch((prev) => prev + 1);
    setCharacterId(NewCreature.id);
  };

  const handleSetSearch = (value: string) => {
    setSearch(value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempSearch(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSetSearch(tempSearch);
    }
  };

  return (
    <>
      <div className="header" style={{ gap: "10px" }}>
        {display === "creatures" ? (
          <div
            className="row button button_color"
            style={{ maxWidth: "50px" }}
            onClick={handlePostCreature}
          >
            <FontAwesomeIcon icon={faPlus} />
          </div>
        ) : null}
        {["equipment", "abilities", "creatures"].includes(display) ? (
          <input
            className="row opaque_color font"
            value={tempSearch} // Use the temporary search state as the input value
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            title="Hit Enter to search"
            placeholder="Search"
            style={{ textAlign: "center" }}
          />
        ) : null}
      </div>
      {display === "equipment" ? (
        <EquipmentBrowser
          session={session}
          character={character}
          websocket={websocket}
          setInventoryState={setInventoryState}
          isCreature={isCreature}
          search={search}
          isGm={isGm}
          advantage={advantage}
          activeState={activeState}
          setActiveState={setActiveState}
          setAdvantage={setAdvantage}
          criticalState={criticalState}
          setCriticalState={setCriticalState}
        />
      ) : display === "abilities" ? (
        <AbilityBrowser
          session={session}
          character={character}
          websocket={websocket}
          setInventoryState={setInventoryState}
          isCreature={isCreature}
          search={search}
          isGm={isGm}
          activeState={activeState}
          advantage={advantage}
          setActiveState={setActiveState}
          setAdvantage={setAdvantage}
          setCriticalState={setCriticalState}
          setSearch={setSearch}
        />
      ) : display === "creatures" ? (
        <CreatureBrowser
          session={session}
          character={character}
          websocket={websocket}
          search={search}
          setIsCreature={setIsCreature}
          refetch={refetch}
          setRefetch={setRefetch}
          setCharacterId={setCharacterId}
          isGm={isGm}
          setIsGm={setIsGm}
          setDisplay={setDisplay}
        />
      ) : display === "inventory" ? (
        <Inventory
          session={session}
          character={character}
          websocket={websocket}
          isCreature={isCreature}
          activeState={activeState}
          advantage={advantage}
          setActiveState={setActiveState}
          setAdvantage={setAdvantage}
          isGm={isGm}
          setInventoryState={setInventoryState}
          criticalState={criticalState}
          setCriticalState={setCriticalState}
        />
      ) : null}
    </>
  );
}

export default Browser;
