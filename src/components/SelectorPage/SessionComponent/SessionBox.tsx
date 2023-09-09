import * as Constants from "../../../Constants";
import { SessionEntry } from "../../../Types";
import { SessionContext } from "../../../contexts/SessionContext";
import { useContext } from "react";

interface SessionBoxProps {
  setSelector: (selector: string) => void;
  sessionprop: SessionEntry;
}

function SessionBox({ setSelector, sessionprop }: SessionBoxProps) {
  const { session, setSession } = useContext(SessionContext);
  const handleOnClick = () => {
    setSession(sessionprop);
    setSelector("characterSelect");
  };
  return (
    <div
      className="flex h-10 w-full items-center justify-center rounded-lg"
      style={{ backgroundColor: Constants.BUTTON }}
      onClick={handleOnClick}
    >
      <h1>{sessionprop.name}</h1>
    </div>
  );
}

export default SessionBox;
