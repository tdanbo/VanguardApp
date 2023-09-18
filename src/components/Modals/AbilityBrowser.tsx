import React, { useState, useEffect, CSSProperties, useContext } from "react";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import * as Constants from "../../Constants";
import { CharacterContext } from "../../contexts/CharacterContext";
import { onAddInventoryItem } from "../../functions/CharacterFunctions";
import { AbilityEntry } from "../../Types";

import AbilityEntryItem from "../AbilityEntryItem";

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

function AbilityBrowser({ browserState }: EquipmentBrowserProps) {
  const [filteredItems, setFilteredItems] = useState([] as AbilityEntry[]);
  const [search, setSearch] = useState("");

  const [abilityList, setAbilityList] = useState([] as AbilityEntry[]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/abilities").then((response) => {
      setAbilityList(response.data);
    });
  }, []); // add an empty array here);

  // useEffect(() => {
  //   setFilteredItems(
  //     setAbilityList.filter((ability) => {
  //       return ability.name.toLowerCase().includes(search.toLowerCase());
  //     }),
  //   );
  // }, [search, setAbilityList]);

  const toTitleCase = (str: string) => {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
    });
  };

  return (
    <Container hidden={browserState === 0 || browserState === 1}>
      <SearchContainer>
        <Input
          className="flex-grow"
          onChange={(e) => setSearch(e.target.value)}
        ></Input>
        {/* <button className="flex-none" onClick={AddInventorySlot}>
          {filteredItems.length > 0 ? <SearchIcon /> : <AddIcon />}
        </button> */}
      </SearchContainer>
      <ItemContainer>
        {abilityList.map((ability, index) => (
          <AbilityEntryItem key={index} browser={true} ability={ability} />
        ))}
      </ItemContainer>
    </Container>
  );
}

export default AbilityBrowser;
