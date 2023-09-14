import TitleBox from "../TitleBox";
import * as Constants from "../../Constants";
import InventoryEntry from "../InventoryEntry";
import InventoryEntryEmpty from "../InventoryEntryEmpty";
import { useContext } from "react";
import EquipmentBrowser from "../Modals/EquipmentBrowser";

import { CharacterContext } from "../../contexts/CharacterContext";

function InventorySection() {
  const { character } = useContext(CharacterContext);

  // const [update, setUpdater] = useState(0);
  const totalSlots = character.stats.strong.value * 2;

  // console.log(empty_slots);
  return (
    <>
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
    </>
  );
}

export default InventorySection;
