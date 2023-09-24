import InventoryEntry from "../InventoryEntry";
import { ItemEntry } from "../../Types";

import styled from "styled-components";

const Container = styled.div<{ hidden: boolean }>`
  display: ${(props) => (props.hidden ? "none" : "flex")};
  flex-direction: column;
  flex-grow: 1;
  gap: 10px;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 10px;
`;

interface EquipmentBrowserProps {
  browserState: number;
  itemList: ItemEntry[];
  setItemList: (itemList: ItemEntry[]) => void;
}

function EquipmentBrowser({ browserState, itemList }: EquipmentBrowserProps) {
  return (
    <Container hidden={browserState === 0 || browserState === 2}>
      <ItemContainer>
        {itemList &&
          itemList.map((item, index) => (
            <InventoryEntry
              key={index}
              browser={true}
              index={index}
              item={item}
              equipped={""}
              id={""}
            />
          ))}
      </ItemContainer>
    </Container>
  );
}

export default EquipmentBrowser;
