import { Socket } from "socket.io-client";
import * as Constants from "../Constants";
import {
  ActiveStateType,
  AdvantageType,
  CharacterEntry,
  ItemEntry,
  SessionEntry,
} from "../Types";
import InventoryEntry from "../components_browser/InventoryEntry";
import { GetMaxSlots } from "../functions/RulesFunctions";
import InventoryEntryEmpty from "./InventoryEntryEmpty";

interface NavigationProps {
  character: CharacterEntry;
  session: SessionEntry;
  websocket: Socket;
  isCreature: boolean;
  activeState: ActiveStateType;
  advantage: AdvantageType;
  setActiveState: React.Dispatch<React.SetStateAction<ActiveStateType>>;
  setAdvantage: React.Dispatch<React.SetStateAction<AdvantageType>>;
}

function InventorySection({
  character,
  session,
  websocket,
  isCreature,
  activeState,
  advantage,
  setActiveState,
  setAdvantage,
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
              index={index}
              item={item}
              id={item.id}
              equipped={""}
              isCreature={isCreature}
              canBuy={false}
              isGm={false}
              activeState={activeState}
              advantage={advantage}
              setActiveState={setActiveState}
              setAdvantage={setAdvantage}
            />
          );
        }
      })}
      {Array.from({ length: 20 }).map((_, index) => {
        return <InventoryEntryEmpty key={`EmptyEntry${index}`} />;
      })}
    </>
  );
}

export default InventorySection;
