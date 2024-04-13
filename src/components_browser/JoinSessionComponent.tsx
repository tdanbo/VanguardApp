import React, { useState } from "react";
import { get_session } from "../functions/SessionsFunctions";
import styled from "styled-components";
import * as Constants from "../Constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { SessionEntry } from "../Types";

const Navigator = styled.button`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  border-radius: ${Constants.BORDER_RADIUS};
  border: 1px solid ${Constants.WIDGET_BORDER};
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: ${Constants.WIDGET_SECONDARY_FONT};
  width: 40px;
  max-width: 40px;
  height: 40px;
`;

const SessionInput = styled.input`
  display: flex;
  flex-grow: 1;
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  border: 1px solid ${Constants.WIDGET_BORDER};
  border-radius: ${Constants.BORDER_RADIUS};
  color: ${Constants.WIDGET_SECONDARY_FONT};
  font-weight: bold;
  text-align: center;
`;

interface JoinSessionComponentProps {
  setIsJoined: React.Dispatch<React.SetStateAction<boolean>>;
  setSession: React.Dispatch<React.SetStateAction<SessionEntry>>;
}

export default function JoinSessionComponent({
  setIsJoined,
  setSession,
}: JoinSessionComponentProps) {
  const [sessionName, setSessionName] = useState("test");

  const handleJoinSession = () => {
    get_session(sessionName).then((res) => {
      if (res) {
        setSession(res); // Assuming you have a setSession function
        setIsJoined(true);
      } else {
        console.log("Session not found");
      }
    });
  };

  const onSessionNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSessionName(e.target.value);
  };

  return (
    <>
      <Navigator onClick={handleJoinSession}>
        <FontAwesomeIcon
          icon={faRightToBracket}
          color={Constants.WIDGET_SECONDARY_FONT}
          title={"Disconnected"}
        />
      </Navigator>

      <SessionInput
        placeholder="Session ID"
        value={sessionName}
        onChange={onSessionNameChange}
      ></SessionInput>
    </>
  );
}
