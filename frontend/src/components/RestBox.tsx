import RestartAltIcon from "@mui/icons-material/RestartAlt";
import * as Constants from "../Constants";
import { useContext } from "react";
import { CharacterContext } from "../contexts/CharacterContext";
import { onResetCorruption } from "../functions/CharacterFunctions";
import { RestCharacter } from "../functions/CharacterFunctions";

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
      className="fw-bold flex items-center justify-center"
      style={{
        color: Constants.DARK,
        backgroundColor: Constants.PRIMARY,
        border: `1px solid ${Constants.BORDER}`,
        margin: "2px 2px 2px 2px",
        width: "40px",
      }}
      onClick={() => HandleRest()}
    >
      <RestartAltIcon />
    </div>
  );
}

export default RestBox;
