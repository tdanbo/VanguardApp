import TitleBox from "../TitleBox";
import * as Constants from "../../Constants";
import InventoryEntry from "../InventoryEntry";
import InventoryEntryEmpty from "../InventoryEntryEmpty";
import OpenEquipmentBrowser from "../EquipmentBrowser/OpenEquipmentBrowser";
import { CharacterEntry } from "../../Types";
import { useState } from "react";
import { ItemEntry } from "../../Types";

interface StatsSectionProps {
  selectedCharacter: CharacterEntry;
}

function InventoryMiddle({ selectedCharacter }: StatsSectionProps) {
  const [update, setUpdater] = useState(0);
  return (
    <>
      <div className="flex">
        <OpenEquipmentBrowser
          selectedCharacter={selectedCharacter}
          setUpdater={setUpdater}
          update={update}
        />
        <TitleBox title={"Inventory"} />
      </div>
      <div
        className="flex flex-grow flex-col-reverse overflow-auto"
        style={{
          backgroundColor: Constants.PRIMARY,
        }}
      >
        {Object.keys(selectedCharacter.inventory).map((key, index) => {
          const item = selectedCharacter.inventory[key] as ItemEntry;
          if (!item || Object.keys(item).length === 0) {
            console.log("Found an empty slot!");
            console.log(selectedCharacter);
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
            />
          );
        })}
      </div>
      <TitleBox title={"Equipment"} />
      <div
        className="flex flex-col"
        style={{
          backgroundColor: Constants.PRIMARY,
        }}
      >
        {Object.keys(selectedCharacter.equipment).map((key, index) => {
          const item = selectedCharacter.equipment[key] as ItemEntry;
          if (!item || Object.keys(item).length === 0) {
            console.log("Found an empty slot!");
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
            />
          );
        })}
      </div>
    </>
  );
}

export default InventoryMiddle;
