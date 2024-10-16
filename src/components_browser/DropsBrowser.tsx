import * as Constants from "../Constants";
import InventoryEntry from "../components_browser/InventoryEntry";
import InventoryEntryEmpty from "../components_character/InventoryEntryEmpty";
import { GetItemListPrice } from "../functions/UtilityFunctions";
import { ItemEntry, CharacterEntry, SessionEntry } from "../Types";
import { useRef, useEffect } from "react";
import { Socket } from "socket.io-client";
import DropControlComponent from "./DropControlComponent";

interface DropsBrowserProps {
  character: CharacterEntry;
  session: SessionEntry;
  websocket: Socket;
  isCreature: boolean;

  setInventoryState?: (inventoryState: number) => void;

  isGm: boolean;
}

export default function DropsBrowser({
  character,
  session,
  websocket,
  isCreature,
  isGm,
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
      {isGm ? (
        <div className="header">
          <DropControlComponent
            session={session}
            websocket={websocket}
            isGm={isGm}
          />
        </div>
      ) : null}
      <div
        className="scroll_container"
        style={{
          width: "100%",
          borderTop: "1px solid " + Constants.BRIGHT_YELLOW,
          borderBottom: "1px solid " + Constants.BRIGHT_YELLOW,
          borderRadius: "5px",
          paddingTop: "10px",
          maxHeight: isGm ? "100%" : "335px",
        }}
      >
        {session.loot.drops.length > 0 && isGm ? (
          <div
            className="row"
            style={{
              fontSize: "11px",
              justifyContent: "right",
            }}
          >
            {GetItemListPrice(session.loot.drops)} Thaler
          </div>
        ) : null}
        {session.loot.drops.sort(sortShoppingList).map((entry, index) => {
          return (
            <InventoryEntry
              session={session}
              character={character}
              websocket={websocket}
              key={`InventoryEntry${index}`}
              browser={true}
              item={entry}
              isCreature={isCreature}
              isGm={isGm}
              state={session.state === "buy" ? "buy" : "take"}
              tag={"DROPS BROWSER"}
            />
          );
        })}
        {Array.from({ length: 30 }).map((_, index) => {
          return <InventoryEntryEmpty key={index} />;
        })}
      </div>
    </>
  );
}
