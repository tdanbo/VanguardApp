import SelectCharacterButtons from "./SelectCharacterButtons";
import CharacterBox from "./CharacterBox";
import { useEffect, useContext } from "react";
import { CharacterEntry } from "../../../Types";
import { getCharacters } from "../../../functions/SessionsFunctions";
import { SessionContext } from "../../../contexts/SessionContext";
import { useWebSocket } from "../../../contexts/WebSocketContext";

import {
  MainContainer,
  ModalContainer,
  Title,
  CenterContainer,
} from "../SelectorStyles";

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
      console.log("Server sending stuff");
      setCharacterLog(charactersResponse);
    }
  }, [charactersResponse]);

  return (
    <MainContainer>
      <Title>{session.name}</Title>
      <ModalContainer>
        <CenterContainer>
          {[...characterLog].reverse().map((character) => (
            <CharacterBox
              key={character.id}
              setSelector={setSelector}
              selectedCharacter={character}
              closeModal={closeModal}
            />
          ))}
        </CenterContainer>
      </ModalContainer>
      <SelectCharacterButtons
        setSelector={setSelector}
        setCharacterLog={setCharacterLog}
      />
    </MainContainer>
  );
}

export default SelectCharacterComponent;
