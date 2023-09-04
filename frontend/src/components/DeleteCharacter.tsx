import * as Constants from "../Constants";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

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
      className="flex h-full items-center justify-center"
      style={{
        backgroundColor: Constants.PRIMARY_LIGHTER,
        width: Constants.SECTION_TITLE_HEIGHT,
        minWidth: Constants.SECTION_TITLE_HEIGHT,
        border: `1px solid ${Constants.BORDER}`,
      }}
      onClick={() => handleDelete(character)}
    >
      <FontAwesomeIcon icon={faXmark} />
    </div>
  );
}

export default DeleteCharacter;
