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

interface EquipmentBrowserProps {
  browserState: number;
  itemList: ItemEntry[];
  setItemList: (itemList: ItemEntry[]) => void;
}

function EquipmentBrowser({ browserState, itemList }: EquipmentBrowserProps) {
  const toTitleCase = (str: string) => {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
    });
  };

  console.log(itemList);

  return (
    <Container hidden={browserState === 0 || browserState === 2}>
      <ItemContainer>
        {itemList &&
          itemList.map((item, index) => (
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
