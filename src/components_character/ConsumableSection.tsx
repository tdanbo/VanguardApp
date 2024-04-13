import { Socket } from "socket.io-client";
import styled from "styled-components";
import * as Constants from "../Constants";
import { IsConsumable } from "../functions/UtilityFunctions";
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
  activeState: ActiveStateType;
  advantage: AdvantageType;
  setActiveState: React.Dispatch<React.SetStateAction<ActiveStateType>>;
  setAdvantage: React.Dispatch<React.SetStateAction<AdvantageType>>;
}

function ConsumableSection({
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
    return (
      Constants.TYPE_FILTER.indexOf(a.static.category.toLowerCase()) -
      Constants.TYPE_FILTER.indexOf(b.static.category.toLowerCase())
    );
  }

  character.inventory.sort(sortInventory);
  const sortedInventory = [...character.inventory].sort(sortInventory);
  const totalSlots = GetMaxSlots(character) * 2;

  return (
    <Column>
      {Array.from({ length: totalSlots }).map((_, index) => {
        const item = sortedInventory[index];
        if (item !== undefined && IsConsumable(item)) {
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
              isDrop={false}
            />
          );
        }
      })}
      {Array.from({ length: 20 }).map((_, index) => {
        return <InventoryEntryEmpty key={`EmptyEntry${index}`} />;
      })}
    </Column>
  );
}

export default ConsumableSection;
