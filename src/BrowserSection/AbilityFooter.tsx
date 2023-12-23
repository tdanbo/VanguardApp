import styled from "styled-components";
import * as Constants from "../Constants";

interface ButtonProps {
  "data-isactive": boolean;
}

const Button = styled.button<ButtonProps>`
  display: flex;
  flex-grow: 1;
  flex: 1;
  background-color: ${Constants.WIDGET_BACKGROUND};
  border: 1px solid ${Constants.WIDGET_BORDER};
  border-radius: 5px;
  color: ${(props) =>
    props["data-isactive"]
      ? Constants.WIDGET_SECONDARY_FONT
      : Constants.WIDGET_PRIMARY_FONT};
  cursor: pointer;
  font-size: 12px;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => (props["data-isactive"] ? 1 : 0.5)};
`;

const Container = styled.div`
  display: flex;
  flex-grow: 1;
  gap: 20px;
  justify-content: right;
`;

import { useState } from "react";

interface AbilityFooterProps {
  setTypeFilter: React.Dispatch<React.SetStateAction<string>>;
}

function AbilityFooter({ setTypeFilter }: AbilityFooterProps) {
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
        onClick={() => filterAndSortItems("Ability")}
        data-isactive={active === "Ability"}
      >
        Abilities
      </Button>
      <Button
        onClick={() => filterAndSortItems("Mystical Power")}
        data-isactive={active === "Mystical Power"}
      >
        Mystical Powers
      </Button>
      <Button
        onClick={() => filterAndSortItems("Ritual")}
        data-isactive={active === "Ritual"}
      >
        Rituals
      </Button>
      <Button
        onClick={() => filterAndSortItems("Trait")}
        data-isactive={active === "Trait"}
      >
        Traits
      </Button>
      <Button
        onClick={() => filterAndSortItems("BoonBurden")}
        data-isactive={active === "Boon"}
      >
        Boons / Burdens
      </Button>
    </Container>
  );
}

export default AbilityFooter;
