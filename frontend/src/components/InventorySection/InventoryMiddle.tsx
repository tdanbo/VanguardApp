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

function InventoryMiddle() {
  const { character, setCharacter } = useContext(CharacterContext);

  // const [update, setUpdater] = useState(0);
  const totalSlots = character.stats.strong * 2;
  const empty_slots = character.stats.strong * 2 - character.inventory.length;

  const equipped_slots = ["AR", "MH", "OH"];

  // console.log(empty_slots);
  return (
    <>
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
      <TitleBox title={"Equipment"} />
      <div
        className="flex flex-col"
        style={{
          backgroundColor: Constants.PRIMARY,
        }}
      >
        {character.equipment.map((item, index) => {
          if (!item || Object.keys(item).length === 0) {
            return <InventoryEntryEmpty key={index} index={index} />;
          }

          return (
            <InventoryEntry
              key={index}
              index={index}
              item={item}
              browser={false}
              id={item.id}
              equipped={equipped_slots[index]}
            />
          );
        })}
      </div>
    </>
  );
}

export default InventoryMiddle;
