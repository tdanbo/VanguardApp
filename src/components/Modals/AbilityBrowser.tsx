import { AbilityEntry, CharacterEntry, SessionEntry } from "../../Types";

import styled from "styled-components";
import * as Constants from "../../Constants";
import AbilityEntryItem from "../../charactersheet/AbilityEntryItem";

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
  character: CharacterEntry;
  session: SessionEntry;
  websocket: WebSocket;
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
  character,
  session,
  websocket,
}: AbilityBrowserProps) {
  const sortedList = [...abilityList].sort(sortItems);
  return (
    <Container hidden={browserState !== 2}>
      <ItemContainer>
        {sortedList &&
          sortedList.map((ability, index) => (
            <AbilityEntryItem
              character={character}
              session={session}
              websocket={websocket}
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
