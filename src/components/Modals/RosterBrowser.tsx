import { CharacterEntry } from "../../Types";

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
  rosterlist: CharacterEntry[];
  creatureEncounter: CharacterEntry[];
  setCreatureEncounter: React.Dispatch<React.SetStateAction<CharacterEntry[]>>;
  setCreatureEdit: React.Dispatch<React.SetStateAction<boolean>>;
  gmMode: boolean;
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

function RosterBrowser({
  browserState,
  rosterlist,
  creatureEncounter,
  setCreatureEncounter,
  setCreatureEdit,
  gmMode,
}: CreatureBrowserProps) {
  const sortedCreatureList = rosterlist.sort(sortItems);
  return (
    <Container hidden={browserState !== 5}>
      <ItemContainer>
        {sortedCreatureList &&
          sortedCreatureList.map((creature, index) => (
            <CreatureEntryItem
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

export default RosterBrowser;