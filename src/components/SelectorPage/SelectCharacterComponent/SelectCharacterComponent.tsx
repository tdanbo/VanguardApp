import * as Constants from "../../../Constants";
import * as Styles from "../SelectorStyles";
import SelectCharacterButtons from "./SelectCharacterButtons";
import CharacterBox from "./CharacterBox";
import { useEffect, useContext, useState } from "react";
import { CharacterEntry } from "../../../Types";
import { getCharacters } from "../../../functions/SessionsFunctions";
import { UserContext } from "../../../contexts/UserContext";
import { SessionContext } from "../../../contexts/SessionContext";
import { useWebSocket } from "../../../contexts/WebSocketContext";

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
  const { user } = useContext(UserContext);
  const { session } = useContext(SessionContext);
  const { charactersResponse, sendRequest } = useWebSocket();

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
    <div
      className="flex w-1/5 flex-col justify-center"
      style={{ margin: "100px" }}
    >
      <div style={Styles.modalStyles}>
        <div
          className="flex justify-center p-10 text-4xl font-bold"
          style={{ color: Constants.FONT_LIGHT }}
        >
          {session.name}
        </div>
        <div className="my-5 h-0.5 w-full bg-zinc-800"></div>
        <div
          className="my-5 flex flex-col justify-center space-y-2 overflow-auto"
          style={{ height: "400px" }}
        >
          {[...characterLog]
            .reverse()
            .map(
              (character) => (
                console.log(character),
                (
                  <CharacterBox
                    setSelector={setSelector}
                    selectedCharacter={character}
                    closeModal={closeModal}
                  />
                )
              ),
            )}
        </div>
        <div className="my-5 h-0.5 w-full bg-zinc-800"></div>
      </div>
      <SelectCharacterButtons
        setSelector={setSelector}
        setCharacterLog={setCharacterLog}
      />
    </div>
  );
}

export default SelectCharacterComponent;
