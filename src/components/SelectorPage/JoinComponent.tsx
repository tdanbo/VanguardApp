import { useContext, useState } from "react";
import * as Constants from "../../Constants";
import { SessionContext } from "../../contexts/SessionContext";
import styled from "styled-components";
import { getSession } from "../../functions/SessionsFunctions";
import { useEffect } from "react";
import { getCharacters } from "../../functions/SessionsFunctions";

import { CharacterEntry, SessionEntry } from "../../Types";
import {
  CharacterContext,
  defaultCharacter,
} from "../../contexts/CharacterContext";

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
  setGmMode: React.Dispatch<React.SetStateAction<boolean>>;
  setCharacterLog: React.Dispatch<React.SetStateAction<CharacterEntry[]>>;
  closeModal: () => void;
  setSession: React.Dispatch<React.SetStateAction<SessionEntry>>;
}

function JoinComponent({ setGmMode, closeModal, setSession }: LoginProps) {
  const [sessionName, setSessionName] = useState("");

  const handleSessionName = (e: any) => {
    console.log(e.target.value);
    setSessionName(e.target.value);
  };

  const handleJoinSession = () => {
    console.log(sessionName);
    getSession(sessionName).then((res) => {
      if (res) {
        setSession(res);
      } else {
        console.log("Session not found");
      }
    });
  };

  const joinGm = () => {
    handleJoinSession();
    setGmMode(true);
    closeModal();
  };

  const joinSession = () => {
    handleJoinSession();
    setGmMode(false);
    closeModal();
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
        {/* <ControlButton onClick={() => setSelector("createSession")}>
          Create Session
        </ControlButton> */}
        <ControlButton onClick={joinGm}>Join As GM</ControlButton>
        <ControlButton onClick={joinSession}>Join As Player</ControlButton>
      </ButtonContainer>
    </MainContainer>
  );
}

export default JoinComponent;
