import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Constants from "../Constants";
import { CharacterEntry } from "../Types";
import { CharacterContext } from "../contexts/CharacterContext";
import { useContext } from "react";
import styled from "styled-components";
import { faSkull } from "@fortawesome/free-solid-svg-icons";
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

  const Container = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
    background-color: coral;
  `;

  const Value = styled.div`
    display: flex;
    flex-grow: 1;
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
      <Value>
        {character.corruption.permanent} / {character.corruption.threshold * 3}
      </Value>
      {/* <Icon>
        <FontAwesomeIcon icon={faSkull} />
      </Icon> */}
    </Container>
  );
}

export default CorruptionBox;
