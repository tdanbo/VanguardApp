import React from "react";

import * as Constants from "../Constants";
import InventoryEntry from "../components_browser/InventoryEntry";
import InventoryEntryEmpty from "../components_character/InventoryEntryEmpty";
import {
  ItemEntry,
  CharacterEntry,
  SessionEntry,
  AdvantageType,
  ActiveStateType,
} from "../Types";
import { useRef, useEffect } from "react";
import { Socket } from "socket.io-client";

interface DropsBrowserProps {
  character: CharacterEntry;
  session: SessionEntry;
  websocket: Socket;
  isCreature: boolean;
  activeState: ActiveStateType;
  advantage: AdvantageType;
  setInventoryState?: (inventoryState: number) => void;
  setActiveState: React.Dispatch<React.SetStateAction<ActiveStateType>>;
  setAdvantage: React.Dispatch<React.SetStateAction<AdvantageType>>;
  isGm: boolean;
  criticalState: boolean;
  setCriticalState: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DropsBrowser({
  character,
  session,
  websocket,
  setInventoryState,
  isCreature,
  isGm,
  advantage,
  activeState,
  setActiveState,
  setAdvantage,
  criticalState,
  setCriticalState,
}: DropsBrowserProps) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      const scrollableElement = scrollRef.current as unknown as HTMLElement;
      scrollableElement.scrollTop = 0;
    }
  }, [session]);

  const sortShoppingList = (a: ItemEntry, b: ItemEntry) => {
    const categoryComparison =
      Constants.CATEGORY_FILTER.indexOf(a.static.category) -
      Constants.CATEGORY_FILTER.indexOf(b.static.category);

    if (categoryComparison !== 0) {
      return categoryComparison;
    }

    return 0;
  };
  return (
    <>
      {session.loot.drops.sort(sortShoppingList).map((entry, index) => {
        return (
          <InventoryEntry
            session={session}
            character={character}
            websocket={websocket}
            key={`InventoryEntry${index}`}
            browser={true}
            index={index}
            item={entry}
            equipped={""}
            id={""}
            setInventoryState={setInventoryState}
            isCreature={isCreature}
            canBuy={session.state === "buy" ? true : false}
            isGm={isGm}
            advantage={advantage}
            activeState={activeState}
            setActiveState={setActiveState}
            setAdvantage={setAdvantage}
            isDrop={true}
            criticalState={criticalState}
            setCriticalState={setCriticalState}
          />
        );
      })}
      {Array.from({ length: 30 }).map((_, index) => {
        return <InventoryEntryEmpty key={index} />;
      })}
    </>
  );
}
