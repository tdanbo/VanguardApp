import * as Constants from "../Constants";
import { onAddCorruption } from "../functions/CharacterFunctions";
import { useContext } from "react";
import { CharacterContext } from "../contexts/CharacterContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function CorruptionAdd() {
  const { character, setCharacter } = useContext(CharacterContext);

  const addCorruption = () => {
    const updated_character = onAddCorruption(character, 1);
    setCharacter(updated_character);
  };

  return (
    <button
      className="flex w-1/4 grow items-center justify-center rounded text-2xl font-bold"
      style={{
        color: Constants.BORDER,
        backgroundColor: Constants.PRIMARY_LIGHTER,
        border: `1px solid ${Constants.BORDER}`,
        margin: "2px 2px 2px 2px",
      }}
      onClick={() => addCorruption()}
    >
      <FontAwesomeIcon icon={faPlus} />
    </button>
  );
}

export default CorruptionAdd;
