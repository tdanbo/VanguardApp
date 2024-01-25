import styled from "styled-components";

import axios from "axios";
import { useEffect } from "react";
import { Socket } from "socket.io-client";
import * as Constants from "../Constants";
import { API } from "../Constants";
import { AbilityEntry, CharacterEntry, SessionEntry } from "../Types";
import AbilityEntryItem from "../components/Entries/AbilityEntryItem";
import InventoryEntryEmpty from "../components/InventoryEntryEmpty";

import { useRef, useState } from "react";

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
  color: ${Constants.WIDGET_PRIMARY_FONT};
  cursor: pointer;
  font-size: 16px;
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
`;

interface AbilityBrowserProps {
  character: CharacterEntry;
  session: SessionEntry;
  websocket: Socket;
  setInventoryState: (state: number) => void;
  isCreature: boolean;
  search: string;
}

function AbilityBrowser({
  character,
  session,
  websocket,
  setInventoryState,
  isCreature,
  search,
}: AbilityBrowserProps) {
  type LootCategoryType =
    | "all"
    | "abilities"
    | "mystical powers"
    | "rituals"
    | "boon"
    | "monstrous traits"
    | "burden";
  const scrollRef = useRef(null);
  const [entryList, setEntryList] = useState<AbilityEntry[]>([]);
  const [filteredEntry, setFilteredEntry] = useState<AbilityEntry[]>([]);
  const [LootCategory, setLootCategory] = useState<LootCategoryType>("all");

  const sortList = (a: AbilityEntry, b: AbilityEntry) => {
    const categoryComparison =
      Constants.TYPE_FILTER.indexOf(a.type) -
      Constants.TYPE_FILTER.indexOf(b.type);

    if (categoryComparison !== 0) {
      return categoryComparison;
    }

    return 0;
  };

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const entryResponse = await axios.get(`${API}/api/abilities`);
        setEntryList(entryResponse.data);
      } catch (error) {
        console.error("Failed to fetch equipment:", error);
        // Handle the error appropriately
      }
    };

    fetchEquipment();
  }, []); // Empty dependency array to ensure it runs only once

  useEffect(() => {
    if (scrollRef.current) {
      const scrollableElement = scrollRef.current as unknown as HTMLElement;
      scrollableElement.scrollTop = 0;
    }
  }, [search, session, LootCategory]);

  useEffect(() => {
    let filtered_equipment = entryList;

    switch (LootCategory) {
      case "abilities":
        filtered_equipment = entryList.filter(
          (item) => item.type === "Ability",
        );
        break;
      case "mystical powers":
        filtered_equipment = entryList.filter(
          (item) => item.type === "Mystical Power",
        );
        break;
      case "rituals":
        filtered_equipment = entryList.filter((item) => item.type === "Ritual");
        break;
      case "boon":
        filtered_equipment = entryList.filter((item) => item.type === "Boon");
        break;
      case "monstrous traits":
        filtered_equipment = entryList.filter(
          (item) => item.type === "Monsterous Trait",
        );
        break;
      case "burden":
        filtered_equipment = entryList.filter((item) => item.type === "Burden");
        break;
      default:
        // Keep the original list if no category matches
        break;
    }

    const sorted_items = [...filtered_equipment].sort(sortList);
    setFilteredEntry(sorted_items); // Assuming you have a separate state for filtered and sorted items
  }, [LootCategory, entryList]);

  return (
    <>
      <DynamicContainer>
        <ScrollColumn ref={scrollRef} width="100%">
          {filteredEntry.map((entry, index) => {
            if (entry.entry === "AbilityEntry") {
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
        <Button onClick={() => setLootCategory("rituals")}>Rituals</Button>
        <Button onClick={() => setLootCategory("boon")}>Boon</Button>
        <Button onClick={() => setLootCategory("burden")}>Burden</Button>
        <Button onClick={() => setLootCategory("monstrous traits")}>
          Monstrous Traits
        </Button>
      </FooterContainer>
    </>
  );
}

export default AbilityBrowser;
