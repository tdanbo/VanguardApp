import * as Constants from "../../Constants";
import AddIcon from "@mui/icons-material/Add";
import EquipmentBrowser from "./EquipmentBrowser";
import { useState, useEffect } from "react";

function OpenEquipmentBrowser() {
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
      <AddIcon onClick={() => setIsOpen(true)} />
      <EquipmentBrowser open={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}

export default OpenEquipmentBrowser;
