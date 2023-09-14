import * as Constants from "../../Constants";
import { CharacterEntry } from "../../Types";
import { CharacterContext } from "../../contexts/CharacterContext";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

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

  const Container = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
    background-color: coral;
  `;

  const Value = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(255, 0, 170);
    font-size: 1.5em;
    font-weight: bold;
    color: white;
    width: 120px;
    min-width: 120px;
  `;

  const Icon = styled.div`
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
    height: 100%;
    background-color: rgb(189, 188, 187);
  `;

  return (
    <Container>
      <Icon>
        <FontAwesomeIcon icon={faHeart} />
      </Icon>
      <Value>
        {character.toughness.max.value - character.toughness.damage.value} /{" "}
        {character.toughness.max.value}
      </Value>
    </Container>
  );
}

export default ToughnessBox;
