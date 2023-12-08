import styled from "styled-components";
import "../App.css";
import * as Constants from "../Constants";
import { CharacterEntry, SessionEntry } from "../Types";
import { getCharacterXp } from "../functions/CharacterFunctions";
import { update_session } from "../functions/SessionsFunctions";

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
  character: CharacterEntry;
  websocket: WebSocket;
}

function XpBox({ session, character, websocket }: XpBoxProps) {
  const handleAddXp = () => {
    character.details.xp_earned += 1;
    update_session(session, websocket);
  };

  const handleSubXp = () => {
    character.details.xp_earned -= 1;
    if (character.details.xp_earned < 0) {
      character.details.xp_earned = 0;
    }
    update_session(session, websocket);
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
        {getCharacterXp(character)} / {character.details.xp_earned}
      </h1>
    </Container>
  );
}

export default XpBox;
