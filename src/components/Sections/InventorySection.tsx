import TitleBox from "../TitleBox";
import * as Constants from "../../Constants";
import InventoryEntry from "../InventoryEntry";
import InventoryEntryEmpty from "../InventoryEntryEmpty";
import { useContext } from "react";
import EquipmentBrowser from "../Modals/EquipmentBrowser";

import { CharacterContext } from "../../contexts/CharacterContext";
import styled from "styled-components";
function InventorySection() {
  const { character } = useContext(CharacterContext);

  // const [update, setUpdater] = useState(0);
  const totalSlots = character.stats.strong.value * 2;

  // console.log(empty_slots);
  const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 10px;
  `;
  return (
    <Container>
      {Array.from({ length: 20 }).map((_, index) => {
        return <InventoryEntryEmpty key={index} index={index + 1} />;
      })}
      {/* {Array.from({ length: totalSlots }).map((_, index) => {
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
      })} */}
    </Container>
  );
}

export default InventorySection;
