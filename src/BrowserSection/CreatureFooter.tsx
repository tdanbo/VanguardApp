import { CreatureEntry } from "../Types";
import styled from "styled-components";
import * as Constants from "../Constants";
import axios from "axios";
import { API } from "../Constants";
import { useEffect } from "react";

interface ButtonProps {
  isActive: boolean;
}

const Button = styled.button<ButtonProps>`
  display: flex;
  flex-grow: 1;
  flex: 1;
  background-color: ${Constants.WIDGET_BACKGROUND};
  border: 1px solid ${Constants.WIDGET_BORDER};
  border-radius: 5px;
  color: ${(props) =>
    props.isActive
      ? Constants.WIDGET_SECONDARY_FONT
      : Constants.WIDGET_PRIMARY_FONT};
  cursor: pointer;
  font-size: 12px;
  height: 34px;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => (props.isActive ? 1 : 0.5)};
`;

const AllButton = styled.button`
  background-color: ${Constants.WIDGET_BACKGROUND};
  border: 1px solid ${Constants.WIDGET_BORDER};
  border-radius: 5px;
  color: ${Constants.WIDGET_SECONDARY_FONT};
  cursor: pointer;
  font-size: 12px;
  height: 34px;
  width: 34px;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-grow: 1;
  height: 34px;
  gap: 20px;
  justify-content: right;
`;

import { useState } from "react";

interface CreatureFooterProps {
  setTypeFilter: React.Dispatch<React.SetStateAction<string>>;
}

function CreatureFooter({ setTypeFilter }: CreatureFooterProps) {
  const [active, setActive] = useState<string | null>(null);

  const filterAndSortItems = (type: string) => {
    if (type === active) {
      setActive(null);
      setTypeFilter("all");
    } else {
      setActive(type);
      setTypeFilter(type);
    }
  };

  return (
    <Container>
      <Button
        onClick={() => filterAndSortItems("Abomination")}
        isActive={active === "Abomination"}
      >
        Abominations
      </Button>
      <Button
        onClick={() => filterAndSortItems("Beast")}
        isActive={active === "Beast"}
      >
        Beasts
      </Button>
      <Button
        onClick={() => filterAndSortItems("Cultural Being")}
        isActive={active === "Cultural Being"}
      >
        Cultural Beings
      </Button>
      <Button
        onClick={() => filterAndSortItems("Undead")}
        isActive={active === "Undead"}
      >
        Undead
      </Button>
    </Container>
  );
}

export default CreatureFooter;
