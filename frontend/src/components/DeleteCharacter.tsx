import * as Constants from "../Constants";

import ClearIcon from "@mui/icons-material/Clear";
import { CharacterContext } from "../contexts/CharacterContext";
import {
  getCharacterEntry,
  onDeleteSelectedCharacter,
} from "../functions/CharacterFunctions";
import { useContext } from "react";
import { CharacterEntry } from "../Types";
function DeleteCharacter() {
  const { character, setCharacter } = useContext(CharacterContext);

  const handleDelete = (character: CharacterEntry) => {
    onDeleteSelectedCharacter(character);
    setCharacter({} as CharacterEntry);
  };
  return (
    <div
      className="flex items-center justify-center"
      style={{
        backgroundColor: Constants.PRIMARY_LIGHTER,
        width: Constants.SECTION_TITLE_HEIGHT,
        minWidth: Constants.SECTION_TITLE_HEIGHT,
        border: `1px solid ${Constants.BORDER}`,
      }}
      onClick={() => handleDelete(character)}
    >
      <ClearIcon />
    </div>
  );
}

export default DeleteCharacter;
