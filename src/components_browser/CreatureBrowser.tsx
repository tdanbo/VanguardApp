import { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import * as Constants from "../Constants";
import { CharacterEntry, DisplayType, SessionEntry } from "../Types";
import InventoryEntryEmpty from "../components_character/InventoryEntryEmpty";
import { GetGameData } from "../contexts/GameContent";
import {
  IsAmbrian,
  IsBeast,
  IsTroll,
  IsUndead,
} from "../functions/UtilityFunctions";
import CreatureEntryItem from "./CreatureEntryItem";

interface CreatureBrowserProps {
  character: CharacterEntry;
  session: SessionEntry;
  websocket: Socket;
  setIsCreature: React.Dispatch<React.SetStateAction<boolean>>;
  search: string;
  refetch: number;
  setRefetch: React.Dispatch<React.SetStateAction<number>>;
  setCharacterId: React.Dispatch<React.SetStateAction<string>>;
  isGm: boolean;
  setIsGm: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplay: React.Dispatch<React.SetStateAction<DisplayType>>;
  setCentralDisplay: React.Dispatch<React.SetStateAction<DisplayType>>;
}

function CreatureBrowser({
  character,
  session,
  websocket,
  setIsCreature,
  search,
  refetch,
  setRefetch,
  setCharacterId,
  isGm,
  setDisplay,
  setCentralDisplay,
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
  const [LootCategory, _setLootCategory] = useState<LootCategoryType>("all");
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
    <div className="scroll_container" ref={scrollRef} style={{ width: "100%" }}>
      {filteredEntry.map((entry, index) => {
        return (
          <CreatureEntryItem
            key={index}
            session={session}
            character={character}
            creature={entry}
            browser={true}
            isGm={isGm}
            setIsCreature={setIsCreature}
            websocket={websocket}
            setRefetch={setRefetch}
            setCharacterId={setCharacterId}
            setDisplay={setDisplay}
            setCentralDisplay={setCentralDisplay}
          />
        );
      })}
      {Array.from({ length: 30 }).map((_, index) => {
        return <InventoryEntryEmpty key={index} />;
      })}
    </div>
  );
}

export default CreatureBrowser;
