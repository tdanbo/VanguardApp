import TitleBox from "../TitleBox";
import * as Constants from "../../Constants";
import InventoryEntry from "../InventoryEntry";
import InventoryEntryEmpty from "../InventoryEntryEmpty";
import { CharacterEntry } from "../../Types";
import { useState, useContext } from "react";
import EquipmentBrowser from "../Modals/EquipmentBrowser";

import { CharacterContext } from "../../contexts/CharacterContext";

interface StatsSectionProps {
  selectedCharacter: CharacterEntry;
  onDeleteItem: (id: string) => void;
}

function InventorySection() {
  const { character, setCharacter } = useContext(CharacterContext);

  // const [update, setUpdater] = useState(0);
  const totalSlots = character.stats.strong.value * 2;
  const empty_slots =
    character.stats.strong.value * 2 - character.inventory.length;

  // console.log(empty_slots);
  return (
    <div className="flex-col p-1">
      <div className="flex">
        <EquipmentBrowser />
        <TitleBox title={"Inventory"} />
      </div>
      <div
        className="flex flex-grow flex-col-reverse overflow-auto"
        style={{
          backgroundColor: Constants.PRIMARY,
        }}
      >
        {Array.from({ length: totalSlots }).map((_, index) => {
          const item = character.inventory[index];
          if (item) {
            return (
              <InventoryEntry
                key={index}
                browser={false}
                index={index}
                item={item}
                id={item.id}
                equipped={""}
              />
            );
          } else if (index >= character.inventory.length) {
            return <InventoryEntryEmpty key={index} index={index + 1} />;
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default InventorySection;
