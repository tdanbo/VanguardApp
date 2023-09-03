import { useRoll } from "../functions/CombatFunctions";
import * as Constants from "../Constants";

import { useContext } from "react";

import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { CharacterContext } from "../contexts/CharacterContext";
import { onAddCorruption } from "../functions/CharacterFunctions";

function CorruptionRoll() {
  const { character, setCharacter } = useContext(CharacterContext);

  const onRollDice = useRoll();

  const RollDice = () => {
    const dice_result = onRollDice({
      dice: "d4",
      count: 1,
      target: 0,
      type: "corruption",
      add_mod: true,
    });

    const updated_character = onAddCorruption(character, dice_result);

    if (updated_character) {
      setCharacter(updated_character);
    }
  };

  return (
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
  );
}

export default CorruptionRoll;
