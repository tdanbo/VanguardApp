import styled from "styled-components";
import * as Constants from "../Constants";
import { CharacterEntry, ItemEntry, SessionEntry } from "../Types";
import InventoryEntry from "../components/InventoryEntry";
import InventoryEntryEmpty from "../components/InventoryEntryEmpty";
import { GetMaxSlots } from "../functions/RulesFunctions";
const Container = styled.div<{ hidden: boolean }>`
  display: ${(props) => (props.hidden ? "none" : "flex")};
  flex-direction: column;
  flex-grow: 1;
  gap: 10px;
`;

interface NavigationProps {
  inventoryState: number;
  character: CharacterEntry;
  session: SessionEntry;
  websocket: WebSocket;
}

function sortInventory(a: ItemEntry, b: ItemEntry): number {
  return (
    Constants.CATEGORY_FILTER.indexOf(a.category) -
    Constants.CATEGORY_FILTER.indexOf(b.category)
  );
}

function InventorySection({
  inventoryState,
  character,
  session,
  websocket
}: NavigationProps) {
  console.log("Websocket Inventory Section")
  console.log(websocket)

  character.inventory.sort(sortInventory);
  const sortedInventory = [...character.inventory].sort(sortInventory);

  const totalSlots = GetMaxSlots(character) * 2;

  return (
    <Container hidden={inventoryState === 0 || inventoryState === 2}>
      {Array.from({ length: totalSlots }).map((_, index) => {
        const item = sortedInventory[index];
        if (item !== undefined && item.category !== "container") {
          return (
            <InventoryEntry
              session={session}
              character={character}
              websocket={websocket}
              key={index}
              browser={false}
              index={index}
              item={item}
              id={item.id}
              equipped={""}
              gmMode={false}
            />
          );
        }
      })}
      {Array.from({ length: 15 }).map((_, index) => {
        return <InventoryEntryEmpty key={index} />;
      })}
    </Container>
  );
}

export default InventorySection;
