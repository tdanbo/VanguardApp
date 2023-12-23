import { useState } from "react";
import * as Constants from "../Constants";
import styled from "styled-components";
import { get_session } from "../functions/SessionsFunctions";

import { SessionEntry } from "../Types";
import BackgroundImage from "../assets/icons/background.jpeg";
import {
  MainContainer,
  ModalContainer,
  Title,
  CenterContainer,
  ButtonContainer,
  ControlButton,
} from "./SelectorPage/SelectorStyles";

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

const OverlayStyles = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(rgba(7, 9, 11, 0.93), rgba(7, 9, 11, 0.93)),
    url(${BackgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

interface LoginProps {
  setGmMode: React.Dispatch<React.SetStateAction<boolean>>;
  setSession: React.Dispatch<React.SetStateAction<SessionEntry>>;
  setIsJoinOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsGm: React.Dispatch<React.SetStateAction<boolean>>;
}

function JoinComponent({ setSession, setIsJoinOpen, setIsGm }: LoginProps) {
  const [sessionName, setSessionName] = useState("0nPFPbvRss");
  const handleSessionName = (e: any) => {
    setSessionName(e.target.value);
  };

  const handleJoinSession = () => {
    get_session(sessionName).then((res) => {
      if (res) {
        setSession(res);
      } else {
        console.log("Session not found");
      }
    });
  };

  const joinGm = () => {
    handleJoinSession();
    setIsGm(true);
    console.log("Joining as GM");
    setIsJoinOpen(false);
  };

  const joinSession = () => {
    handleJoinSession();
    setIsGm(false);
    setIsJoinOpen(false);
  };

  return (
    <OverlayStyles>
      <MainContainer>
        <Title>Join Session</Title>
        <ModalContainer>
          <CenterContainer>
            <InputButton
              onChange={handleSessionName}
              placeholder="Session Key"
            />
          </CenterContainer>
        </ModalContainer>
        <ButtonContainer>
          {/* <ControlButton onClick={() => setSelector("createSession")}>
                Create Session
              </ControlButton> */}
          <ControlButton onClick={joinGm}>Join As GM</ControlButton>
          <ControlButton onClick={joinSession}>Join As Player</ControlButton>
        </ButtonContainer>
      </MainContainer>
    </OverlayStyles>
  );
}
export default JoinComponent;
