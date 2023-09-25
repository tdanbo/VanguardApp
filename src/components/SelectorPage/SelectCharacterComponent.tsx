import SelectCharacterButtons from "./SelectCharacterButtons";
import CharacterBox from "./CharacterBox";
import { useEffect, useContext } from "react";
import { CharacterEntry } from "../../Types";
import { getCharacters } from "../../functions/SessionsFunctions";
import { SessionContext } from "../../contexts/SessionContext";
import { useWebSocket } from "../../contexts/WebSocketContext";

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
}

function SelectCharacterComponent({
  setSelector,
  closeModal,
  characterLog,
  setCharacterLog,
}: LoginProps) {
  const { session } = useContext(SessionContext);
  const { charactersResponse } = useWebSocket();

  useEffect(() => {
    getCharacters(session.id).then((response) => {
      setCharacterLog(response);
    });
  }, []);

  useEffect(() => {
    if (charactersResponse) {
      setCharacterLog(charactersResponse);
    }
  }, [charactersResponse]);

  const handleCopyId = () => {
    navigator.clipboard.writeText(session.id);
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
          {[...characterLog].reverse().map((character, index) => (
            <CharacterBox
              key={index}
              setSelector={setSelector}
              selectedCharacter={character}
              closeModal={closeModal}
            />
          ))}
        </CenterContainer>
      </ModalContainer>
      <ButtonContainer>
        <ControlButton onClick={() => setSelector("joinSession")}>
          Back
        </ControlButton>
        <ControlButton onClick={() => setSelector("createCharacter")}>
          Create Character
        </ControlButton>
        <ControlButton onClick={() => console.log("Create GM Panel")}>
          GM
        </ControlButton>
      </ButtonContainer>
    </MainContainer>
  );
}

export default SelectCharacterComponent;
