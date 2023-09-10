import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { SessionContext } from "../../../contexts/SessionContext";
import {
  leaveSession,
  getSessions,
  deleteSession,
  deleteAllSessionCharacters,
} from "../../../functions/SessionsFunctions";
import * as Styles from "../SelectorStyles";
import * as Constants from "../../../Constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faAngleLeft,
  faXmark,
  faHatWizard,
  faLink,
} from "@fortawesome/free-solid-svg-icons";

interface LoginProps {
  setSelector: (selector: string) => void;
}

async function copyTextToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    console.log("Text successfully copied to clipboard");
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
}

function GamemasterButtons({ setSelector }: LoginProps) {
  const { user } = useContext(UserContext);
  const { session, setSession } = useContext(SessionContext);

  const handleLinkCopy = () => {
    copyTextToClipboard(session.id); // Use any of the methods above
  };

  const handleDeleteSession = async () => {
    console.log("Deleting Session");
    const sessions = await deleteSession(session.id, user);
    const delete_characters = await deleteAllSessionCharacters(session.id);
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
        onClick={() => setSelector("sessions")}
      >
        <FontAwesomeIcon
          icon={faHatWizard}
          style={{ color: Constants.FONT_LIGHT }}
        />
      </div>
      <div style={Styles.largeCircleButtonStyles} onClick={handleLinkCopy}>
        <FontAwesomeIcon
          icon={faLink}
          style={{ color: Constants.FONT_LIGHT }}
        />
      </div>
      <div style={Styles.smallCircleButtonStyles} onClick={handleDeleteSession}>
        {" "}
        <FontAwesomeIcon
          icon={faXmark}
          style={{ color: Constants.FONT_LIGHT }}
        />
      </div>
    </div>
  );
}
export default GamemasterButtons;
