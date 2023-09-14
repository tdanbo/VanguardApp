import * as Constants from "../Constants";
import { CharacterEntry } from "../Types";
import { CharacterContext } from "../contexts/CharacterContext";
import { useContext } from "react";

type Props = {
  onAddFunction: (character: CharacterEntry) => CharacterEntry;
  onSubFunction: (character: CharacterEntry) => CharacterEntry;
};

function CorruptionBox({ onAddFunction, onSubFunction }: Props) {
  const { character, setCharacter } = useContext(CharacterContext);

  const handleAdd = () => {
    const updated_character = onAddFunction(character);
    setCharacter(updated_character);
  };

  const handleSub = () => {
    const updated_character = onSubFunction(character);
    setCharacter(updated_character);
  };

  return (
    <div className="flex w-1/3 flex-col">
      <div
        className="flex grow items-center justify-center  rounded-t"
        style={{
          color: Constants.RED,
          backgroundColor: Constants.PRIMARY_MEDIUM,
          border: `1px solid ${Constants.BORDER_LIGHT}`,
          margin: "2px 2px 2px 2px",
          fontSize: "1.1rem",
          fontWeight: "bold",
        }}
      >
        {character.corruption.permanent} / {character.corruption.threshold * 3}
      </div>
      <div className="flex">
        <button
          className="h-7 w-7 items-center justify-center rounded-bl "
          // src={`src/assets/icons/${active}.png`}
          style={{
            color: Constants.BORDER,
            backgroundColor: Constants.PRIMARY_LIGHTER,
            borderLeft: `1px solid ${Constants.BORDER_LIGHT}`,
            borderBottom: `1px solid ${Constants.BORDER_LIGHT}`,
            borderTop: `1px solid ${Constants.BORDER_LIGHT}`,
            margin: "2px 0px 2px 2px",
            fontSize: "1.0rem",
            fontWeight: "bold",
          }}
          onClick={handleSub}
        >
          -
        </button>
        <div
          className="flex h-7 grow items-center justify-center"
          style={{
            backgroundColor: Constants.PRIMARY_LIGHTER,
            border: `1px solid ${Constants.BORDER_LIGHT}`,
            margin: "2px 0px 2px 0px",
            fontSize: "0.8rem",
            fontWeight: "bold",
          }}
        >
          CORRUPTION
        </div>
        <button
          className="h-7 w-7 items-center justify-center rounded-br "
          style={{
            color: Constants.BORDER,
            backgroundColor: Constants.PRIMARY_LIGHTER,
            borderRight: `1px solid ${Constants.BORDER_LIGHT}`,
            borderBottom: `1px solid ${Constants.BORDER_LIGHT}`,
            borderTop: `1px solid ${Constants.BORDER_LIGHT}`,
            margin: "2px 2px 2px 0px",
            fontSize: "1.0rem",
            fontWeight: "bold",
          }}
          onClick={handleAdd}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default CorruptionBox;
