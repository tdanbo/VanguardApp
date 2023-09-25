import * as Constants from "../../Constants";
import styled from "styled-components";
import { CharacterEntry } from "../../Types";
import { CharacterContext } from "../../contexts/CharacterContext";
import { useContext } from "react";

interface SessionBoxProps {
  setSelector: (selector: string) => void;
  selectedCharacter: CharacterEntry;
  closeModal: () => void;
}

const CharacterContainer = styled.div`
  display: flex;
  height: 50px;
  width: 100%;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  cursor: pointer;
`;

const CharacterName = styled.h1`
  font-size: 1rem;
  color: ${Constants.WIDGET_PRIMARY_FONT};
`;

function CharacterBox({ selectedCharacter, closeModal }: SessionBoxProps) {
  const { setCharacter } = useContext(CharacterContext);

  const handleOnClick = () => {
    setCharacter(selectedCharacter);
    closeModal();
  };

  return (
    <CharacterContainer onClick={handleOnClick}>
      <CharacterName>{selectedCharacter.details.name}</CharacterName>
    </CharacterContainer>
  );
}

export default CharacterBox;
