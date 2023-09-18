import InventoryEntryEmpty from "../InventoryEntryEmpty";
import { useContext } from "react";

import { CharacterContext } from "../../contexts/CharacterContext";
import styled from "styled-components";
import AbilityEntryItem from "../AbilityEntryItem";

const Container = styled.div<{ hidden: boolean }>`
  display: ${(props) => (props.hidden ? "none" : "flex")};
  flex-direction: column;
  flex-grow: 1;
  gap: 10px;
`;

interface NavigationProps {
  inventoryState: number;
}

function AbilitySection({ inventoryState }: NavigationProps) {
  const { character } = useContext(CharacterContext);

  return (
    <Container hidden={inventoryState === 0 || inventoryState === 1}>
      {character.abilities.map((ability, index) => {
        return (
          <AbilityEntryItem key={index} ability={ability} browser={false} />
        );
      })}
      {Array.from({ length: 10 }).map((_, index) => {
        return <InventoryEntryEmpty key={index} index={index + 1} />;
      })}
    </Container>
  );
}

export default AbilitySection;
