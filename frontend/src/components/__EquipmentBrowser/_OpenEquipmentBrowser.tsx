import * as Constants from "../../Constants";
import AddIcon from "@mui/icons-material/Add";
import EquipmentBrowser from "./_EquipmentBrowser";
import { useState, useEffect } from "react";

import { CharacterEntry } from "../../Types";

import React, { useCallback } from "react";

interface EquipmentProps {
  selectedCharacter: CharacterEntry;
  setUpdater: React.Dispatch<React.SetStateAction<number>>;
  update: number;
}

function OpenEquipmentBrowser({
  selectedCharacter,
  setUpdater,
  update,
}: EquipmentProps) {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = useCallback(() => setIsOpen(false), []);

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
      <EquipmentBrowser
        open={isOpen}
        onClose={onClose}
        selectedCharacter={selectedCharacter}
        setUpdater={setUpdater}
        update={update}
      />
    </div>
  );
}

export default OpenEquipmentBrowser;
