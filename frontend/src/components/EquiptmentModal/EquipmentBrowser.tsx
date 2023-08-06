import * as Constants from "../../Constants";
import AddIcon from "@mui/icons-material/Add";
import { useState, useEffect, CSSProperties } from "react";
import InventoryEntry from "../InventoryEntry";
import { CharacterEntry, ItemEntry } from "../../Types";
import axios from "axios";

interface EquipmentBrowserProps {
  selectedCharacter: CharacterEntry;
  setUpdater: React.Dispatch<React.SetStateAction<number>>;
  update: number;
  onDeleteItem: (id: string) => void;
}

function EquipmentBrowser({
  selectedCharacter,
  setUpdater,
  update,
  onDeleteItem,
}: EquipmentBrowserProps) {
  // Declare a state variable to hold the modal open/close status
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to handle the modal open
  const handleOpen = () => {
    console.log("Opening Modal");
    setIsModalOpen(true);
  };

  // Function to handle the modal close
  const handleClose = () => {
    console.log("Closing Modal");
    setIsModalOpen(false);
  };

  const [itemList, setItemList] = useState([] as ItemEntry[]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/equipment").then((response) => {
      setItemList(response.data);
    });
  }, []); // add an empty array here);

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
        className="flex items-center justify-center"
        style={{
          backgroundColor: Constants.PRIMARY_LIGHTER,
          width: Constants.SECTION_TITLE_HEIGHT,
          minWidth: Constants.SECTION_TITLE_HEIGHT,
          border: `1px solid ${Constants.BORDER}`,
        }}
        onClick={handleOpen}
      >
        <AddIcon />
      </div>
      {isModalOpen && (
        <div style={overlayStyles} onClick={handleClose}>
          <div style={modalStyles} onClick={stopPropagation}>
            <div
              className="flex flex-grow flex-col-reverse overflow-auto"
              style={{ height: "500px" }}
            >
              {itemList.map((item, index) => (
                <InventoryEntry
                  key={index}
                  browser={true}
                  index={index}
                  item={item}
                  selectedCharacter={selectedCharacter}
                  setUpdater={setUpdater}
                  update={update}
                  onDeleteItem={onDeleteItem}
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
