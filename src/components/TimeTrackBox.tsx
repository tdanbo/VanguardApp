import styled from "styled-components";
import * as Constants from "../Constants";
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

interface TravelBoxProps {
  title: string;
}

function TimeTrackBox() {
  return (
    <Container>
      <DayContainer>
        {Array.from({ length: 26 }).map((_, index) => (
          <HourContainer key={index}>{index}</HourContainer>
        ))}
      </DayContainer>
    </Container>
  );
}
export default TimeTrackBox;
