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

function EquipmentBrowser() {
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

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

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

  const modalStyles: CSSProperties = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: Constants.DARK,
    padding: "20px",
    zIndex: 1000,
    border: `1px solid ${Constants.BORDER}`,
  };

  const overlayStyles: CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    zIndex: 999,
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div>
      <div
        className="flex h-full flex-col items-center justify-center"
        style={{
          backgroundColor: Constants.DARK,
          minWidth: Constants.SECTION_TITLE_HEIGHT,
          borderRight: `1px solid ${Constants.BORDER_DARK}`,
          borderLeft: `1px solid ${Constants.BORDER_DARK}`,
        }}
        onClick={handleOpen}
      >
        <FontAwesomeIcon
          icon={faPlus}
          style={{ color: Constants.PRIMARY_DARKER }}
        />
      </div>
      {isModalOpen && (
        <div style={overlayStyles} onClick={handleClose}>
          <div style={modalStyles} onClick={stopPropagation}>
            <div className="mb-2 flex flex-grow flex-row">
              <input
                className="flex-grow"
                onChange={(e) => setSearch(e.target.value)}
              ></input>
              <button
                className="flex-none"
                style={{ backgroundColor: Constants.BORDER }}
                onClick={AddInventorySlot}
              >
                {filteredItems.length > 0 ? <SearchIcon /> : <AddIcon />}
              </button>
            </div>
            <div
              className="flex flex-grow flex-col overflow-auto"
              style={{ height: "500px" }}
            >
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EquipmentBrowser;
