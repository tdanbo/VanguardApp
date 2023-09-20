import { useRoll } from "../functions/CombatFunctions";
import * as Constants from "../Constants";

import { useContext } from "react";

import { CharacterContext } from "../contexts/CharacterContext";
import { onAddCorruption } from "../functions/CharacterFunctions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSkull } from "@fortawesome/free-solid-svg-icons";

function CorruptionRoll() {
  const { character, setCharacter } = useContext(CharacterContext);

  const onRollDice = useRoll();

  const RollDice = () => {
    const dice_result = onRollDice({
      dice: "d4",
      count: 1,
      modifier: 0,
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
      className="flex w-full flex-col items-center justify-center rounded"
      style={{
        color: Constants.FONT_LIGHT,
        backgroundColor: Constants.DARK,
        border: `1px solid ${Constants.BORDER}`,
        margin: "2px 2px 2px 2px",
      }}
      onClick={() => RollDice()}
    >
      <FontAwesomeIcon icon={faSkull} />
    </div>
  );
}

export default CorruptionRoll;
