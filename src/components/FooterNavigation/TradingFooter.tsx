import { ItemEntry } from "../../Types";
import styled from "styled-components";
import * as Constants from "../../Constants";
import { TownsEntry } from "../../Types";
import axios from "axios";
import { API } from "../../Constants";
import { useEffect } from "react";

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
  height: 34px;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => (props["data-isactive"] ? 1 : 0.5)};
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
// Import other necessary components and types

const LonelyFarm: TownsEntry = {
  name: "Lonely Farm",
  cost: 10,
  total: 100,
};

const SolitaryVillage: TownsEntry = {
  name: "Solitary Village",
  cost: 100,
  total: 1000,
};

const OrdinaryVillage: TownsEntry = {
  name: "Ordinary Village",
  cost: 300,
  total: 3000,
};

const TradeStation: TownsEntry = {
  name: "Trade Station",
  cost: 1000,
  total: 10000,
};

const AmbrianTown: TownsEntry = {
  name: "Ambrian Town",
  cost: 5000,
  total: 50000,
};

const ThistleHold: TownsEntry = {
  name: "Thistle Hold",
  cost: 10000,
  total: 100000,
};

const Yndaros: TownsEntry = {
  name: "Yndaros",
  cost: 100000,
  total: 1000000,
};

interface TradingFooterProps {
  itemList: ItemEntry[];
  setItemList: (itemList: ItemEntry[]) => void;
}

function sortItems(a: ItemEntry, b: ItemEntry): number {
  const categoryComparison =
    Constants.CATEGORY_FILTER.indexOf(a.category) -
    Constants.CATEGORY_FILTER.indexOf(b.category);

  // If items are in the same category, sort by cost (cheapest first)
  if (categoryComparison === 0) {
    return a.cost - b.cost; // This will sort items in ascending order of cost
  }

  return categoryComparison;
}

function shuffleArray(array: ItemEntry[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
}

function TradingFooter({ itemList, setItemList }: TradingFooterProps) {
  const [fullList, setFullList] = useState<ItemEntry[]>(itemList);
  const [activeTown, setActiveTown] = useState<string | null>(null);

  const filterItems = (town: TownsEntry) => {
    setActiveTown(town.name);
    const townTotal = town.total;
    let currentTotal = 0;
    const filteredItems = [];

    shuffleArray(fullList);

    for (const item of fullList) {
      // Ensure item.cost is treated as a number
      const itemCost = Number(item.cost);

      if (itemCost > 0 && itemCost <= town.cost) {
        if (currentTotal + itemCost <= townTotal) {
          filteredItems.push(item);
          currentTotal += itemCost; // Now correctly adding numbers
        } else {
          break;
        }
      }
    }

    const sortedItems = [...filteredItems].sort(sortItems);

    setItemList(sortedItems);
  };

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
          setActiveTown(null);
        }}
      >
        A
      </AllButton>
      <Button
        onClick={() => filterItems(LonelyFarm)}
        data-isactive={activeTown === "Lonely Farm"}
      >
        Lonely Farm
      </Button>
      <Button
        onClick={() => filterItems(SolitaryVillage)}
        data-isactive={activeTown === "Solitary Village"}
      >
        Solitary Village
      </Button>
      <Button
        onClick={() => filterItems(OrdinaryVillage)}
        data-isactive={activeTown === "Ordinary Village"}
      >
        Ordinary Village
      </Button>
      <Button
        onClick={() => filterItems(TradeStation)}
        data-isactive={activeTown === "Trade Station"}
      >
        Trade Station
      </Button>
      <Button
        onClick={() => filterItems(AmbrianTown)}
        data-isactive={activeTown === "Ambrian Town"}
      >
        Ambrian Town
      </Button>
      <Button
        onClick={() => filterItems(ThistleHold)}
        data-isactive={activeTown === "Thistle Hold"}
      >
        Thistle Hold
      </Button>
      <Button
        onClick={() => filterItems(Yndaros)}
        data-isactive={activeTown === "Yndaros"}
      >
        Yndaros
      </Button>
    </Container>
  );
}

export default TradingFooter;
