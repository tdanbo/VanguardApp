import { AbilityEntry } from "../../Types";

import AbilityEntryItem from "../../charactersheet/AbilityEntryItem";
import * as Constants from "../../Constants";
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

interface AbilityBrowserProps {
  browserState: number;
  abilityList: AbilityEntry[];
  setAbilityList: (abilityList: AbilityEntry[]) => void;
  setInventoryState: (inventoryState: number) => void;
}

function sortItems(a: AbilityEntry, b: AbilityEntry): number {
  const categoryComparison =
    Constants.TYPE_FILTER.indexOf(a.type) -
    Constants.TYPE_FILTER.indexOf(b.type);

  return categoryComparison;
}

function AbilityBrowser({
  browserState,
  abilityList,
  setInventoryState,
}: AbilityBrowserProps) {
  const sortedList = [...abilityList].sort(sortItems);
  return (
    <Container hidden={browserState !== 2}>
      <ItemContainer>
        {sortedList &&
          sortedList.map((ability, index) => (
            <AbilityEntryItem
              key={index}
              browser={true}
              ability={ability}
              setInventoryState={setInventoryState}
            />
          ))}
      </ItemContainer>
    </Container>
  );
}

export default AbilityBrowser;
