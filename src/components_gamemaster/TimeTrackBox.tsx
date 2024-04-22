import { useState } from "react";
import { Socket } from "socket.io-client";
import styled from "styled-components";
import * as Constants from "../Constants";
import { NewCharacterEntry, SessionEntry, TimeCategory } from "../Types";
import { update_session } from "../functions/SessionsFunctions";
import {
  toTitleCase,
  SetStatusForward,
  SetStatusBackward,
} from "../functions/UtilityFunctions";
import { forEach } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  display: flex;
  flex-grow: 1;
  gap: 20px;
  justify-content: right;
`;

const DayContainer = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: right;
  gap: 2px;
`;

interface HourContainerProps {
  "data-isactive": boolean;
}

const HourContainer = styled.button<HourContainerProps>`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid ${Constants.WIDGET_BACKGROUND_EMPTY};
  font-size: 12px;
  color: ${(props) =>
    props["data-isactive"]
      ? Constants.WIDGET_PRIMARY_FONT
      : Constants.WIDGET_BACKGROUND};
  background-color: ${(props) =>
    props["data-isactive"]
      ? Constants.WIDGET_BACKGROUND
      : Constants.WIDGET_BACKGROUND_EMPTY};
  border-radius: ${Constants.BORDER_RADIUS};
`;

interface TimeTrackBoxProps {
  session: SessionEntry;
  websocket: Socket;
}

function TimeTrackBox({ session, websocket }: TimeTrackBoxProps) {
  // Ensure that the initial value is a valid hour (0-23); otherwise, set it to null
  const [activeHour, setActiveHour] = useState<TimeCategory>(
    session.travel.time,
  );

  const passTimeForward = () => {
    forEach(session.characters, (character) => {
      SetStatusBackward(character);

      if (session.travel.time === "night") {
        character.details.xp_earned += 5;
      }
    });

    if (session.travel.time === "night") {
      session.travel.time = "morning";
      session.travel.day += 1;
      setActiveHour("morning");
    } else if (session.travel.time === "morning") {
      session.travel.time = "afternoon";
      setActiveHour("afternoon");
    } else if (session.travel.time === "afternoon") {
      session.travel.time = "evening";
      setActiveHour("evening");
    } else if (session.travel.time === "evening") {
      session.travel.time = "night";
      setActiveHour("night");
    }
    update_session(session, websocket, NewCharacterEntry, false);
  };

  const passTimeBackward = () => {
    forEach(session.characters, (character) => {
      SetStatusForward(character);
      if (session.travel.time === "morning") {
        character.details.xp_earned -= 5;
      }
    });

    if (session.travel.time === "morning") {
      session.travel.time = "night";
      session.travel.day -= 1;
      setActiveHour("night");
    } else if (session.travel.time === "afternoon") {
      session.travel.time = "morning";
      setActiveHour("morning");
    } else if (session.travel.time === "evening") {
      session.travel.time = "afternoon";
      setActiveHour("afternoon");
    } else if (session.travel.time === "night") {
      session.travel.time = "evening";
      setActiveHour("evening");
    }
    update_session(session, websocket, NewCharacterEntry, false);
  };

  const time = ["morning", "afternoon", "evening", "night"];

  return (
    <Container>
      <DayContainer>
        <div
          className="row base_color button"
          style={{ maxWidth: "50px" }}
          onClick={() => passTimeBackward()}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>
        {time.map((time, index) => (
          <HourContainer
            key={index}
            data-isactive={time === activeHour} // Use data-isactive instead of isactive
          >
            {toTitleCase(time)}
          </HourContainer>
        ))}
        <div
          className="row base_color button"
          style={{ maxWidth: "50px" }}
          onClick={() => passTimeForward()}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </DayContainer>
    </Container>
  );
}

export default TimeTrackBox;
