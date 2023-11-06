import InventoryEntry from "../InventoryEntry";
import { ItemEntry } from "../../Types";

import styled from "styled-components";
import * as Constants from "../../Constants";
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
  setInventoryState: (inventoryState: number) => void;
  gmMode: boolean;
}

function sortItems(a: ItemEntry, b: ItemEntry): number {
  const categoryComparison =
    Constants.CATEGORY_FILTER.indexOf(a.category) -
    Constants.CATEGORY_FILTER.indexOf(b.category);

  if (categoryComparison === 0) {
    return a.cost - b.cost;
  }

  return categoryComparison;
}

function EquipmentBrowser({
  browserState,
  itemList,
  setInventoryState,
  gmMode,
}: EquipmentBrowserProps) {
  const sortedList = [...itemList].sort(sortItems);
  return (
    <Container hidden={browserState !== 1}>
      <ItemContainer>
        {sortedList &&
          sortedList.map((item, index) => (
            <InventoryEntry
              key={index}
              browser={true}
              index={index}
              item={item}
              equipped={""}
              id={""}
              setInventoryState={setInventoryState}
              gmMode={gmMode}
            />
          ))}
      </ItemContainer>
    </Container>
  );
}

export default EquipmentBrowser;
