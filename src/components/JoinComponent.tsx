import { useState } from "react";
import * as Constants from "../Constants";
import styled from "styled-components";
import { getSession } from "../functions/SessionsFunctions";

import { CharacterEntry, SessionEntry } from "../Types";
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
  background-image: linear-gradient(rgba(7, 9, 11, 0.95), rgba(7, 9, 11, 0.95)),
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

const Navigator = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  color: ${Constants.WIDGET_BACKGROUND};
  border-radius: ${Constants.BORDER_RADIUS};
  border: 1px solid ${Constants.WIDGET_BACKGROUND_EMPTY};
  &:hover {
    background-color: ${Constants.WIDGET_BACKGROUND};
    color: ${Constants.WIDGET_PRIMARY_FONT};
    border: 1px solid ${Constants.WIDGET_BORDER};
  }
  height: 35px;
  width: 50px;
`;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";

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
    getSession(sessionName).then((res) => {
      if (res) {
        setSession(res);
      } else {
        console.log("Session not found");
      }
    });
  };

  const joinGm = () => {
    console.log("Joining session as GM");
    handleJoinSession();
    setIsGm(true);
    setIsJoinOpen(false);
  };

  const joinSession = () => {
    console.log("Joining session as player");
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
