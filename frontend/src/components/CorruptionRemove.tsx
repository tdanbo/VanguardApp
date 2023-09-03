import * as Constants from "../Constants";

import { onRemoveCorruption } from "../functions/CharacterFunctions";
import { useContext } from "react";
import { CharacterContext } from "../contexts/CharacterContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

function CorruptionRemove() {
  const { character, setCharacter } = useContext(CharacterContext);

  const removeCorruption = () => {
    const updated_character = onRemoveCorruption(character, 1);
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
      onClick={() => removeCorruption()}
    >
      <FontAwesomeIcon icon={faMinus} />
    </button>
  );
}

export default CorruptionRemove;
