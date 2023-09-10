import * as Constants from "../../../Constants";
import * as Styles from "../SelectorStyles";
import SelectCharacterButtons from "./GamemasterButtons";
import CharacterBox from "../SelectCharacterComponent/CharacterBox";
import { useState, useEffect, useContext } from "react";
import { CharacterEntry, SessionEntry } from "../../../Types";
import { getCharacters } from "../../../functions/SessionsFunctions";
import { UserContext } from "../../../contexts/UserContext";
import { SessionContext } from "../../../contexts/SessionContext";
import UserSimpleBox from "./UserSimpleBox";

import CharacterSimpleBox from "./CharacterSimpleBox";
interface LoginProps {
  setSelector: (selector: string) => void;
  closeModal: () => void;
}

function GamemasterComponent({ setSelector, closeModal }: LoginProps) {
  const { user } = useContext(UserContext);
  const { session } = useContext(SessionContext);

  const [characterLog, setCharacterLog] = useState<CharacterEntry[]>([]);
  const [userLog, setUserLog] = useState<string[]>([]);

  useEffect(() => {
    setUserLog(session.users);
  }, [session.users]);

  useEffect(() => {
    getCharacters(session.id).then((response) => {
      setCharacterLog(response);
    });
  }, []);

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
        <div className="h-0.5 w-full bg-zinc-800"></div>
        <div
          className="my-5 flex flex-col space-y-2 overflow-auto"
          style={{ height: "400px" }}
        >
          <div
            className="items-center text-center"
            style={{ color: Constants.FONT_LIGHT }}
          >
            Characters
          </div>
          {[...characterLog].reverse().map((character, index) => (
            <CharacterSimpleBox
              character={character}
              setCharacterLog={setCharacterLog}
            />
          ))}
          <div
            className="items-center text-center"
            style={{ color: Constants.FONT_LIGHT }}
          >
            Users
          </div>
          {[...userLog].map((username, index) => (
            <UserSimpleBox username={username} setUserLog={setUserLog} />
          ))}
        </div>
        <div className="my-5 h-0.5 w-full bg-zinc-800"></div>
      </div>
      <SelectCharacterButtons setSelector={setSelector} />
    </div>
  );
}

export default GamemasterComponent;
