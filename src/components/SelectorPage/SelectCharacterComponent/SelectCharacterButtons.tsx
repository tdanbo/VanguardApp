import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { SessionContext } from "../../../contexts/SessionContext";
import {
  leaveSession,
  getSessions,
} from "../../../functions/SessionsFunctions";
import * as Styles from "../SelectorStyles";
import * as Constants from "../../../Constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faAngleLeft,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { CharacterEntry } from "../../../Types";

interface LoginProps {
  setSelector: (selector: string) => void;
  setCharacterLog: React.Dispatch<React.SetStateAction<CharacterEntry[]>>;
}

function SelectCharacterButtons({ setSelector, setCharacterLog }: LoginProps) {
  const { user } = useContext(UserContext);
  const { session, setSession } = useContext(SessionContext);

  const handleLeaveSession = async () => {
    console.log("Leaving Session");
    const sessions = await leaveSession(session.id, user);
    setSelector("session");
  };
  return (
    <div className="mb-5 mt-3 flex justify-center">
      {" "}
      {/* Adjust the margin-bottom if necessary */}{" "}
      <div
        style={Styles.smallCircleButtonStyles}
        onClick={() => setSelector("session")}
      >
        {" "}
        <FontAwesomeIcon
          icon={faAngleLeft}
          style={{ color: Constants.FONT_LIGHT }}
        />
      </div>
      <div
        style={Styles.largeCircleButtonStyles}
        onClick={() => setSelector("createCharacter")}
      >
        <FontAwesomeIcon
          icon={faPlus}
          style={{ color: Constants.FONT_LIGHT }}
        />
      </div>
      <div style={Styles.smallCircleButtonStyles} onClick={handleLeaveSession}>
        {" "}
        <FontAwesomeIcon
          icon={faXmark}
          style={{ color: Constants.FONT_LIGHT }}
        />
      </div>
    </div>
  );
}
export default SelectCharacterButtons;