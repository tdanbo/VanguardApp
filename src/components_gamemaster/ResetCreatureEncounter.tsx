import {
  faArrowDownShortWide,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { random } from "lodash";
import { Socket } from "socket.io-client";
import styled from "styled-components";
import "../App.css";
import * as Constants from "../Constants";
import { SessionEntry } from "../Types";
import { GetActives } from "../functions/ActivesFunction";
import { update_session } from "../functions/SessionsFunctions";
import { FindValueFromActive } from "../functions/CharacterFunctions";

const Navigator = styled.button`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  border: 1px solid ${Constants.WIDGET_BACKGROUND_EMPTY};
  font-size: 18px;
  color: ${Constants.WIDGET_BACKGROUND};
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  border-radius: ${Constants.BORDER_RADIUS};
  &:hover {
    background-color: ${Constants.WIDGET_BACKGROUND};
    color: ${Constants.WIDGET_PRIMARY_FONT};
    border: 1px solid ${Constants.WIDGET_BORDER};
  }
  max-width: 50px;
`;

interface ResetEncounterProps {
  session: SessionEntry;
  websocket: Socket;
}

function ResetCreatureEncounter({ session, websocket }: ResetEncounterProps) {
  const handleResetEncounter = () => {
    for (const character of session.characters) {
      character.details.initiative = 0;
    }

    session.encounter = [];
    update_session(session, websocket);
  };

  const RollInitiative = () => {
    console.log("Rolling Initiative1");
    for (const character of session.characters) {
      character.details.initiative =
        FindValueFromActive("initiative", character, GetActives(character))
          .value + random(1, 10);
    }
    console.log("Rolling Initiative2");
    for (const creature of session.encounter) {
      creature.details.initiative =
        FindValueFromActive("initiative", creature, GetActives(creature))
          .value + random(1, 10);
    }
    console.log("Rolling Initiative3");
    update_session(session, websocket);
  };

  return (
    <>
      <Navigator
        className="mouse-icon-hover button-hover"
        onClick={handleResetEncounter}
      >
        <FontAwesomeIcon icon={faXmark} />
      </Navigator>
      <Navigator
        className="mouse-icon-hover button-hover"
        onClick={RollInitiative}
      >
        <FontAwesomeIcon icon={faArrowDownShortWide} />
      </Navigator>
    </>
  );
}

export default ResetCreatureEncounter;
