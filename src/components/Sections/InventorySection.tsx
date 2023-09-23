import InventoryEntry from "../InventoryEntry";
import InventoryEntryEmpty from "../InventoryEntryEmpty";
import { useContext } from "react";
import { ItemEntry } from "../../Types";
import { CharacterContext } from "../../contexts/CharacterContext";
import styled from "styled-components";

const Container = styled.div<{ hidden: boolean }>`
  display: ${(props) => (props.hidden ? "none" : "flex")};
  flex-direction: column;
  flex-grow: 1;
  gap: 10px;
`;

interface NavigationProps {
  inventoryState: number;
}

const priorityList = [
  "quality_weapon",
  "ordinary_weapon",
  "quality_ranged",
  "ordinary_ranged",
  "ammunition",
  "quality_armor",
  "ordinary_armor",
  "lesser_artifact",
  "elixirs",
  "tools",
];

function sortInventory(a: ItemEntry, b: ItemEntry): number {
  return priorityList.indexOf(a.category) - priorityList.indexOf(b.category);
}

function InventorySection({ inventoryState }: NavigationProps) {
  const { character } = useContext(CharacterContext);

  character.inventory.sort(sortInventory);
  const sortedInventory = [...character.inventory].sort(sortInventory);

  const totalSlots = character.stats.strong.value * 2;

  return (
    <Container hidden={inventoryState === 0 || inventoryState === 2}>
      {Array.from({ length: totalSlots }).map((_, index) => {
        const item = sortedInventory[index];
        if (item) {
          return (
            <InventoryEntry
              key={index}
              browser={false}
              index={index}
              item={item}
              id={item.id}
              equipped={""}
            />
          );
        }
      })}
      {Array.from({ length: 10 }).map((_, index) => {
        return <InventoryEntryEmpty key={index} />;
      })}
    </Container>
  );
}

export default InventorySection;
