import React, { useState } from "react";
import { get_session } from "../functions/SessionsFunctions";
import styled from "styled-components";
import * as Constants from "../Constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { SessionEntry } from "../Types";

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
      <div className="button button_color" onClick={handleJoinSession}>
        <FontAwesomeIcon
          icon={faRightToBracket}
          color={Constants.WIDGET_SECONDARY_FONT}
          title={"Disconnected"}
        />
      </div>

      <input
        className="empty_color"
        style={{
          display: "flex", // Quotes around flex
          flexGrow: 1,
          backgroundColor: Constants.BACKGROUND, // Correct property name
          border: `1px solid ${Constants.WIDGET_BORDER}`, // Template literal for dynamic values
          borderRadius: Constants.BORDER_RADIUS, // Correct property name
          color: Constants.WIDGET_SECONDARY_FONT,
          fontWeight: "bold", // Quotes around bold
          textAlign: "center", // Quotes around center
        }}
        placeholder="Session ID"
        value={sessionName}
        onChange={onSessionNameChange}
      />
    </>
  );
}
