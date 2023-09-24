import { useState, useContext } from "react";
import { joinSession } from "../../../functions/SessionsFunctions";
import { UserContext } from "../../../contexts/UserContext";
import { SessionEntry } from "../../../Types";
import * as Constants from "../../../Constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCheck, faLink } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

import { ButtonContainer, LargeCircleButton } from "../SelectorStyles";

interface LoginProps {
  setSelector: (selector: string) => void;
  setSessions: (sessions: SessionEntry[]) => void;
}

const InputBox = styled.input`
  border-radius: 4px;
  padding: 2px;
  margin: 5px;
  max-height: 50px;
  text-align: center;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  color: ${Constants.WIDGET_PRIMARY_FONT};
`;

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
    const sessions = await joinSession(sessionID, user);
    setSessionID("");
    toggleVisibility();
    setSessions(sessions);
  };

  return (
    <ButtonContainer>
      <div className="my-1 flex flex-col">
        <InputBox
          placeholder="Join Session by ID"
          hidden={isVisible}
          onChange={onSessionIDChange}
        />
      </div>
      {sessionID === "" ? (
        <LargeCircleButton onClick={toggleVisibility}>
          <StyledIcon icon={faLink} />
        </LargeCircleButton>
      ) : (
        <LargeCircleButton onClick={handleJoinSession}>
          <StyledIcon icon={faCheck} />
        </LargeCircleButton>
      )}
      <LargeCircleButton onClick={() => setSelector("createSession")}>
        <StyledIcon icon={faPlus} />
      </LargeCircleButton>
    </ButtonContainer>
  );
}
export default SessionButtons;
