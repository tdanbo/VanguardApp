import * as Constants from "../../../Constants";
import { SessionEntry } from "../../../Types";
import { SessionContext } from "../../../contexts/SessionContext";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import styled from "styled-components";

interface SessionBoxProps {
  setSelector: (selector: string) => void;
  sessionprop: SessionEntry;
}

const SessionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3px;
  border-radius: 4px;
  background-color: ${Constants.WIDGET_BACKGROUND};
  color: ${Constants.WIDGET_PRIMARY_FONT};
`;

const SessionTitle = styled.h2``; // Modify if needed

const UserRole = styled.h2`
  margin-left: 2px;
  font-size: 0.75rem;

  &.game-master {
    color: red;
  }

  &.player {
    color: gray;
  }
`;

function SessionBox({ setSelector, sessionprop }: SessionBoxProps) {
  const { session, setSession } = useContext(SessionContext);
  const { user } = useContext(UserContext);

  const handleOnClick = () => {
    setSession(sessionprop);
    if (sessionprop.owner === user) {
      setSelector("gamemaster");
    } else {
      setSelector("characterSelect");
    }
  };

  return (
    <SessionContainer onClick={handleOnClick}>
      <SessionTitle>{sessionprop.name}</SessionTitle>
      {sessionprop.owner === user ? (
        <UserRole className="game-master">Game Master</UserRole>
      ) : (
        <UserRole className="player">Player</UserRole>
      )}
    </SessionContainer>
  );
}

export default SessionBox;
