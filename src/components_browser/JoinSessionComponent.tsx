import React, { useState } from "react";
import { get_session } from "../functions/SessionsFunctions";
import * as Constants from "../Constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { SessionEntry } from "../Types";

interface JoinSessionComponentProps {
  setIsJoined: React.Dispatch<React.SetStateAction<boolean>>;
  setSession: React.Dispatch<React.SetStateAction<SessionEntry>>;
}

export default function JoinSessionComponent({
  setIsJoined,
  setSession,
}: JoinSessionComponentProps) {
  const [sessionName, setSessionName] = useState("Session Name");

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
      <div
        className="row button button--tertiary"
        style={{ maxWidth: "35px" }}
        onClick={handleJoinSession}
      >
        <FontAwesomeIcon
          icon={faRightToBracket}
          color={Constants.WIDGET_SECONDARY_FONT}
          title={"Join Session"}
        />
      </div>

      <input
        className="empty_color"
        style={{
          display: "flex", // Quotes around flex
          fontSize: "20px", // Quotes around 14px
          flexGrow: 1,
          backgroundColor: Constants.BACKGROUND, // Correct property name
          border: `1px solid ${Constants.WIDGET_BORDER}`, // Template literal for dynamic values
          borderRadius: Constants.BORDER_RADIUS, // Correct property name
          color: Constants.WIDGET_SECONDARY_FONT,
          fontWeight: "bold", // Quotes around bold
          textAlign: "center", // Quotes around center
          height: "100%",
          paddingRight: "40px", // Quotes around 5px
        }}
        placeholder="Session ID"
        onChange={onSessionNameChange}
      />
    </>
  );
}
