import { useContext } from "react";
import { SessionContext } from "../../../contexts/SessionContext";
import {
  deleteSession,
  deleteAllSessionCharacters,
} from "../../../functions/SessionsFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
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
    deleteSession(session.id);
    deleteAllSessionCharacters(session.id);
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
