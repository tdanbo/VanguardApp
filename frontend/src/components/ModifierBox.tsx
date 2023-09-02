import * as Constants from "../Constants";
import { MouseEvent, useState, useContext } from "react";
import { CharacterContext } from "../contexts/CharacterContext";
import { setBaseModifier } from "../functions/CharacterFunctions";
type Props = {
  type_name: string;
  type_value: number;
};

function ModifierBox({ type_name }: Props) {
  const { character, setCharacter } = useContext(CharacterContext);

  const handleClick = (event: MouseEvent) => {
    event.preventDefault();
    switch (event.button) {
      case 0:
        setCharacter(
          setBaseModifier(character, character.details.modifier - 1),
        );
        break;
      case 2:
        setCharacter(
          setBaseModifier(character, character.details.modifier + 1),
        );
        break;
      default:
        console.log("Unexpected button clicked:", event.button);
    }
  };

  const handleRightClick = (event: MouseEvent) => {
    event.preventDefault();
  };

  return (
    <div className="flex w-full flex-col">
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
        onMouseDown={handleClick}
        onContextMenu={handleRightClick}
      >
        {character.details.modifier > 0
          ? "+" + character.details.modifier
          : character.details.modifier}
      </div>
      <div
        className="flex grow items-center justify-center rounded-b "
        style={{
          backgroundColor: Constants.PRIMARY_LIGHTER,
          border: `1px solid ${Constants.BORDER_LIGHT}`,
          margin: "2px 2px 2px 2px",
          fontSize: "0.8rem",
          fontWeight: "bold",
        }}
      >
        {type_name.toUpperCase()}
      </div>
    </div>
  );
}

export default ModifierBox;
