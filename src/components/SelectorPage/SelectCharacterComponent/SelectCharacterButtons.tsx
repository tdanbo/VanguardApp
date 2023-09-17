import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { SessionContext } from "../../../contexts/SessionContext";
import { leaveSession } from "../../../functions/SessionsFunctions";
import * as Styles from "../SelectorStyles";
import * as Constants from "../../../Constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faAngleLeft,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { CharacterEntry } from "../../../Types";

import styled from "styled-components";

import {
  ButtonContainer,
  LargeCircleButton,
  SmallCircleButton,
} from "../SelectorStyles";

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

  const StyledIcon = styled(FontAwesomeIcon)`
    color: ${Constants.WIDGET_PRIMARY_FONT};
  `;

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
