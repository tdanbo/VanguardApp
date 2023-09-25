import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { SessionContext } from "../../contexts/SessionContext";
import { leaveSession } from "../../functions/SessionsFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faAngleLeft,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { CharacterEntry } from "../../Types";

import {
  ButtonContainer,
  LargeCircleButton,
  SmallCircleButton,
} from "./SelectorStyles";

interface LoginProps {
  setSelector: (selector: string) => void;
  setCharacterLog: React.Dispatch<React.SetStateAction<CharacterEntry[]>>;
}

function SelectCharacterButtons({ setSelector }: LoginProps) {
  const { user } = useContext(UserContext);
  const { session } = useContext(SessionContext);

  const handleLeaveSession = async () => {
    leaveSession(session.id, user);
    setSelector("session");
  };

  return (
    <ButtonContainer>
      <SmallCircleButton onClick={() => setSelector("session")}>
        <FontAwesomeIcon icon={faAngleLeft} />
      </SmallCircleButton>

      <LargeCircleButton onClick={() => setSelector("createCharacter")}>
        <FontAwesomeIcon icon={faPlus} />
      </LargeCircleButton>

      <SmallCircleButton onClick={handleLeaveSession}>
        <FontAwesomeIcon icon={faXmark} />
      </SmallCircleButton>
    </ButtonContainer>
  );
}
export default SelectCharacterButtons;
