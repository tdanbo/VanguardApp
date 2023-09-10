import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faUser } from "@fortawesome/free-solid-svg-icons";

import * as Constants from "../../../Constants";

import { CharacterEntry } from "../../../Types";

import {
  deleteSessionCharacter,
  getCharacters,
} from "../../../functions/SessionsFunctions";
import { useContext } from "react";
import { SessionContext } from "../../../contexts/SessionContext";

interface CharacterSimpleBoxProps {
  character: CharacterEntry;
  setCharacterLog: React.Dispatch<React.SetStateAction<CharacterEntry[]>>;
}

function CharacterSimpleBox({
  character,
  setCharacterLog,
}: CharacterSimpleBoxProps) {
  const { session, setSession } = useContext(SessionContext);

  const onHandleDeleteCharacter = async () => {
    const delete_characters = await deleteSessionCharacter(
      character.details.name,
      session.id,
    );
    const characters = await getCharacters(session.id);
    setCharacterLog(characters);
  };

  return (
    <div
      className="flex rounded-lg p-1"
      style={{ backgroundColor: Constants.BUTTON }}
    >
      <div
        className="flex items-center justify-center px-2"
        style={{ color: Constants.FONT_LIGHT }}
      >
        <FontAwesomeIcon icon={faUser} />
      </div>
      <div className="flex grow px-2" style={{ color: Constants.FONT_LIGHT }}>
        {character.details.name}
      </div>
      <div
        className="flex items-center justify-center px-2"
        style={{ color: Constants.BRIGHT_RED }}
      >
        <FontAwesomeIcon icon={faXmark} onClick={onHandleDeleteCharacter} />
      </div>
    </div>
  );
}

export default CharacterSimpleBox;
