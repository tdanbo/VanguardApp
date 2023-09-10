import UserBox from "../UserBox";
import { useState, useContext } from "react";
import { getSessions, joinSession } from "../../../functions/SessionsFunctions";
import { UserContext } from "../../../contexts/UserContext";
import { SessionEntry } from "../../../Types";
import * as Constants from "../../../Constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faCheck,
  faLink,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import * as Styles from "./../SelectorStyles";

interface LoginProps {
  setSelector: (selector: string) => void;
  setSessions: (sessions: SessionEntry[]) => void;
}

function SessionButtons({ setSelector, setSessions }: LoginProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [sessionID, setSessionID] = useState<string>("");
  const { user } = useContext(UserContext);

  // Function to toggle the visibility
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const onSessionIDChange = (e: any) => {
    setSessionID(e.target.value);
  };

  const handleJoinSession = async () => {
    // 6uB9wlMhDs
    console.log("Joining Session");
    const sessions = await joinSession(sessionID, user);
    setSessionID("");
    toggleVisibility();
    setSessions(sessions);
  };

  return (
    <div className="mb-5 mt-3 flex justify-center">
      <div className="my-1 flex flex-col">
        <input
          placeholder="Join Session by ID"
          className="rounded-md p-2"
          style={{ margin: "5px", maxHeight: "50px", textAlign: "center" }}
          hidden={isVisible}
          onChange={onSessionIDChange}
        />
      </div>
      {sessionID === "" ? (
        <div style={Styles.largeCircleButtonStyles} onClick={toggleVisibility}>
          <FontAwesomeIcon
            icon={faLink}
            style={{ color: Constants.FONT_LIGHT }}
          />
        </div>
      ) : (
        <div style={Styles.largeCircleButtonStyles} onClick={handleJoinSession}>
          <FontAwesomeIcon
            icon={faCheck}
            style={{ color: Constants.FONT_LIGHT }}
          />
        </div>
      )}
      <div
        style={Styles.largeCircleButtonStyles}
        onClick={() => setSelector("createSession")}
      >
        {" "}
        <FontAwesomeIcon
          icon={faPlus}
          style={{ color: Constants.FONT_LIGHT }}
        />
      </div>
    </div>
  );
}
export default SessionButtons;
