import { ActiveStateType, AdvantageType, ItemEntry } from "../Types";
import AbilityBrowser from "../components_browser/AbilityBrowser";
import BrowserHeader from "../components_browser/BrowserHeader";
import CreatureBrowser from "../components_browser/CreatureBrowser";
import DropsBrowser from "../components_browser/DropsBrowser";
import EquipmentBrowser from "../components_browser/EquipmentBrowser";
import * as Constants from "../Constants";
import styled from "styled-components";

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
import {
  CharacterEntry,
  SessionEntry,
  AbilityEntry,
  CreatureEntry,
} from "../Types";

type BrowserProps = {
  session: SessionEntry;
  character: CharacterEntry;
  websocket: Socket;
  setCharacterName: React.Dispatch<React.SetStateAction<string>>;
  isGm: boolean;
  categorySelect: string;
  setCategorySelect: React.Dispatch<React.SetStateAction<string>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  HideBrowser: boolean;
  setHideBrowser: React.Dispatch<React.SetStateAction<boolean>>;
  setInventoryState: React.Dispatch<React.SetStateAction<number>>;
  gmMode: boolean;
  isCreature: boolean;
  search: string;
  equipment: ItemEntry[];
  abilities: AbilityEntry[];
  creaturesList: CharacterEntry[];
  setCreaturesList: React.Dispatch<React.SetStateAction<CharacterEntry[]>>;
  advantage: AdvantageType;
  activeState: ActiveStateType;
  setActiveState: React.Dispatch<React.SetStateAction<ActiveStateType>>;
  setAdvantage: React.Dispatch<React.SetStateAction<AdvantageType>>;
  setGmMode: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCreature: React.Dispatch<React.SetStateAction<boolean>>;
};

function Browser({
  session,
  character,
  websocket,
  setCharacterName,
  isGm,
  setGmMode,
  categorySelect,
  setCategorySelect,
  setSearch,
  HideBrowser,
  setHideBrowser,
  setInventoryState,
  gmMode,
  isCreature,
  search,
  equipment,
  abilities,
  creaturesList,
  setCreaturesList,
  advantage,
  activeState,
  setActiveState,
  setIsCreature,
  setAdvantage,
}: BrowserProps) {
  return (
    <SideColumn>
      <BrowserHeader
        session={session}
        websocket={websocket}
        setCharacterName={setCharacterName}
        isGm={isGm}
        categorySelect={categorySelect}
        setCategorySelect={setCategorySelect}
        setSearch={setSearch}
        HideBrowser={HideBrowser}
        setHideBrowser={setHideBrowser}
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
          equipment={equipment}
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
          abilities={abilities}
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
          setCharacterName={setCharacterName}
          setIsCreature={setIsCreature}
          setCreaturesList={setCreaturesList}
          creaturesList={creaturesList}
        />
      ) : null}
    </SideColumn>
  );
}

export default Browser;
