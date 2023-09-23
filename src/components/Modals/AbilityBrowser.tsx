import { AbilityEntry } from "../../Types";

import AbilityEntryItem from "../AbilityEntryItem";

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
}

function AbilityBrowser({ browserState, abilityList }: AbilityBrowserProps) {
  return (
    <Container hidden={browserState === 0 || browserState === 1}>
      <ItemContainer>
        {abilityList &&
          abilityList.map((ability, index) => (
            <AbilityEntryItem key={index} browser={true} ability={ability} />
          ))}
      </ItemContainer>
    </Container>
  );
}

export default AbilityBrowser;
