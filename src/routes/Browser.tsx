import { ActiveStateType, AdvantageType } from "../Types";
import AbilityBrowser from "../components_browser/AbilityBrowser";
import FooterBrowserComponent from "../components_cleanup/FooterBrowserComponent";
import CreatureBrowser from "../components_browser/CreatureBrowser";

import EquipmentBrowser from "../components_browser/EquipmentBrowser";
import * as Constants from "../Constants";
import styled from "styled-components";
import { useState } from "react";
import Inventory from "./Inventory";

import { Socket } from "socket.io-client";
import { CharacterEntry, SessionEntry } from "../Types";

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
}: BrowserProps) {
  const [refetch, setRefetch] = useState(0);
  const [search, setSearch] = useState("");
  const [categorySelect, setCategorySelect] = useState<string>("inventory");
  return (
    <>
      {categorySelect === "equipment" ? (
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
      ) : categorySelect === "abilities" ? (
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
      ) : categorySelect === "creatures" ? (
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
          setCategorySelect={setCategorySelect}
        />
      ) : categorySelect === "inventory" ? (
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
