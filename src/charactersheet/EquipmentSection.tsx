import { Socket } from "socket.io-client";
import * as Constants from "../Constants";
import { CharacterEntry, ItemEntry, SessionEntry } from "../Types";
import InventoryEntry from "../components/Entries/InventoryEntry";
import { GetMaxSlots } from "../functions/RulesFunctions";
import styled from "styled-components";
const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 0;
  gap: ${Constants.WIDGET_GAB};
  max-width: 100%;
  background-color: ${Constants.BACKGROUND};
`;

interface NavigationProps {
  character: CharacterEntry;
  session: SessionEntry;
  websocket: Socket;
  isCreature: boolean;
}

function sortInventory(a: ItemEntry, b: ItemEntry): number {
  return (
    Constants.CATEGORY_FILTER.indexOf(a.category) -
    Constants.CATEGORY_FILTER.indexOf(b.category)
  );
}

function EquipmentSection({
  character,
  session,
  websocket,
  isCreature,
}: NavigationProps) {
  character.inventory.sort(sortInventory);
  const sortedInventory = [...character.inventory].sort(sortInventory);

  const totalSlots = GetMaxSlots(character) * 2;

  return (
    <Column>
      {Array.from({ length: totalSlots }).map((_, index) => {
        const item = sortedInventory[index];
        if (item !== undefined && item.equip.equipped) {
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
              gmMode={false}
              isCreature={isCreature}
              canBuy={false}
              isGm={false}
            />
          );
        }
      })}
    </Column>
  );
}

export default EquipmentSection;
