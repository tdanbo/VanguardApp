import { useEffect, useContext, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import * as Constants from "../../Constants";
import { UserContext } from "../../contexts/UserContext";
import { SessionContext } from "../../contexts/SessionContext";
import styled from "styled-components";
import { getSession } from "../../functions/SessionsFunctions";
import {
  MainContainer,
  ModalContainer,
  Title,
  CenterContainer,
  ButtonContainer,
  ControlButton,
} from "./SelectorStyles";

const InputButton = styled.input`
  display: flex;
  align-items: center;
  text-aling: center;
  flex-grow: 1;
  flex: 1;
  min-height: 50px;
  font-size: 20px;
  outline: none;
  text-align: center;
  border: 1px solid ${Constants.WIDGET_BORDER};
  color: ${Constants.WIDGET_SECONDARY_FONT};
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
`;

interface LoginProps {
  setSelector: (selector: string) => void;
}

function JoinComponent({ setSelector }: LoginProps) {
  const [sessionName, setSessionName] = useState("");
  const { setSession } = useContext(SessionContext);

  const handleSessionName = (e: any) => {
    setSessionName(e.target.value);
  };

  const handleJoinSession = () => {
    console.log(sessionName);
    getSession(sessionName).then((res) => {
      if (res) {
        console.log(res);
        setSession(res);
        setSelector("characterSelect");
      } else {
        console.log("Session not found");
      }
    });
  };

  return (
    <MainContainer>
      <Title>Join Session</Title>
      <ModalContainer>
        <CenterContainer>
          {/* <LoginButton onClick={handleLogin}>Login Using Discord</LoginButton> */}
          <InputButton onChange={handleSessionName} placeholder="Session Key" />
        </CenterContainer>
      </ModalContainer>
      <ButtonContainer>
        <ControlButton onClick={handleJoinSession}>Join Session</ControlButton>
        <ControlButton onClick={() => setSelector("createSession")}>
          Create Session
        </ControlButton>
      </ButtonContainer>
    </MainContainer>
  );
}

export default JoinComponent;
