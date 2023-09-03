import * as Constants from "../Constants";
import { onAddCorruption } from "../functions/CharacterFunctions";
import { useContext } from "react";
import { CharacterContext } from "../contexts/CharacterContext";
function CorruptionAdd() {
  const { character, setCharacter } = useContext(CharacterContext);

  const addCorruption = () => {
    const updated_character = onAddCorruption(character, 1);
    setCharacter(updated_character);
  };

  return (
    <button
      className="fw-bold flex w-1/4 grow items-center justify-center rounded"
      style={{
        color: Constants.DARK,
        backgroundColor: Constants.PRIMARY,
        border: `1px solid ${Constants.BORDER}`,
        margin: "2px 2px 2px 2px",
      }}
      onClick={() => addCorruption()}
    >
      +
    </button>
  );
}

export default CorruptionAdd;
