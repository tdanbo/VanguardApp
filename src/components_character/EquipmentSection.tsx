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

function EquipmentSection({
  character,
  session,
  websocket,
  isCreature,
}: NavigationProps) {
  function sortInventory(a: ItemEntry, b: ItemEntry): number {
    return (
      Constants.TYPE_FILTER.indexOf(a.static.category.toLowerCase()) -
      Constants.TYPE_FILTER.indexOf(b.static.category.toLowerCase())
    );
  }

  character.inventory.sort(sortInventory);
  const sortedInventory = [...character.inventory].sort(sortInventory);
  const totalSlots = GetMaxSlots(character) * 2;

  return (
    <>
      <div
        className="row"
        style={{
          maxHeight: "10px",
          fontSize: "11px",
          fontWeight: "bold",
          color: Constants.WIDGET_SECONDARY_FONT_INACTIVE,
        }}
      >
        Equipment <div className="divider_horizontal" />
      </div>
      {Array.from({ length: totalSlots }).map((_, index) => {
        const item = sortedInventory[index];
        if (item !== undefined && item.equipped) {
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
              state="drop"
              tag="CHARACTER EQUIPMENT"
            />
          );
        }
      })}
      {Array.from({ length: 20 }).map((_, index) => {
        return <InventoryEntryEmpty key={index} />;
      })}
    </>
  );
}

export default EquipmentSection;
