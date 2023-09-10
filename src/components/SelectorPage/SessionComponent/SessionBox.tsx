import * as Constants from "../../../Constants";
import { SessionEntry } from "../../../Types";
import { SessionContext } from "../../../contexts/SessionContext";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";

interface SessionBoxProps {
  setSelector: (selector: string) => void;
  sessionprop: SessionEntry;
}

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
    <div
      className="flex flex-col items-center justify-center rounded-lg p-3"
      style={{ backgroundColor: Constants.BUTTON, color: Constants.FONT_LIGHT }}
      onClick={handleOnClick}
    >
      <h2>{sessionprop.name}</h2>
      {sessionprop.owner === user ? (
        <h2 className="ml-2 text-xs text-red-400">Game Master</h2>
      ) : (
        <h2 className="ml-2 text-xs text-gray-400">Player</h2>
      )}
    </div>
  );
}

export default SessionBox;
