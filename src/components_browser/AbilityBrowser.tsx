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
import InventoryEntryEmpty from "../components_character/InventoryEntryEmpty";
import AbilityEntryItem from "./AbilityEntryItem";

import { useRef, useState } from "react";
import { GetGameData } from "../contexts/GameContent";
import EffectEntryItem from "./EffectEntryItem";

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
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setActiveState: React.Dispatch<React.SetStateAction<ActiveStateType>>;
  setAdvantage: React.Dispatch<React.SetStateAction<AdvantageType>>;
  setCriticalState: React.Dispatch<React.SetStateAction<boolean>>;
}

function AbilityBrowser({
  character,
  session,
  websocket,
  setInventoryState,
  isCreature,
  search,
  activeState,
  advantage,
  setActiveState,
  setAdvantage,
  setCriticalState,
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
  const [LootCategory, _setLootCategory] = useState<LootCategoryType>("all");

  const sortList = (a: AbilityEntry, b: AbilityEntry) => {
    const categoryComparison =
      Constants.TYPE_FILTER.indexOf(a.static.category) -
      Constants.TYPE_FILTER.indexOf(b.static.category);

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
          (item) => item.static.category === "ability",
        );
        break;
      case "mystical powers":
        filtered_abilities = abilities.filter(
          (item) => item.static.category === "mystical power",
        );
        break;
      case "rituals":
        filtered_abilities = abilities.filter(
          (item) => item.static.category === "ritual",
        );
        break;
      case "utility":
        filtered_abilities = abilities.filter(
          (item) => item.static.category === "utility",
        );
        break;
      case "monstrous traits":
        filtered_abilities = abilities.filter(
          (item) => item.static.category === "monsterous trait",
        );
        break;
      case "burden":
        filtered_abilities = abilities.filter(
          (item) => item.static.category === "burden",
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
          item.static.category.toLowerCase() +
          " " +
          item.static.tradition.join(" ") +
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
    <div className="scroll_container" ref={scrollRef} style={{ width: "100%" }}>
      {filteredEntry.map((entry, index) => {
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
            setCriticalState={setCriticalState}
          />
        );
      })}
      {effects.map((entry, index) => {
        return (
          <EffectEntryItem
            key={index}
            effect={entry}
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
            setCriticalState={setCriticalState}
          />
        );
      })}
      {Array.from({ length: 30 }).map((_, index) => {
        return <InventoryEntryEmpty key={index} />;
      })}
    </div>
  );
}

export default AbilityBrowser;
