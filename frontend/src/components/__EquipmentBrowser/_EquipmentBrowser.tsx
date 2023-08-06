import * as Constants from "../../Constants";
import CategoryButton from "./CategoryButton";
import InventoryEntry from "../InventoryEntry";
import { useState, useEffect } from "react";

import { ItemEntry } from "../../Types";

import axios from "axios";

import { CharacterEntry } from "../../Types";

interface CharacterProps {
  open: boolean;
  onClose: () => void;
  selectedCharacter: CharacterEntry;
  setUpdater: React.Dispatch<React.SetStateAction<number>>;
  update: number;
}

function EquipmentBrowser({
  open,
  onClose,
  selectedCharacter,
  setUpdater,
  update,
}: CharacterProps) {
  const [itemEntry, setItemList] = useState([] as ItemEntry[]);

  // useEffect(() => {
  //   axios.get("http://localhost:8000/api/equipment").then((response) => {
  //     setItemList(response.data);
  //   });
  // }, []); // add an empty array here);

  if (!open) return null;

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          zIndex: "1000",
          top: "0",
          bottom: "0",
          left: "0",
          right: "0",
          backgroundColor: "rgba(0,0,0,0.75)",
        }}
      ></div>
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: Constants.DARK,
          padding: "25px",
          zIndex: "1000",
          borderRadius: "10px",
        }}
      >
        <form className="d-grid gap-1">
          <div className="flex pb-5">
            <CategoryButton key="1" category="Equipment" />
            <CategoryButton key="2" category="Equipment" />
            <CategoryButton key="3" category="Equipment" />
            <CategoryButton key="4" category="Equipment" />
            <CategoryButton key="5" category="Equipment" />
            <CategoryButton key="6" category="Equipment" />
          </div>
          <div
            className="flex flex-grow flex-col-reverse overflow-auto"
            style={{ height: "500px" }}
          >
            {/* {itemEntry.map((item, index) => (
              <InventoryEntry
                key={index}
                browser={true}
                index={index}
                item={item}
                selectedCharacter={selectedCharacter}
                setUpdater={setUpdater}
                update={update}
              />
            ))} */}
          </div>
        </form>
      </div>
    </>
  );
}

export default EquipmentBrowser;
