import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLockOpen, faLock } from "@fortawesome/free-solid-svg-icons";
import * as Constants from "../Constants";

interface ModifierLockComponentProps {
  modifierLock: boolean;
  setModifierLock: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModifierLockComponent = ({
  modifierLock,
  setModifierLock,
}: ModifierLockComponentProps) => {
  const handleModLock = () => {
    setModifierLock(!modifierLock);
  };

  return (
    <div
      className={`row button_color button ${
        modifierLock ? "base_color" : "outline_color"
      }`}
      style={{ minWidth: "33px", maxWidth: "33px" }}
      onClick={handleModLock}
      title="If locked then modifiers don't reset on roll."
    >
      <FontAwesomeIcon
        icon={modifierLock ? faLock : faLockOpen}
        color={
          modifierLock
            ? Constants.WIDGET_SECONDARY_FONT
            : Constants.WIDGET_SECONDARY_FONT_INACTIVE
        }
      />
    </div>
  );
};

export default ModifierLockComponent;
