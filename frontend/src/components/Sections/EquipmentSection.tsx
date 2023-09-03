import * as Constants from "../../Constants";
import TitleBox from "../TitleBox";
import InventoryEntry from "../InventoryEntry";
import InventoryEntryEmpty from "../InventoryEntryEmpty";
import { CharacterContext } from "../../contexts/CharacterContext";
import { useContext } from "react";

function EquipmentSection() {
  const { character, setCharacter } = useContext(CharacterContext);
  const equipped_slots = ["AR", "MH", "OH"];
  return (
    <div className="p-1">
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
    </div>
  );
}

export default EquipmentSection;
