import InventoryEntryEmpty from "../InventoryEntryEmpty";
import { useContext } from "react";
import { AbilityEntry } from "../../Types";
import { CharacterContext } from "../../contexts/CharacterContext";
import styled from "styled-components";
import AbilityEntryItem from "../AbilityEntryItem";
import * as Constants from "../../Constants";
const Container = styled.div<{ hidden: boolean }>`
  display: ${(props) => (props.hidden ? "none" : "flex")};
  flex-direction: column;
  flex-grow: 1;
  gap: 10px;
`;

interface NavigationProps {
  inventoryState: number;
}

function sortAbilities(a: AbilityEntry, b: AbilityEntry): number {
  return (
    Constants.TYPE_FILTER.indexOf(a.type.toLowerCase()) -
    Constants.TYPE_FILTER.indexOf(b.type.toLowerCase())
  );
}

function AbilitySection({ inventoryState }: NavigationProps) {
  const { character } = useContext(CharacterContext);

  const sortedAbilities = [...character.abilities].sort(sortAbilities);

  return (
    <Container hidden={inventoryState === 0 || inventoryState === 1}>
      {sortedAbilities.map((ability, index) => {
        return (
          <AbilityEntryItem key={index} ability={ability} browser={false} />
        );
      })}
      {Array.from({ length: 15 }).map((_, index) => {
        return <InventoryEntryEmpty key={index} />;
      })}
    </Container>
  );
}

export default AbilitySection;
