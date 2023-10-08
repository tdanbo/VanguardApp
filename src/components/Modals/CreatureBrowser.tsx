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

interface EquipmentBrowserProps {
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
}: EquipmentBrowserProps) {
  return (
    <Container hidden={browserState === 0 || browserState === 2}>
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
