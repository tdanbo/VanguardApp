import CharacterBox from "./CharacterBox";
import { useEffect, useContext } from "react";
import { CharacterEntry } from "../../Types";
import { getCharacters } from "../../functions/SessionsFunctions";
import { SessionContext } from "../../contexts/SessionContext";
import {
  CharacterContext,
  defaultCharacter,
} from "../../contexts/CharacterContext";

import {
  MainContainer,
  ModalContainer,
  Title,
  CenterContainer,
  ButtonContainer,
  ControlButton,
} from "./SelectorStyles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

interface LoginProps {
  setSelector: (selector: string) => void;
  closeModal: () => void;
  characterLog: CharacterEntry[];
  setCharacterLog: React.Dispatch<React.SetStateAction<CharacterEntry[]>>;
  setGmMode: React.Dispatch<React.SetStateAction<boolean>>;
}

function SelectCharacterComponent({
  setSelector,
  closeModal,
  characterLog,
  setCharacterLog,
  setGmMode,
}: LoginProps) {
  const { session } = useContext(SessionContext);
  const { setCharacter } = useContext(CharacterContext);

  console.log("Session ID: ", session.id);

  useEffect(() => {
    getCharacters(session.id).then((response) => {
      setCharacterLog(response);
    });
  }, []);

  const handleCopyId = () => {
    navigator.clipboard.writeText(session.id);
  };

  const handleGM = () => {
    setCharacter(defaultCharacter);
    setGmMode(true);
    closeModal();
  };

  return (
    <MainContainer>
      <Title onClick={handleCopyId}>
        {session.name}{" "}
        <h1>
          {session.id} <FontAwesomeIcon icon={faLink} />
        </h1>
      </Title>
      <ModalContainer>
        <CenterContainer>
          {[...characterLog]
            .reverse()
            .map(
              (character, index) =>
                (character.npc === false && (
                  <CharacterBox
                    key={index}
                    setSelector={setSelector}
                    selectedCharacter={character}
                    closeModal={closeModal}
                    setGmMode={setGmMode}
                    setCharacterLog={setCharacterLog}
                  />
                )) ||
                null,
            )}
        </CenterContainer>
      </ModalContainer>
      <ButtonContainer>
        <ControlButton onClick={() => setSelector("joinSession")}>
          Back
        </ControlButton>
        <ControlButton onClick={() => setSelector("createCharacter")}>
          Create Character
        </ControlButton>
        <ControlButton onClick={handleGM}>GM</ControlButton>
      </ButtonContainer>
    </MainContainer>
  );
}

export default SelectCharacterComponent;
