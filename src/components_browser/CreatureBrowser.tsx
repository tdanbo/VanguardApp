import styled from "styled-components";

import { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import * as Constants from "../Constants";
import { CharacterEntry, SessionEntry } from "../Types";
import CreatureEntryItem from "./CreatureEntryItem";
import InventoryEntryEmpty from "../components_character/InventoryEntryEmpty";
import { GetGameData } from "../contexts/GameContent";
import {
  IsAmbrian,
  IsBeast,
  IsTroll,
  IsUndead,
} from "../functions/UtilityFunctions";

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

interface CreatureBrowserProps {
  character: CharacterEntry;
  session: SessionEntry;
  websocket: Socket;
  gmMode: boolean;
  setIsCreature: React.Dispatch<React.SetStateAction<boolean>>;
  setGmMode: React.Dispatch<React.SetStateAction<boolean>>;
  search: string;
  refetch: number;
  setRefetch: React.Dispatch<React.SetStateAction<number>>;
  setCharacterId: React.Dispatch<React.SetStateAction<string>>;
}

function CreatureBrowser({
  character,
  session,
  websocket,
  gmMode,
  setIsCreature,
  setGmMode,
  search,
  refetch,
  setRefetch,
  setCharacterId,
}: CreatureBrowserProps) {
  const { creatures, updateCreatureData } = GetGameData();
  type LootCategoryType =
    | "all"
    | "ambrian"
    | "troll"
    | "beast"
    | "undead"
    | "abomination";
  const scrollRef = useRef(null);
  const [filteredEntry, setFilteredEntry] = useState<CharacterEntry[]>([]);
  const [LootCategory, setLootCategory] = useState<LootCategoryType>("all");
  const sortList = (a: CharacterEntry, b: CharacterEntry) => {
    const categoryComparison =
      Constants.RACE_FILTER.indexOf(a.details.race) -
      Constants.RACE_FILTER.indexOf(b.details.race);

    if (categoryComparison !== 0) {
      return categoryComparison;
    }

    return 0;
  };

  useEffect(() => {
    updateCreatureData;
  }, [refetch]); // Empty dependency array to ensure it runs only once

  useEffect(() => {
    if (scrollRef.current) {
      const scrollableElement = scrollRef.current as unknown as HTMLElement;
      scrollableElement.scrollTop = 0;
    }
  }, [search, LootCategory]);

  useEffect(() => {
    let filtered_equipment = creatures;

    switch (LootCategory) {
      case "ambrian":
        filtered_equipment = creatures.filter((item) => IsAmbrian(item));
        break;
      case "troll":
        filtered_equipment = creatures.filter((item) => IsTroll(item));
        break;
      case "beast":
        filtered_equipment = creatures.filter((item) => IsBeast(item));
        break;
      case "undead":
        filtered_equipment = creatures.filter((item) => IsUndead(item));
        break;
      case "abomination":
        filtered_equipment = creatures.filter(
          (item) => item.details.race === "Abomination",
        );
        break;
      default:
        // Keep the original list if no category matches
        break;
    }

    const sorted_items = [...filtered_equipment].sort(sortList);
    setFilteredEntry(sorted_items); // Assuming you have a separate state for filtered and sorted items
  }, [LootCategory, creatures]);

  return (
    <>
      <DynamicContainer>
        <ScrollColumn ref={scrollRef} width="100%">
          {filteredEntry.map((entry, index) => {
            if (entry.entry === "CharacterEntry") {
              return (
                <CreatureEntryItem
                  key={index}
                  session={session}
                  character={character}
                  creature={entry}
                  browser={true}
                  gmMode={gmMode}
                  setIsCreature={setIsCreature}
                  websocket={websocket}
                  setGmMode={setGmMode}
                  setRefetch={setRefetch}
                  setCharacterId={setCharacterId}
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
        <Button onClick={() => setLootCategory("ambrian")}>Ambrian</Button>
        <Button onClick={() => setLootCategory("troll")}>Trolls</Button>
        <Button onClick={() => setLootCategory("beast")}>Beasts</Button>
        <Button onClick={() => setLootCategory("undead")}>Undead</Button>
        <Button onClick={() => setLootCategory("abomination")}>
          Abomination
        </Button>
      </FooterContainer>
    </>
  );
}

export default CreatureBrowser;
