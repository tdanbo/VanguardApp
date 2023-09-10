import * as Constants from "../../../Constants";
import * as Styles from "../SelectorStyles";
import SelectCharacterButtons from "./SelectCharacterButtons";
import CharacterBox from "./CharacterBox";
import { useEffect, useContext, useState } from "react";
import { CharacterEntry } from "../../../Types";
import { getCharacters } from "../../../functions/SessionsFunctions";
import { UserContext } from "../../../contexts/UserContext";
import { SessionContext } from "../../../contexts/SessionContext";

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

  useEffect(() => {
    getCharacters(session.id).then((response) => {
      setCharacterLog(response);
    });
  }, []);

  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const wsLocal = new WebSocket(`ws://localhost:8000/ws/${user}`);
    wsLocal.onopen = () => {
      console.log("connected");
    };
    wsLocal.onmessage = (e) => {
      console.log(e.data);
    };
    setWs(wsLocal);

    return () => {
      if (wsLocal) {
        wsLocal.close();
      }
    };
  }, []);

  const sendMessage = () => {
    if (ws) {
      ws.send("Sending some stuff");
    }
  };
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
          {[...characterLog].reverse().map((character) => (
            <CharacterBox
              setSelector={setSelector}
              selectedCharacter={character}
              closeModal={closeModal}
            />
          ))}
        </div>
        <div className="my-5 h-0.5 w-full bg-zinc-800"></div>
        <button
          className="flex h-10 w-full items-center justify-center rounded-lg"
          style={{ backgroundColor: Constants.BUTTON }}
          onClick={sendMessage}
        >
          Send Message
        </button>
      </div>
      <SelectCharacterButtons
        setSelector={setSelector}
        setCharacterLog={setCharacterLog}
      />
    </div>
  );
}

export default SelectCharacterComponent;
