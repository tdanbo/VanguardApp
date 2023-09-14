import * as Constants from "../../Constants";
import { CharacterEntry } from "../../Types";
import { CharacterContext } from "../../contexts/CharacterContext";
import { useContext } from "react";
import "./ToughnessBox.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

type Props = {
  onAddFunction: (character: CharacterEntry) => CharacterEntry;
  onSubFunction: (character: CharacterEntry) => CharacterEntry;
};

function ToughnessBox({ onAddFunction, onSubFunction }: Props) {
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
    <div className="container">
      <div className="value">
        {character.toughness.max.value - character.toughness.damage.value} /{" "}
        {character.toughness.max.value}
      </div>
      <div className="buttons_row">
        <button className="button" onClick={handleSub}>
          -
        </button>
        <div className="icon">
          <FontAwesomeIcon icon={faHeart} />
        </div>
        <button className="button" onClick={handleAdd}>
          +
        </button>
      </div>
    </div>
  );
}

export default ToughnessBox;
