import { CharacterEntry, SessionEntry } from "../Types";

import styled from "styled-components";
import CreatureEntryItem from "../components/Entries/CreatureEntryItem";
import * as Constants from "../Constants";
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

interface CreatureBrowserProps {
  session: SessionEntry;
  character: CharacterEntry;
  browserState: number;
  creatureList: CharacterEntry[];
  creatureEncounter: CharacterEntry[];
  setCreatureEncounter: React.Dispatch<React.SetStateAction<CharacterEntry[]>>;
  setCreatureEdit: React.Dispatch<React.SetStateAction<boolean>>;
  gmMode: boolean;
}

function sortItems(a: CharacterEntry, b: CharacterEntry): number {
  const raceComparison =
    Constants.RACE_FILTER.indexOf(a.name) -
    Constants.RACE_FILTER.indexOf(b.name);

  return raceComparison;
}

function CreatureBrowser({
  session,
  character,
  browserState,
  creatureList,
  creatureEncounter,
  setCreatureEncounter,
  setCreatureEdit,
  gmMode,
}: CreatureBrowserProps) {
  const sortedCreatureList = creatureList.sort(sortItems);
  return (
    <Container hidden={browserState !== 4}>
      <ItemContainer>
        {sortedCreatureList &&
          sortedCreatureList.map((creature, index) => (
            <CreatureEntryItem
              session={session}
              character={character}
              key={index}
              browser={true}
              creature={creature}
              encounter={creatureEncounter}
              setEncounter={setCreatureEncounter}
              setCreatureEdit={setCreatureEdit}
              gmMode={gmMode}
              browserState={browserState}
            />
          ))}
      </ItemContainer>
    </Container>
  );
}

export default CreatureBrowser;
