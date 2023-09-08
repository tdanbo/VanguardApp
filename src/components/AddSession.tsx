import * as Constants from "../Constants";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCrown } from "@fortawesome/free-solid-svg-icons";

function Session() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log("isOpen state changed:", isOpen);
  }, [isOpen]);

  return (
    <div
      className="flex items-center justify-center"
      style={{
        backgroundColor: Constants.PRIMARY_LIGHTER,
        width: Constants.SECTION_TITLE_HEIGHT,
        minWidth: Constants.SECTION_TITLE_HEIGHT,
        border: `1px solid ${Constants.BORDER}`,
      }}
    >
      <FontAwesomeIcon icon={faPlus} onClick={() => setIsOpen(true)} />
      <FontAwesomeIcon icon={faCrown} onClick={() => setIsOpen(true)} />
    </div>
  );
}

export default Session;
