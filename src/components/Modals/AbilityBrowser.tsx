import { useEffect } from "react";
import axios from "axios";
import * as Constants from "../../Constants";

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

const Input = styled.input`
  flex-grow: 1;
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  border: 1px solid ${Constants.WIDGET_BORDER};
  border-radius: ${Constants.BORDER_RADIUS};
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
