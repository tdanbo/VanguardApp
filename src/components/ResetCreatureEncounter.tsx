import * as Constants from "../Constants";
import styled from "styled-components";
import "../App.css";
import { Socket } from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { SessionEntry } from "../Types";
import { update_session } from "../functions/SessionsFunctions";
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
    session.encounter = [];
    update_session(session, websocket);
  };

  return (
    <Navigator
      className="mouse-icon-hover button-hover"
      onClick={handleResetEncounter}
    >
      <FontAwesomeIcon icon={faXmark} />
    </Navigator>
  );
}

export default ResetCreatureEncounter;
