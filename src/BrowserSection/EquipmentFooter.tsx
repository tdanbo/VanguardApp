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
// Import other necessary components and types

interface EquipmentFooterProps {
  setTypeFilter: React.Dispatch<React.SetStateAction<string>>;
}

function EquipmentFooter({ setTypeFilter }: EquipmentFooterProps) {
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
        onClick={() => filterAndSortItems("weapon")}
        data-isactive={active === "weapon"}
      >
        Weapons
      </Button>
      <Button
        onClick={() => filterAndSortItems("ammunition")}
        data-isactive={active === "ammunition"}
      >
        Ammunition
      </Button>
      <Button
        onClick={() => filterAndSortItems("armor")}
        data-isactive={active === "armor"}
      >
        Armor
      </Button>
      <Button
        onClick={() => filterAndSortItems("elixirs")}
        data-isactive={active === "elixirs"}
      >
        Elixirs
      </Button>
      <Button
        onClick={() => filterAndSortItems("tools")}
        data-isactive={active === "tools"}
      >
        Tools
      </Button>
    </Container>
  );
}

export default EquipmentFooter;
