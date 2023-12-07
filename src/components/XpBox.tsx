import * as Constants from "../Constants";
import { CharacterContext } from "../contexts/CharacterContext";
import { getCharacterXp } from "../functions/CharacterFunctions";
import { useContext } from "react";
import styled from "styled-components";
import "../App.css";
import { update_session } from "../functions/SessionsFunctions";

import {
  onAddUnspentXp,
  onSubUnspentXp,
} from "../functions/CharacterFunctions";
import { CharacterEntry, SessionEntry } from "../Types";
const Container = styled.div`
  margin-right: 20px;
  cursor: pointer;
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: right;
  font-weight: bold;
  h1 {
    font-size: 1.5em;
    color: ${Constants.WIDGET_PRIMARY_FONT};
  }
  h2 {
    font-size: 0.75em;
    margin-right: 10px;
    margin-top: 18px;
    color: ${Constants.WIDGET_SECONDARY_FONT};
  }
`;

interface XpBoxProps {
  session: SessionEntry;
  sessionCharacter: CharacterEntry;
  websocket: WebSocket;
}

function XpBox({ session, sessionCharacter, websocket }: XpBoxProps) {
  const handleAddXp = () => {
    sessionCharacter.details.xp_earned += 1;
    update_session(session);
    websocket.send(JSON.stringify(session));
  };

  const handleSubXp = () => {
    sessionCharacter.details.xp_earned -= 1;
    if (sessionCharacter.details.xp_earned < 0) {
      sessionCharacter.details.xp_earned = 0;
    }
    update_session(session);
    websocket.send(JSON.stringify(session));
  };

  return (
    <Container
      className="mouse-icon-hover"
      onClick={handleSubXp}
      onContextMenu={(e) => {
        e.preventDefault();
        handleAddXp();
      }}
    >
      <h2>XP</h2>
      <h1>
        {getCharacterXp(sessionCharacter)} /{" "}
        {sessionCharacter.details.xp_earned}
      </h1>
    </Container>
  );
}

export default XpBox;
