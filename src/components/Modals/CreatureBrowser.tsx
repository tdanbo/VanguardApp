import { CreatureEntry } from "../../Types";

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
  creatureList: CreatureEntry[];
  encounter: CreatureEntry[];
  setEncounter: React.Dispatch<React.SetStateAction<CreatureEntry[]>>;
}

function sortItems(a: CreatureEntry, b: CreatureEntry): number {
  const raceComparison =
    Constants.RACE_FILTER.indexOf(a.race) -
    Constants.RACE_FILTER.indexOf(b.race);

  if (raceComparison === 0) {
    // If races are the same, sort by resistance
    return (
      Constants.DIFFICULTY_FILTER.indexOf(a.resistance) -
      Constants.DIFFICULTY_FILTER.indexOf(b.resistance)
    );
  }

  return raceComparison;
}

function CreatureBrowser({
  browserState,
  creatureList,
  encounter,
  setEncounter,
}: CreatureBrowserProps) {
  const sortedCreatureList = creatureList.sort(sortItems);
  return (
    <Container hidden={browserState !== 3}>
      <ItemContainer>
        {sortedCreatureList &&
          sortedCreatureList.map((creature, index) => (
            <CreatureEntryItem
              key={index}
              browser={true}
              creature={creature}
              encounter={encounter}
              setEncounter={setEncounter}
            />
          ))}
      </ItemContainer>
    </Container>
  );
}

export default CreatureBrowser;
