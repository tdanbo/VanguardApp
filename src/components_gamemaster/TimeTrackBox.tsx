import { useState } from "react";
import { Socket } from "socket.io-client";
import styled from "styled-components";
import * as Constants from "../Constants";
import { NewCharacterEntry, SessionEntry } from "../Types";
import { update_session } from "../functions/SessionsFunctions";
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
  &:hover {
    background-color: ${Constants.WIDGET_BACKGROUND};
    color: ${Constants.WIDGET_PRIMARY_FONT};
    border: 1px solid ${Constants.WIDGET_BORDER};
  }
`;

interface TimeTrackBoxProps {
  session: SessionEntry;
  websocket: Socket;
}

function TimeTrackBox({ session, websocket }: TimeTrackBoxProps) {
  // Ensure that the initial value is a valid hour (0-23); otherwise, set it to null
  const [activeHour, setActiveHour] = useState<number | null>(
    typeof session.travel.time === "number" &&
      session.travel.time >= 0 &&
      session.travel.time < 24
      ? session.travel.time
      : null,
  );

  const handleTimeChange = async (time: number) => {
    setActiveHour(time); // Set the active hour
    session.travel.time = time;

    update_session(session, websocket, NewCharacterEntry, false);
  };

  return (
    <Container>
      <DayContainer>
        {Array.from({ length: 24 }).map((_, index) => (
          <HourContainer
            key={index}
            onClick={() => handleTimeChange(index)}
            data-isactive={index === activeHour} // Use data-isactive instead of isactive
          >
            {index}
          </HourContainer>
        ))}
      </DayContainer>
    </Container>
  );
}

export default TimeTrackBox;
