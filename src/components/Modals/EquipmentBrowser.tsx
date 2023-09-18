import React, { useState, useEffect, CSSProperties, useContext } from "react";
import axios from "axios";
import InventoryEntry from "../InventoryEntry";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import * as Constants from "../../Constants";
import { CharacterContext } from "../../contexts/CharacterContext";
import { onAddInventoryItem } from "../../functions/CharacterFunctions";
import { ItemEntry } from "../../Types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  gap: 10px;
`;

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

interface EquipmentBrowserProps {
  browserState: number;
}

function EquipmentBrowser({ browserState }: EquipmentBrowserProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemList, setItemList] = useState([] as ItemEntry[]);
  const [filteredItems, setFilteredItems] = useState([] as ItemEntry[]);
  const [search, setSearch] = useState("");
  const { character, setCharacter } = useContext(CharacterContext);

  useEffect(() => {
    axios.get("http://localhost:8000/api/equipment").then((response) => {
      setItemList(response.data);
    });
  }, []);

  useEffect(() => {
    setFilteredItems(
      itemList.filter((item) => {
        return item.name.toLowerCase().includes(search.toLowerCase());
      }),
    );
  }, [search, itemList]);

  const toTitleCase = (str: string) => {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
    });
  };

  const GeneralGood: ItemEntry = {
    roll: {
      roll: false,
      dice: "",
      type: "",
    },
    quality: [],
    equip: [],
    quantity: {
      count: 0,
      bulk: false,
    },
    type: "General Good",
    cost: "",
    name: toTitleCase(search),
    category: "general_good",
    id: "",
  };

  const AddInventorySlot = () => {
    const updatedCharacter = onAddInventoryItem({
      character,
      item: GeneralGood,
    });
    if (updatedCharacter) {
      setCharacter(updatedCharacter);
    }
  };

  console.log(browserState);

  return (
    <Container hidden={browserState === 0 || browserState === 2}>
      <SearchContainer>
        <Input
          className="flex-grow"
          onChange={(e) => setSearch(e.target.value)}
        ></Input>
        <button className="flex-none" onClick={AddInventorySlot}>
          {filteredItems.length > 0 ? <SearchIcon /> : <AddIcon />}
        </button>
      </SearchContainer>
      <ItemContainer>
        {filteredItems.map((item, index) => (
          <InventoryEntry
            key={index}
            browser={true}
            index={index}
            item={item}
            equipped={""}
            id={""}
          />
        ))}
      </ItemContainer>
    </Container>
  );
}

export default EquipmentBrowser;
