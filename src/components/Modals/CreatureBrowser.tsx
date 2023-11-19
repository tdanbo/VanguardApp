import { CharacterEntry, CreatureEntry } from "../../Types";

import styled from "styled-components";
import CreatureEntryItem from "../CreatureEntryItem";
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

interface CreatureBrowserProps {
  browserState: number;
  creatureList: CharacterEntry[];
  creatureEncounter: CharacterEntry[];
  setCreatureEncounter: React.Dispatch<React.SetStateAction<CharacterEntry[]>>;
}

function sortItems(a: CharacterEntry, b: CharacterEntry): number {
  const raceComparison =
    Constants.RACE_FILTER.indexOf(a.name) -
    Constants.RACE_FILTER.indexOf(b.name);

  // if (raceComparison === 0) {
  //   // If races are the same, sort by resistance
  //   return (
  //     Constants.DIFFICULTY_FILTER.indexOf(a.resistance) -
  //     Constants.DIFFICULTY_FILTER.indexOf(b.resistance)
  //   );
  // }

  return raceComparison;
}

function CreatureBrowser({
  browserState,
  creatureList,
  creatureEncounter,
  setCreatureEncounter,
}: CreatureBrowserProps) {
  const sortedCreatureList = creatureList.sort(sortItems);
  return (
    <Container hidden={browserState !== 4}>
      <ItemContainer>
        {sortedCreatureList &&
          sortedCreatureList.map((creature, index) => (
            <CreatureEntryItem
              key={index}
              browser={true}
              creature={creature}
              encounter={creatureEncounter}
              setEncounter={setCreatureEncounter}
            />
          ))}
      </ItemContainer>
    </Container>
  );
}

export default CreatureBrowser;
