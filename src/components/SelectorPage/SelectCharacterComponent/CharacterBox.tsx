import * as Constants from "../../../Constants";
import { CharacterEntry } from "../../../Types";
import { CharacterContext } from "../../../contexts/CharacterContext";
import { useContext } from "react";

interface SessionBoxProps {
  setSelector: (selector: string) => void;
  selectedCharacter: CharacterEntry;
  closeModal: () => void;
}

function CharacterBox({
  setSelector,
  selectedCharacter,
  closeModal,
}: SessionBoxProps) {
  const { character, setCharacter } = useContext(CharacterContext);
  const handleOnClick = () => {
    setCharacter(selectedCharacter);
    closeModal();
  };
  return (
    <div
      className="flex h-10 w-full items-center justify-center rounded-lg"
      style={{ backgroundColor: Constants.BUTTON }}
      onClick={handleOnClick}
    >
      <h1>{selectedCharacter.details.name}</h1>
    </div>
  );
}

export default CharacterBox;
