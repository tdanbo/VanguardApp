import { ActiveStateType, AdvantageType } from "../Types";
import AbilityBrowser from "../components_browser/AbilityBrowser";
import BrowserHeader from "../components_browser/BrowserHeader";
import CreatureBrowser from "../components_browser/CreatureBrowser";
import DropsBrowser from "../components_browser/DropsBrowser";
import EquipmentBrowser from "../components_browser/EquipmentBrowser";
import * as Constants from "../Constants";
import styled from "styled-components";
import { useState } from "react";

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

import { Socket } from "socket.io-client";
import { CharacterEntry, SessionEntry } from "../Types";

type BrowserProps = {
  session: SessionEntry;
  character: CharacterEntry;
  websocket: Socket;
  isGm: boolean;
  setInventoryState: React.Dispatch<React.SetStateAction<number>>;
  gmMode: boolean;
  isCreature: boolean;
  advantage: AdvantageType;
  activeState: ActiveStateType;
  setActiveState: React.Dispatch<React.SetStateAction<ActiveStateType>>;
  setAdvantage: React.Dispatch<React.SetStateAction<AdvantageType>>;
  setGmMode: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCreature: React.Dispatch<React.SetStateAction<boolean>>;
  setCharacter: React.Dispatch<React.SetStateAction<CharacterEntry>>;
};

function Browser({
  session,
  character,
  websocket,
  isGm,
  setGmMode,
  setInventoryState,
  gmMode,
  isCreature,
  advantage,
  activeState,
  setActiveState,
  setIsCreature,
  setAdvantage,
  setCharacter,
}: BrowserProps) {
  const [refetch, setRefetch] = useState(0);
  const [search, setSearch] = useState("");
  const [categorySelect, setCategorySelect] = useState<string>("");
  const [HideBrowser, setHideBrowser] = useState<boolean>(true);
  return (
    <SideColumn>
      <BrowserHeader
        session={session}
        websocket={websocket}
        isGm={isGm}
        categorySelect={categorySelect}
        setCategorySelect={setCategorySelect}
        setSearch={setSearch}
        HideBrowser={HideBrowser}
        setHideBrowser={setHideBrowser}
        setRefetch={setRefetch}
        setCharacter={setCharacter}
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
          setActiveState={setActiveState}
          setAdvantage={setAdvantage}
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
          isGm={isGm}
          advantage={advantage}
          activeState={activeState}
          setActiveState={setActiveState}
          setAdvantage={setAdvantage}
        />
      ) : categorySelect === "abilities" && HideBrowser ? (
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
      ) : categorySelect === "creatures" && HideBrowser ? (
        <CreatureBrowser
          session={session}
          character={character}
          websocket={websocket}
          search={search}
          gmMode={gmMode}
          setGmMode={setGmMode}
          setIsCreature={setIsCreature}
          refetch={refetch}
          setRefetch={setRefetch}
          setCharacter={setCharacter}
        />
      ) : null}
    </SideColumn>
  );
}

export default Browser;
