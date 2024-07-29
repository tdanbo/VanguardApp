import { Socket } from "socket.io-client";
import * as Constants from "../Constants";
import { CharacterEntry, ItemEntry, SessionEntry } from "../Types";
import InventoryEntry from "../components_browser/InventoryEntry";
import { GetMaxSlots } from "../functions/RulesFunctions";
import InventoryEntryEmpty from "./InventoryEntryEmpty";

interface NavigationProps {
  character: CharacterEntry;
  session: SessionEntry;
  websocket: Socket;
  isCreature: boolean;
}

function InventorySection({
  character,
  session,
  websocket,
  isCreature,
}: NavigationProps) {
  function sortInventory(a: ItemEntry, b: ItemEntry): number {
    // First sort by category
    const categorySort =
      Constants.CATEGORY_FILTER.indexOf(a.static.category.toLowerCase()) -
      Constants.CATEGORY_FILTER.indexOf(b.static.category.toLowerCase());

    // If categories are the same, sort by light
    if (categorySort === 0) {
      return a.light === b.light ? 0 : a.light ? 1 : -1;
    }

    return categorySort;
  }

  character.inventory.sort(sortInventory);
  const sortedInventory = [...character.inventory].sort(sortInventory);

  const totalSlots = GetMaxSlots(character) * 2;

  return (
    <>
      {Array.from({ length: totalSlots }).map((_, index) => {
        const item = sortedInventory[index];
        if (item !== undefined && !item.equipped) {
          return (
            <InventoryEntry
              session={session}
              character={character}
              websocket={websocket}
              key={`InventoryEntry${index}`}
              browser={false}
              item={item}
              isCreature={isCreature}
              isGm={false}
              state={"drop"}
              tag={"CHARACTER INVENTORY"}
            />
          );
        }
      })}
      {Array.from({ length: 30 }).map((_, index) => {
        return <InventoryEntryEmpty key={`EmptyEntry${index}`} />;
      })}
    </>
  );
}

export default InventorySection;
