import { CreatureEntry } from "../../Types";

import styled from "styled-components";
import CreatureEntryItem from "../CreatureEntryItem";

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

function CreatureBrowser({
  browserState,
  creatureList,
  encounter,
  setEncounter,
}: CreatureBrowserProps) {
  return (
    <Container hidden={browserState !== 3}>
      <ItemContainer>
        {creatureList &&
          creatureList.map((creature, index) => (
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
