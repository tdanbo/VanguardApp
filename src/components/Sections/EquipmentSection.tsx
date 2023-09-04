import * as Constants from "../../Constants";
import TitleBox from "../TitleBox";
import InventoryEntry from "../InventoryEntry";
import InventoryEntryEmpty from "../InventoryEntryEmpty";
import { CharacterContext } from "../../contexts/CharacterContext";
import { useContext } from "react";

function EquipmentSection() {
  const { character } = useContext(CharacterContext);
  const equipped_slots = ["AR", "MH", "OH"];
  return (
    <>
      <TitleBox title={"Equipment"} />
      <div
        className="flex flex-col"
        style={{
          backgroundColor: Constants.PRIMARY,
        }}
      >
        {character.equipment.map((item, index) => {
          if (!item || Object.keys(item).length === 0) {
            console.log("Empty item: ", item, index);
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

export default EquipmentSection;
