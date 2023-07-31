import * as Constants from "../Constants";
import AddIcon from "@mui/icons-material/Add";
import AddCharacterForm from "./CharacterForm/AddCharacterForm";
import { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";

function AddCharacter() {
  const [isOpen, setIsOpen] = useState(true);

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
      <AddIcon onClick={() => setIsOpen(true)} />
      <AddCharacterForm open={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}

export default AddCharacter;
