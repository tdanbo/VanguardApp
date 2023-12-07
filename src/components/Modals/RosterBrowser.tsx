import { CharacterEntry, SessionEntry } from "../../Types";

import styled from "styled-components";
import CreatureEntryItem from "../CreatureEntryItem";
import * as Constants from "../../Constants";
import { useContext } from "react";
import { SessionContext } from "../../contexts/SessionContext";
import CharacterBox from "../SelectorPage/CharacterBox";
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
  setCharacterName: React.Dispatch<React.SetStateAction<string>>;
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
  session,
  setCharacterName,
}: CreatureBrowserProps) {
  console.log("RosterBrowser");
  console.log(session);
  return (
    <Container hidden={browserState !== 5}>
      <ItemContainer>
        {session.characters.map((character, index) => (
          <CharacterBox
            key={index}
            selectedCharacter={character}
            setCharacterName={setCharacterName}
          />
        ))}
      </ItemContainer>
    </Container>
  );
}

export default RosterBrowser;
