import { ActiveStateType, AdvantageType } from "../Types";
import AbilityBrowser from "../components_browser/AbilityBrowser";
import BrowserHeader from "../components_browser/BrowserHeader";
import CreatureBrowser from "../components_browser/CreatureBrowser";

import EquipmentBrowser from "../components_browser/EquipmentBrowser";
import * as Constants from "../Constants";
import styled from "styled-components";
import { useState } from "react";
import Inventory from "./Inventory";
const SideColumn = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: ${Constants.BACKGROUND};
  height: 100%;
  gap: 25px;
  padding: 25px 50px 25px 25px;
  box-sizing: border-box;
`;

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
  setSession: React.Dispatch<React.SetStateAction<SessionEntry>>;
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
  setSession,
}: BrowserProps) {
  const [refetch, setRefetch] = useState(0);
  const [search, setSearch] = useState("");
  const [categorySelect, setCategorySelect] = useState<string>("inventory");
  return (
    <SideColumn>
      <BrowserHeader
        session={session}
        websocket={websocket}
        categorySelect={categorySelect}
        setCategorySelect={setCategorySelect}
        setSearch={setSearch}
        setRefetch={setRefetch}
        setCharacterId={setCharacterId}
        isCreature={isCreature}
        setIsGm={setIsGm}
        isGm={isGm}
        setSession={setSession}
        // Add the other missing props here
      />
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
        />
      ) : null}
    </SideColumn>
  );
}

export default Browser;
