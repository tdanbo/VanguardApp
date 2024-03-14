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
import { UpdateStaticItem } from "../functions/UtilityFunctions";
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
  activeState: ActiveStateType;
  advantage: AdvantageType;
  setActiveState: React.Dispatch<React.SetStateAction<ActiveStateType>>;
  setAdvantage: React.Dispatch<React.SetStateAction<AdvantageType>>;
  equipment: ItemEntry[];
}

function sortInventory(a: ItemEntry, b: ItemEntry): number {
  return (
    Constants.CATEGORY_FILTER.indexOf(a.static.category) -
    Constants.CATEGORY_FILTER.indexOf(b.static.category)
  );
}

function EquipmentSection({
  character,
  session,
  websocket,
  isCreature,
  activeState,
  advantage,
  setActiveState,
  setAdvantage,
  equipment,
}: NavigationProps) {
  character.inventory.sort(sortInventory);
  const sortedInventory = [...character.inventory].sort(sortInventory);

  const totalSlots = GetMaxSlots(character) * 2;

  return (
    <Column>
      {Array.from({ length: totalSlots }).map((_, index) => {
        const item = sortedInventory[index];
        if (item !== undefined && item.equipped) {
          UpdateStaticItem(item, equipment);
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
    </Column>
  );
}

export default EquipmentSection;
