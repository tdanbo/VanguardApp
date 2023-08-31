import * as Constants from "../Constants";

import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import {
  onResetCorruption,
  onChangeCorruptionLevel,
  onAddCorruption,
} from "../functions/CharacterFunctions";
import { MouseEvent, useContext } from "react";
import { CharacterContext } from "../contexts/CharacterContext";
import { useRoll } from "../functions/CombatFunctions";

function CorruptionControls() {
  const { character, setCharacter } = useContext(CharacterContext);

  const onRollDice = useRoll();

  const RollDice = () => {
    const dice_result = onRollDice({
      dice: "d4",
      count: 1,
      target: 0,
      type: "corruption",
    });

    const updated_character = onAddCorruption(character, dice_result);

    if (updated_character) {
      setCharacter(updated_character);
    }
  };

  const HandleResetCorruption = () => {
    const updatedCharacter = onResetCorruption(character);
    if (updatedCharacter) {
      setCharacter(updatedCharacter);
    }
  };

  const HandleCorruptionLevel = (event: MouseEvent) => {
    event.preventDefault();
    switch (event.button) {
      case 0:
        setCharacter(onChangeCorruptionLevel(character, "sub"));
        break;
      case 2:
        setCharacter(onChangeCorruptionLevel(character, "add"));
        break;
      default:
        console.log("Unexpected button clicked:", event.button);
    }
  };

  const handleRightClick = (event: MouseEvent) => {
    event.preventDefault();
  };

  return (
    <div className="flex">
      <div
        className="flex items-center justify-center rounded font-bold"
        style={{
          fontSize: "3rem",
          color: Constants.DARK,
          backgroundColor: Constants.PRIMARY,
          border: `1px solid ${Constants.BORDER}`,
          margin: "2px 2px 2px 2px",
          width: "80px",
          maxWidth: "80px",
        }}
        onMouseDown={HandleCorruptionLevel}
        onContextMenu={handleRightClick}
      >
        {character.details.corruption}
      </div>
      <div className="flex flex-col">
        <div
          className="fw-bold flex grow items-center justify-center rounded"
          style={{
            color: Constants.DARK,
            backgroundColor: Constants.PRIMARY,
            border: `1px solid ${Constants.BORDER}`,
            margin: "2px 2px 2px 2px",
            width: "40px",
          }}
          onClick={() => RollDice()}
        >
          <LocalFireDepartmentIcon />
        </div>

        <div
          className="fw-bold flex grow items-center justify-center rounded"
          style={{
            color: Constants.DARK,
            backgroundColor: Constants.PRIMARY,
            border: `1px solid ${Constants.BORDER}`,
            margin: "2px 2px 2px 2px",
            width: "40px",
          }}
          onClick={() => HandleResetCorruption()}
        >
          <RestartAltIcon />
        </div>
      </div>
    </div>
  );
}

export default CorruptionControls;
