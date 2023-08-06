import TitleBox from "../TitleBox";
import * as Constants from "../../Constants";
import InventoryEntry from "../InventoryEntry";
import InventoryEntryEmpty from "../InventoryEntryEmpty";
import { CharacterEntry } from "../../Types";
import { useState } from "react";
import EquipmentBrowser from "../EquiptmentModal/EquipmentBrowser";

interface StatsSectionProps {
  selectedCharacter: CharacterEntry;
  onDeleteItem: (id: string) => void;
}

function InventoryMiddle({
  selectedCharacter,
  onDeleteItem,
}: StatsSectionProps) {
  const [update, setUpdater] = useState(0);
  const totalSlots = selectedCharacter.stats.strong * 2;
  const empty_slots =
    selectedCharacter.stats.strong * 2 - selectedCharacter.inventory.length;

  console.log(empty_slots);
  return (
    <>
      <div className="flex">
        <EquipmentBrowser
          selectedCharacter={selectedCharacter}
          setUpdater={setUpdater}
          update={update}
          onDeleteItem={onDeleteItem}
        />
        <TitleBox title={"Inventory"} />
      </div>
      <div
        className="flex flex-grow flex-col-reverse overflow-auto"
        style={{
          backgroundColor: Constants.PRIMARY,
        }}
      >
        {Array.from({ length: totalSlots }).map((_, index) => {
          const item = selectedCharacter.inventory[index];
          if (item) {
            return (
              <InventoryEntry
                key={index}
                browser={false}
                index={index}
                item={item}
                selectedCharacter={selectedCharacter}
                setUpdater={setUpdater}
                onDeleteItem={onDeleteItem}
                update={update}
                id={item.id}
              />
            );
          } else if (index >= selectedCharacter.inventory.length) {
            return (
              <InventoryEntryEmpty
                key={index}
                index={index + 1}
                selectedCharacter={selectedCharacter}
              />
            );
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
        {selectedCharacter.equipment.map((item, index) => {
          if (!item || Object.keys(item).length === 0) {
            return (
              <InventoryEntryEmpty
                key={index}
                index={index}
                selectedCharacter={selectedCharacter}
              />
            );
          }

          return (
            <InventoryEntry
              key={index}
              index={index}
              item={item}
              selectedCharacter={selectedCharacter}
              setUpdater={setUpdater}
              update={update}
              browser={false}
              id={item.id}
              onDeleteItem={onDeleteItem}
            />
          );
        })}
      </div>
    </>
  );
}

export default InventoryMiddle;
