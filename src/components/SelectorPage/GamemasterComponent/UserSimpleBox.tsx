import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import * as Constants from "../../../Constants";
import {
  getSessionUsers,
  leaveSession,
} from "../../../functions/SessionsFunctions";
import { useContext } from "react";
import { SessionContext } from "../../../contexts/SessionContext";

interface UserSimpleBoxProps {
  username: string;
  setUserLog: React.Dispatch<React.SetStateAction<string[]>>;
}

function UserSimpleBox({ username, setUserLog }: UserSimpleBoxProps) {
  const { session, setSession } = useContext(SessionContext);

  const onHandleKickUser = async () => {
    const leave = await leaveSession(session.id, username);
    const users = await getSessionUsers(session.id);
    setUserLog(users);
  };

  return (
    <div
      className="flex rounded-lg p-1"
      style={{ backgroundColor: Constants.BUTTON }}
    >
      <div
        className="flex items-center justify-center px-2"
        style={{ color: Constants.FONT_LIGHT }}
      >
        <FontAwesomeIcon icon={faDiscord} onClick={onHandleKickUser} />
      </div>
      <div className="flex grow px-2" style={{ color: Constants.FONT_LIGHT }}>
        {username}
      </div>
      <div
        className="flex items-center justify-center px-2"
        style={{ color: Constants.BRIGHT_RED }}
      >
        <FontAwesomeIcon icon={faXmark} onClick={onHandleKickUser} />
      </div>
    </div>
  );
}

export default UserSimpleBox;
