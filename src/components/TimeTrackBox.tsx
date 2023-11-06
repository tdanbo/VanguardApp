import styled from "styled-components";
import * as Constants from "../Constants";
import { cloneDeep } from "lodash";
import { updateSession } from "../functions/SessionsFunctions";
import { useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";
const Container = styled.div`
  display: flex;
  flex-grow: 1;
  height: 35px;
  gap: 20px;
  justify-content: right;
`;

const HourContainer = styled.div`
  display: flex;
  flex: 1;
  flex-grow: 1;
  flex-direction: column;
  height: 35px;
  justify-content: center;
  align-items: center;
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  border: 1px solid ${Constants.WIDGET_BORDER};
  border-radius: 5px;
  font-size: 12px;
  color: ${Constants.WIDGET_SECONDARY_FONT};
`;

const DayContainer = styled.div`
  display: flex;
  flex-grow: 1;
  height: 35px;
  justify-content: right;
  gap: 2px;
`;

function TimeTrackBox() {
  const { session, setSession } = useContext(SessionContext);
  const handleTimeChange = async (time: number) => {
    const updatedSession = cloneDeep(session);
    updatedSession.travel.time = time;

    const newSession = await updateSession(updatedSession);
    console.log(newSession);
    setSession(newSession);
  };
  return (
    <Container>
      <DayContainer>
        {Array.from({ length: 24 }).map((_, index) => (
          <HourContainer key={index} onClick={() => handleTimeChange(index)}>
            {index}
          </HourContainer>
        ))}
      </DayContainer>
    </Container>
  );
}
export default TimeTrackBox;
