import UserBox from "../UserBox";

import * as Styles from "../SelectorStyles";
import * as Constants from "../../../Constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { SessionContext } from "../../../contexts/SessionContext";
import { useContext, useState } from "react";
import { CharacterEntry, SessionEntry } from "../../../Types";
import { addNewCharacter } from "../../../functions/CharacterFunctions";
import { CharacterContext } from "../../../contexts/CharacterContext";
import { getCharacters } from "../../../functions/SessionsFunctions";
import { useWebSocket } from "../../../contexts/WebSocketContext";

interface Stats {
  id: number;
  value: number;
  label: string;
}

interface CreateSessionsProps {
  setSelector: (selector: string) => void;
  character_name: string;
  stats: Stats[];
  setCharacterLog: React.Dispatch<React.SetStateAction<CharacterEntry[]>>;
}

function CreateCharacterButtons({
  setSelector,
  character_name,
  stats,
  setCharacterLog,
}: CreateSessionsProps) {
  const { session } = useContext(SessionContext);
  const { setCharacter } = useContext(CharacterContext);
  const { sendRequest } = useWebSocket();

  const NewCharacterEntry: CharacterEntry = {
    id: session.id,
    details: {
      movement: 0,
      name: character_name,
      xp_earned: 50,
      modifier: 0,
    },
    toughness: {
      max: { value: 0, mod: 0 },
      pain: { value: 0, mod: 0 },
      damage: { value: 0, mod: 0 },
    },
    stats: {
      accurate: { value: stats[0].value, mod: 0 },
      cunning: { value: stats[1].value, mod: 0 },
      discreet: { value: stats[2].value, mod: 0 },
      persuasive: { value: stats[3].value, mod: 0 },
      quick: { value: stats[4].value, mod: 0 },
      resolute: { value: stats[5].value, mod: 0 },
      strong: { value: stats[6].value, mod: 0 },
      vigilant: { value: stats[7].value, mod: 0 },
    },
    actives: {
      attack: { stat: "accurate", mod: 0 },
      defense: { stat: "quick", mod: 0 },
      casting: { stat: "resolute", mod: 0 },
      sneaking: { stat: "discreet", mod: 0 },
    },
    corruption: {
      permanent: 0,
      temporary: 0,
      threshold: 0,
    },
    abilities: [],
    inventory: [],
    equipment: [],
  };

  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const handlePostCharacter = async () => {
    setSelector("characterSelect");
    await addNewCharacter(NewCharacterEntry);
    sendRequest("characters"); // asking websocket to update session characters for all clients
  };

  return (
    <div className="mb-5 mt-3 flex justify-center">
      {" "}
      {/* Adjust the margin-bottom if necessary */}
      <div style={Styles.largeCircleButtonStyles}>
        <FontAwesomeIcon
          icon={faAngleLeft}
          style={{ color: Constants.FONT_LIGHT }}
          onClick={() => setSelector("session")}
        />
      </div>
      <div style={Styles.largeCircleButtonStyles}>
        {character_name === "" ? (
          <FontAwesomeIcon
            icon={faCheck}
            style={{ color: Constants.NEW_BORDER }}
          />
        ) : (
          <FontAwesomeIcon
            icon={faCheck}
            style={{ color: Constants.FONT_LIGHT }}
            onClick={handlePostCharacter}
          />
        )}
      </div>
    </div>
  );
}
export default CreateCharacterButtons;
