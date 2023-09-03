import * as Constants from "../../Constants";
import AddIcon from "@mui/icons-material/Add";
import { useState, CSSProperties } from "react";

import StatDropdown from "../StatDropdown";
import { Actives } from "../../Types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

type ActiveKey = keyof Actives;

function StatSettings() {
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
          color: Constants.PRIMARY_DARKER,
        }}
        onClick={handleOpen}
      >
        <FontAwesomeIcon icon={faGear} />
      </div>
      {isModalOpen && (
        <div style={overlayStyles} onClick={handleClose}>
          <div style={modalStyles} onClick={stopPropagation}>
            <div className="flex-col">
              <StatDropdown active={"attack" as ActiveKey} />
              <StatDropdown active={"defense" as ActiveKey} />
              <StatDropdown active={"casting" as ActiveKey} />
              <StatDropdown active={"sneaking" as ActiveKey} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StatSettings;
