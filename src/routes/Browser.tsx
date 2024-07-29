import { NewCharacterEntry } from "../Types";
import { v4 as uuidv4 } from "uuid";
import { addNewCreature } from "../functions/CharacterFunctions";

import { cloneDeep } from "lodash";
import { GetGameData } from "../contexts/GameContent";

import { DisplayType } from "../Types";
import AbilityBrowser from "../components_browser/AbilityBrowser";
import CreatureBrowser from "../components_browser/CreatureBrowser";

import EquipmentBrowser from "../components_browser/EquipmentBrowser";
import { useState } from "react";
import Inventory from "./Inventory";

import { Socket } from "socket.io-client";
import { CharacterEntry, SessionEntry } from "../Types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import DropsBrowser from "../components_browser/DropsBrowser";

type BrowserProps = {
  session: SessionEntry;
  character: CharacterEntry;
  websocket: Socket;
  isGm: boolean;
  setInventoryState: React.Dispatch<React.SetStateAction<number>>;
  isCreature: boolean;

  setIsCreature: React.Dispatch<React.SetStateAction<boolean>>;
  setCharacterId: React.Dispatch<React.SetStateAction<string>>;
  setIsGm: React.Dispatch<React.SetStateAction<boolean>>;

  setDisplay: React.Dispatch<React.SetStateAction<DisplayType>>;
  display: DisplayType;
  centralDisplay: DisplayType;
  setCentralDisplay: React.Dispatch<React.SetStateAction<DisplayType>>;
};

function Browser({
  session,
  character,
  websocket,
  isGm,
  setInventoryState,
  isCreature,
  setIsCreature,
  setCharacterId,
  setIsGm,
  display,
  setDisplay,
  centralDisplay,
  setCentralDisplay,
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
      {["equipment", "abilities", "creatures"].includes(display) ? (
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
          <input
            className="row bg--background font--primary-1 font--size-large border"
            value={tempSearch} // Use the temporary search state as the input value
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            title="Hit Enter to search"
            placeholder="Search"
            style={{ textAlign: "center" }}
          />
        </div>
      ) : null}

      {display === "equipment" ? (
        <EquipmentBrowser
          session={session}
          character={character}
          websocket={websocket}
          setInventoryState={setInventoryState}
          isCreature={isCreature}
          search={search}
          isGm={isGm}
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
          setCentralDisplay={setCentralDisplay}
        />
      ) : display === "inventory" ? (
        <Inventory
          session={session}
          character={character}
          websocket={websocket}
          isCreature={isCreature}
          isGm={isGm}
          setInventoryState={setInventoryState}
          centralDisplay={centralDisplay}
        />
      ) : display === "drops" ? (
        <DropsBrowser
          isGm={isGm}
          session={session}
          character={character}
          websocket={websocket}
          setInventoryState={setInventoryState}
          isCreature={isCreature}
        />
      ) : null}
    </>
  );
}

export default Browser;
