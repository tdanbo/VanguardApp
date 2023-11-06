import { ItemEntry } from "../../Types";
import styled from "styled-components";
import * as Constants from "../../Constants";
import axios from "axios";
import { API } from "../../Constants";
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
  height: 35px;
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
  height: 35px;
  width: 35px;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-grow: 1;
  height: 35px;
  gap: 20px;
  justify-content: right;
`;

import { useState } from "react";
// Import other necessary components and types

interface EquipmentFooterProps {
  itemList: ItemEntry[];
  setItemList: (itemList: ItemEntry[]) => void;
}

function EquipmentFooter({ itemList, setItemList }: EquipmentFooterProps) {
  const [fullList, setFullList] = useState<ItemEntry[]>(itemList);
  const [active, setActive] = useState<string | null>(null);

  function sortItems(a: ItemEntry, b: ItemEntry): number {
    const categoryComparison =
      Constants.CATEGORY_FILTER.indexOf(a.category) -
      Constants.CATEGORY_FILTER.indexOf(b.category);

    if (categoryComparison === 0) {
      return a.cost - b.cost;
    }

    return categoryComparison;
  }

  function filterAndSortItems(category: string) {
    setActive(category);
    const filteredItems = fullList.filter((item) => item.category === category);
    const sortedItems = filteredItems.sort(sortItems);
    setItemList(sortedItems);
  }

  useEffect(() => {
    const fetchItems = async () => {
      const response = await axios.get(`${API}/api/equipment`);
      const sortedInventory = [...response.data].sort(sortItems);
      setFullList(sortedInventory);
    };
    fetchItems();
  }, []);

  return (
    <Container>
      <AllButton
        onClick={() => {
          setItemList([...fullList].sort(sortItems));
          setActive(null);
        }}
      >
        A
      </AllButton>
      <Button
        onClick={() => filterAndSortItems("weapon")}
        isActive={active === "weapon"}
      >
        Weapons
      </Button>
      <Button
        onClick={() => filterAndSortItems("ranged")}
        isActive={active === "ranged"}
      >
        Ranged
      </Button>
      <Button
        onClick={() => filterAndSortItems("armor")}
        isActive={active === "armor"}
      >
        Armor
      </Button>
      <Button
        onClick={() => filterAndSortItems("elixirs")}
        isActive={active === "elixirs"}
      >
        Elixirs
      </Button>
      <Button
        onClick={() => filterAndSortItems("tool")}
        isActive={active === "tools"}
      >
        Tools
      </Button>
      <Button
        onClick={() => filterAndSortItems("ammunition")}
        isActive={active === "ammunition"}
      >
        Ammunition
      </Button>
    </Container>
  );
}

export default EquipmentFooter;
