import { AbilityEntry } from "../../Types";
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

interface AbilityFooterProps {
  abilityList: AbilityEntry[];
  setAbilityList: (abilityList: AbilityEntry[]) => void;
}

function AbilityFooter({ abilityList, setAbilityList }: AbilityFooterProps) {
  const [fullList, setFullList] = useState<AbilityEntry[]>(abilityList);
  const [active, setActive] = useState<string | null>(null);

  function sortItems(a: AbilityEntry, b: AbilityEntry): number {
    const categoryComparison =
      Constants.TYPE_FILTER.indexOf(a.type) -
      Constants.TYPE_FILTER.indexOf(b.type);

    return categoryComparison;
  }

  function filterAndSortItems(type: string) {
    setActive(type);
    const filteredItems = fullList.filter((item) => item.type === type);
    const sortedItems = filteredItems.sort(sortItems);
    setAbilityList(sortedItems);
  }

  useEffect(() => {
    const fetchItems = async () => {
      const response = await axios.get(`${API}/api/abilities`);
      const sortedItems = [...response.data].sort(sortItems);
      setFullList(sortedItems);
    };
    fetchItems();
  }, []);

  return (
    <Container>
      <AllButton
        onClick={() => {
          setAbilityList([...fullList].sort(sortItems));
          setActive(null);
        }}
      >
        A
      </AllButton>
      <Button
        onClick={() => filterAndSortItems("Ability")}
        isActive={active === "Ability"}
      >
        Abilities
      </Button>
      <Button
        onClick={() => filterAndSortItems("Mystical Power")}
        isActive={active === "Mystical Power"}
      >
        Mystical Powers
      </Button>
      <Button
        onClick={() => filterAndSortItems("Ritual")}
        isActive={active === "Ritual"}
      >
        Rituals
      </Button>
      <Button
        onClick={() => filterAndSortItems("Trait")}
        isActive={active === "Trait"}
      >
        Traits
      </Button>
      <Button
        onClick={() => filterAndSortItems("Monsterous Trait")}
        isActive={active === "Monsterous Trait"}
      >
        Monsterous Traits
      </Button>
      <Button
        onClick={() => filterAndSortItems("Boon")}
        isActive={active === "Boon"}
      >
        Boons
      </Button>
      <Button
        onClick={() => filterAndSortItems("Burden")}
        isActive={active === "Burden"}
      >
        Burdens
      </Button>
    </Container>
  );
}

export default AbilityFooter;
