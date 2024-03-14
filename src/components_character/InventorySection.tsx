import { Socket } from "socket.io-client";
import * as Constants from "../Constants";
import {
  ActiveStateType,
  AdvantageType,
  CharacterEntry,
  ItemEntry,
  ItemTemplate,
  SessionEntry,
} from "../Types";
import InventoryEntry from "../components_browser/InventoryEntry";
import InventoryEntryEmpty from "./InventoryEntryEmpty";
import { GetMaxSlots } from "../functions/RulesFunctions";
import { GetItemEntry } from "../functions/UtilityFunctions";

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

// function sortInventory(a: ItemTemplate, b: ItemEntry): number {
//   return (
//     Constants.CATEGORY_FILTER.indexOf(a.category) -
//     Constants.CATEGORY_FILTER.indexOf(b.category)
//   );
// }

function InventorySection({
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
  // character.inventory.sort(sortInventory);
  // const sortedInventory = [...character.inventory].sort(sortInventory);

  return (
    <>
      {character.inventory.map((template, index) => {
        let item = GetItemEntry(template, equipment);
        if (item !== undefined && !template.equipped) {
          return (
            <InventoryEntry
              session={session}
              character={character}
              websocket={websocket}
              key={`InventoryEntry${index}`}
              browser={false}
              index={index}
              item={item}
              itemTemplate={template}
              id={template.id}
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
