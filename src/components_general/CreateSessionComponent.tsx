import { useState } from "react";
import { SessionEntry } from "../Types";
import * as Constants from "../Constants";
import styled from "styled-components";
import {
  MainContainer,
  ModalContainer,
  Title,
  CenterContainer,
  Divider,
  ButtonContainer,
  ControlButton,
} from "./SelectorStyles";

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function generateID(): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

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

const EmailButton = styled.input`
  display: flex;
  align-items: center;
  text-aling: center;
  flex-grow: 1;
  flex: 1;
  min-height: 50px;
  font-size: 15px;
  outline: none;
  text-align: center;
  border: 1px solid ${Constants.WIDGET_BORDER};
  color: ${Constants.WIDGET_SECONDARY_FONT};
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
`;

interface LoginProps {
  setSelector: (selector: string) => void;
  setSession: React.Dispatch<React.SetStateAction<SessionEntry>>;
}

function CreateSessionComponent({ setSelector }: LoginProps) {
  const [sessionName, setSessionName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");

  const handleNameChange = (e: any) => {
    setSessionName(e.target.value);
  };

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handleConfirmEmailChange = (e: any) => {
    setConfirmEmail(e.target.value);
  };

  const isValidEmail = (mail: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);
  };

  const currentDate = new Date();

  const NewSessionEntry: SessionEntry = {
    name: sessionName,
    id: generateID(),
    date: formatDate(currentDate),
    owner: email,
    travel: {
      day: 0,
      time: 0,
      distance: 0,
      weather: "RAINY",
    },
    characters: [],
    combatlog: [],
    encounter: [],
    loot: { drops: [], general: [], armory: [], alchemy: [], novelty: [] },
    state: "take",
  };

  const handlePostSession = async () => {
    console.log(NewSessionEntry);
    // await postSession(NewSessionEntry);
    // setSession(NewSessionEntry);
    // setSelector("characterSelect");
  };

  return (
    <MainContainer>
      <Title>Create Session</Title>
      <ModalContainer>
        <CenterContainer>
          <InputButton
            placeholder={"Session Name"}
            onChange={handleNameChange}
            style={{
              borderColor: sessionName
                ? Constants.WIDGET_BORDER
                : Constants.BRIGHT_RED,
            }}
          />
          <div style={{ height: "20px" }} />
          <EmailButton
            placeholder={"Email"}
            onChange={handleEmailChange}
            style={{
              borderColor: isValidEmail(email)
                ? Constants.WIDGET_BORDER
                : Constants.BRIGHT_RED,
            }}
          />
          <EmailButton
            placeholder={"Confirm Email"}
            onChange={handleConfirmEmailChange}
            style={{
              borderColor:
                email === confirmEmail && email !== ""
                  ? Constants.WIDGET_BORDER
                  : Constants.BRIGHT_RED,
            }}
          />
        </CenterContainer>
        <Divider />
      </ModalContainer>
      <ButtonContainer>
        <ControlButton onClick={() => setSelector("joinSession")}>
          Go Back
        </ControlButton>
        <ControlButton onClick={handlePostSession}>Accept</ControlButton>
      </ButtonContainer>
    </MainContainer>
  );
}

export default CreateSessionComponent;
