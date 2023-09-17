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

import {
  ButtonContainer,
  LargeCircleButton,
  SmallCircleButton,
} from "../SelectorStyles";

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
  const { session } = useContext(SessionContext);

  const handleLinkCopy = () => {
    copyTextToClipboard(session.id); // Use any of the methods above
  };

  const handleDeleteSession = async () => {
    console.log("Deleting Session");
    setSelector("session");
  };
  return (
    <ButtonContainer>
      <SmallCircleButton onClick={() => setSelector("session")}>
        <FontAwesomeIcon icon={faAngleLeft} />
      </SmallCircleButton>
      <LargeCircleButton onClick={() => setSelector("sessions")}>
        <FontAwesomeIcon icon={faHatWizard} />
      </LargeCircleButton>
      <LargeCircleButton onClick={handleLinkCopy}>
        <FontAwesomeIcon icon={faLink} />
      </LargeCircleButton>
      <SmallCircleButton onClick={handleDeleteSession}>
        <FontAwesomeIcon icon={faXmark} />
      </SmallCircleButton>
    </ButtonContainer>
  );
}
export default GamemasterButtons;
