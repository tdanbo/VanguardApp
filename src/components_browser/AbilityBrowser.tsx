import styled from "styled-components";

import { useEffect } from "react";
import { Socket } from "socket.io-client";
import * as Constants from "../Constants";
import {
  AbilityEntry,
  ActiveStateType,
  AdvantageType,
  CharacterEntry,
  SessionEntry,
} from "../Types";
import AbilityEntryItem from "./AbilityEntryItem";
import InventoryEntryEmpty from "../components_character/InventoryEntryEmpty";

import { useRef, useState } from "react";
import EffectEntryItem from "./EffectEntryItem";
import { GetGameData } from "../contexts/GameContent";

interface ContainerProps {
  height: string;
}

const FooterContainer = styled.div<ContainerProps>`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  gap: ${Constants.WIDGET_GAB};
  height: ${(props) => props.height};
  max-height: ${(props) => props.height};
`;

interface DivProps {
  width: string;
}
const DynamicContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  gap: ${Constants.WIDGET_GAB};
  height: 0px; /* or another fixed value */
`;

const Button = styled.button`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  background-color: ${Constants.WIDGET_BACKGROUND};
  border: 1px solid ${Constants.WIDGET_BORDER};
  border-radius: 5px;
  color: ${Constants.WIDGET_SECONDARY_FONT};
  cursor: pointer;
  font-size: 14px;
  justify-content: center;
  align-items: center;
`;

const ScrollColumn = styled.div<DivProps>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-basis: 0;
  gap: ${Constants.WIDGET_GAB};
  max-width: ${(props) => props.width};
  overflow-y: scroll;
  scrollbar-width: none;
`;

interface AbilityBrowserProps {
  character: CharacterEntry;
  session: SessionEntry;
  websocket: Socket;
  setInventoryState: (state: number) => void;
  isCreature: boolean;
  search: string;
  isGm: boolean;
  activeState: ActiveStateType;
  advantage: AdvantageType;
  setActiveState: React.Dispatch<React.SetStateAction<ActiveStateType>>;
  setAdvantage: React.Dispatch<React.SetStateAction<AdvantageType>>;
}

function AbilityBrowser({
  character,
  session,
  websocket,
  setInventoryState,
  isCreature,
  search,
  isGm,
  activeState,
  advantage,
  setActiveState,
  setAdvantage,
}: AbilityBrowserProps) {
  type LootCategoryType =
    | "all"
    | "abilities"
    | "mystical powers"
    | "rituals"
    | "utility"
    | "monstrous traits"
    | "burden";
  const { abilities, effects } = GetGameData();
  const scrollRef = useRef(null);
  const [filteredEntry, setFilteredEntry] = useState<AbilityEntry[]>([]);
  const [LootCategory, setLootCategory] = useState<LootCategoryType>("all");

  const sortList = (a: AbilityEntry, b: AbilityEntry) => {
    const categoryComparison =
      Constants.TYPE_FILTER.indexOf(a.static.type) -
      Constants.TYPE_FILTER.indexOf(b.static.type);

    if (categoryComparison !== 0) {
      return categoryComparison;
    }

    return 0;
  };

  useEffect(() => {
    if (scrollRef.current) {
      const scrollableElement = scrollRef.current as unknown as HTMLElement;
      scrollableElement.scrollTop = 0;
    }
  }, [search, LootCategory]);

  useEffect(() => {
    let filtered_abilities = abilities;

    switch (LootCategory) {
      case "abilities":
        filtered_abilities = abilities.filter(
          (item) => item.static.type === "ability",
        );
        break;
      case "mystical powers":
        filtered_abilities = abilities.filter(
          (item) => item.static.type === "mystical power",
        );
        break;
      case "rituals":
        filtered_abilities = abilities.filter(
          (item) => item.static.type === "ritual",
        );
        break;
      case "utility":
        filtered_abilities = abilities.filter(
          (item) => item.static.type === "utility",
        );
        break;
      case "monstrous traits":
        filtered_abilities = abilities.filter(
          (item) => item.static.type === "monsterous trait",
        );
        break;
      case "burden":
        filtered_abilities = abilities.filter(
          (item) => item.static.type === "burden",
        );
        break;
      default:
        // Keep the original list if no category matches
        break;
    }

    const sorted_items = [...filtered_abilities].sort(sortList);

    if (search.length > 2) {
      const searched_item = sorted_items.filter((item) =>
        (
          item.name.toLowerCase() +
          " " +
          item.static.type.toLowerCase() +
          " " +
          item.static.novice.description.toLowerCase() +
          " " +
          item.static.adept.description.toLowerCase() +
          " " +
          item.static.master.description.toLowerCase()
        ).includes(search.toLowerCase()),
      );
      setFilteredEntry(searched_item);
    } else {
      setFilteredEntry(sorted_items);
    }
  }, [LootCategory, search]);

  return (
    <>
      <DynamicContainer>
        <ScrollColumn ref={scrollRef} width="100%">
          {filteredEntry.map((entry, index) => {
            if (entry.static.entry === "AbilityEntry") {
              return (
                <AbilityEntryItem
                  key={index}
                  ability={entry}
                  browser={true}
                  setInventoryState={setInventoryState}
                  character={character}
                  session={session}
                  websocket={websocket}
                  isCreature={isCreature}
                  activeState={activeState}
                  advantage={advantage}
                  setActiveState={setActiveState}
                  setAdvantage={setAdvantage}
                />
              );
            }
          })}
          {effects.map((entry, index) => {
            if (entry.static.entry === "EffectEntry") {
              return (
                <EffectEntryItem
                  key={index}
                  ability={entry}
                  browser={true}
                  setInventoryState={setInventoryState}
                  character={character}
                  session={session}
                  websocket={websocket}
                  isCreature={isCreature}
                  activeState={activeState}
                  advantage={advantage}
                  setActiveState={setActiveState}
                  setAdvantage={setAdvantage}
                />
              );
            }
          })}
          {Array.from({ length: 30 }).map((_, index) => {
            return <InventoryEntryEmpty key={index} />;
          })}
        </ScrollColumn>
      </DynamicContainer>
      <FooterContainer height={"30px"}>
        <Button onClick={() => setLootCategory("abilities")}>Abilities</Button>
        <Button onClick={() => setLootCategory("mystical powers")}>
          Mystical Powers
        </Button>
        <Button onClick={() => setLootCategory("utility")}>Utility</Button>

        {isGm ? (
          <>
            <Button onClick={() => setLootCategory("rituals")}>Rituals</Button>
            <Button onClick={() => setLootCategory("burden")}>Burden</Button>
            <Button onClick={() => setLootCategory("monstrous traits")}>
              Monstrous Traits
            </Button>
          </>
        ) : null}
      </FooterContainer>
    </>
  );
}

export default AbilityBrowser;
