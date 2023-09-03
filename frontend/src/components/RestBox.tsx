import RestartAltIcon from "@mui/icons-material/RestartAlt";
import * as Constants from "../Constants";
import { useContext } from "react";
import { CharacterContext } from "../contexts/CharacterContext";
import { onResetCorruption } from "../functions/CharacterFunctions";
import { RestCharacter } from "../functions/CharacterFunctions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";

function RestBox() {
  const { character, setCharacter } = useContext(CharacterContext);

  const HandleRest = () => {
    const updatedCharacter = RestCharacter(character);
    if (updatedCharacter) {
      setCharacter(updatedCharacter);
    }
  };
  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{
        backgroundColor: Constants.DARK,
        minWidth: Constants.SECTION_TITLE_HEIGHT,
        borderRight: `1px solid ${Constants.BORDER_DARK}`,
        borderLeft: `1px solid ${Constants.BORDER_DARK}`,
        color: Constants.PRIMARY_DARKER,
      }}
      onClick={HandleRest}
    >
      <FontAwesomeIcon icon={faMoon} />
    </div>
  );
}

export default RestBox;
