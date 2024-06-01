import { Socket } from "socket.io-client";
import styled from "styled-components";
import "../App.css";
import * as Constants from "../Constants";
import { CharacterEntry, SessionEntry } from "../Types";
import { getCharacterXp, getUtilityXp } from "../functions/CharacterFunctions";
import { update_session } from "../functions/SessionsFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLockOpen, faLock } from "@fortawesome/free-solid-svg-icons";
const Container = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: row;

  cursor: pointer;
  gap: 10px;
  h1 {
    font-size: clamp(1px, ${Constants.VW}, 18px);
    color: ${Constants.WIDGET_PRIMARY_FONT};
  }
  h2 {
    margin-top: 12px;
    font-size: 10px;
    color: ${Constants.WIDGET_SECONDARY_FONT};
  }

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
  height: 100%;
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
  height: 100%;
  width: 100%;
  user-select: none;
`;

interface XpBoxProps {
  session: SessionEntry;
  character: CharacterEntry;
  websocket: Socket;
  isCreature: boolean;
  modifierLock: boolean;
  setModifierLock: React.Dispatch<React.SetStateAction<boolean>>;
}

function XpBox({
  session,
  character,
  websocket,
  isCreature,
  modifierLock,
  setModifierLock,
}: XpBoxProps) {
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

  const handleModLock = () => {
    setModifierLock(!modifierLock);
  };

  return (
    <Container className="mouse-icon-hover">
      <div className="row">
        <CategoryContainerLeft
          onClick={handleSubXp}
          onContextMenu={(e) => {
            e.preventDefault();
            handleAddXp();
          }}
          title={"Combat XP"}
        >
          <h2>COMBAT XP</h2>

          <h1>
            {getCharacterXp(character)} / {character.details.xp_earned}
          </h1>
        </CategoryContainerLeft>
      </div>
      <div className="row">
        <CategoryContainerRight title={"Utility XP"}>
          <h2 className={".hide-div"}>UTILITY XP</h2>
          <h1>
            {getUtilityXp(character)} /{" "}
            {Math.max(Math.round(character.details.xp_earned / 5), 10)}
          </h1>
        </CategoryContainerRight>
        <div
          className={`row button_hover ${
            modifierLock ? "base_color" : "empty_color"
          }`}
          style={{ minWidth: "35px", maxWidth: "35px" }}
          onClick={handleModLock}
          title="If locked then modifiers don't reset on roll."
        >
          <FontAwesomeIcon
            icon={modifierLock ? faLock : faLockOpen}
            color={
              modifierLock
                ? Constants.WIDGET_SECONDARY_FONT
                : Constants.WIDGET_SECONDARY_FONT_INACTIVE
            }
          />
        </div>
      </div>
    </Container>
  );
}

export default XpBox;
