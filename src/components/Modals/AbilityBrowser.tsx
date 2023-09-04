import * as Constants from "../../Constants";
import { useState, useEffect, CSSProperties } from "react";
import AbilityEntryItem from "../AbilityEntryItem";
import { AbilityEntry } from "../../Types";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function AbilityBrowser() {
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

  const [abilityList, setAbilityList] = useState([] as AbilityEntry[]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/abilities").then((response) => {
      setAbilityList(response.data);
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
            <div
              className="flex flex-grow flex-col-reverse overflow-auto"
              style={{ height: "500px" }}
            >
              {abilityList.map((ability, index) => (
                <AbilityEntryItem
                  key={index}
                  browser={true}
                  ability={ability}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default AbilityBrowser;
