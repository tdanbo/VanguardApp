import * as Constants from "../Constants";

import { onRemoveCorruption } from "../functions/CharacterFunctions";
import { MouseEvent, useContext } from "react";
import { CharacterContext } from "../contexts/CharacterContext";

function CorruptionRemove() {
  const { character, setCharacter } = useContext(CharacterContext);

  const handleClick = (event: MouseEvent) => {
    event.preventDefault();
    switch (event.button) {
      case 0:
        setCharacter(onRemoveCorruption(character, 1));
        break;
      case 2:
        setCharacter(onRemoveCorruption(character, 2));
        break;
      default:
        console.log("Unexpected button clicked:", event.button);
    }
  };

  const handleRightClick = (event: MouseEvent) => {
    event.preventDefault();
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
      onMouseDown={handleClick}
      onContextMenu={handleRightClick}
    >
      -
    </button>
  );
}

export default CorruptionRemove;
