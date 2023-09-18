import TitleBox from "../TitleBox";
import * as Constants from "../../Constants";
import InventoryEntry from "../InventoryEntry";
import InventoryEntryEmpty from "../InventoryEntryEmpty";
import { useContext } from "react";
import EquipmentBrowser from "../Modals/EquipmentBrowser";

import { CharacterContext } from "../../contexts/CharacterContext";
import styled from "styled-components";

const Container = styled.div<{ hidden: boolean }>`
  display: ${(props) => (props.hidden ? "none" : "flex")};
  flex-direction: column;
  flex-grow: 1;
  gap: 10px;
`;

interface NavigationProps {
  inventoryState: number;
}

function InventorySection({ inventoryState }: NavigationProps) {
  const { character } = useContext(CharacterContext);

  // const [update, setUpdater] = useState(0);
  const totalSlots = character.stats.strong.value * 2;

  // console.log(empty_slots);

  return (
    <Container hidden={inventoryState === 0 || inventoryState === 2}>
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
        }
      })}
      {Array.from({ length: 10 }).map((_, index) => {
        return <InventoryEntryEmpty key={index} index={index + 1} />;
      })}
    </Container>
  );
}

export default InventorySection;
