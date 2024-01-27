import { Socket } from "socket.io-client";
import styled from "styled-components";
import "../App.css";
import * as Constants from "../Constants";
import { CharacterEntry, SessionEntry } from "../Types";
import { getCharacterXp, getUtilityXp } from "../functions/CharacterFunctions";
import { update_session } from "../functions/SessionsFunctions";
const Container = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: row;

  cursor: pointer;
  gap: 10px;
  h1 {
    font-size: clamp(1px, ${Constants.VW}, 20px);
    color: ${Constants.WIDGET_PRIMARY_FONT};
  }
  h2 {
    margin-top: 15px;
    font-size: 15px;
    color: ${Constants.WIDGET_SECONDARY_FONT};
  }
  max-height: 25px;
  user-select: none;
`;

const CategoryContainerLeft = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
  border: 1px solid ${Constants.WIDGET_BORDER};
  border-radius: 5px;
  padding: 10px;
  height: 20px;
  width: 100%;
  user-select: none;
`;
const CategoryContainerRight = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
  border: 1px solid ${Constants.WIDGET_BORDER};
  border-radius: 5px;
  padding: 10px;
  height: 20px;
  width: 100%;
  user-select: none;
`;

interface XpBoxProps {
  session: SessionEntry;
  character: CharacterEntry;
  websocket: Socket;
  isCreature: boolean;
}

function XpBox({ session, character, websocket, isCreature }: XpBoxProps) {
  const handleAddXp = () => {
    character.details.xp_earned += 1;
    update_session(session, websocket, character, isCreature);
  };

  const handleSubXp = () => {
    character.details.xp_earned -= 1;
    if (character.details.xp_earned < 0) {
      character.details.xp_earned = 0;
    }
    update_session(session, websocket, character, isCreature);
  };

  return (
    <Container className="mouse-icon-hover">
      <CategoryContainerLeft
        onClick={handleSubXp}
        onContextMenu={(e) => {
          e.preventDefault();
          handleAddXp();
        }}
      >
        <h2>COMBAT XP</h2>
        <h1>
          {getCharacterXp(character)} / {character.details.xp_earned}
        </h1>
      </CategoryContainerLeft>
      <CategoryContainerRight>
        <h2>UTILITY XP</h2>
        <h1>
          {getUtilityXp(character)} /{" "}
          {Math.round(character.details.xp_earned / 5)}
        </h1>
      </CategoryContainerRight>
    </Container>
  );
}

export default XpBox;
