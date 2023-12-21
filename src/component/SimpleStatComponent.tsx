import styled from "styled-components";
import * as Constants from "../Constants";

const BoxContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 2px;
`;

const ValueName = styled.button`
  display: flex;
  flex-grow: 1;
  flex: 1;
  background-color: rgb(0, 255, 0);
  align-items: center;
  justify-content: center;
  color: ${Constants.WIDGET_SECONDARY_FONT};
  color: ${Constants.WIDGET_SECONDARY_FONT};
  font-size: 14px;
  font-weight: bold;
  background-color: ${Constants.WIDGET_BACKGROUND};
  border: 1px solid ${Constants.WIDGET_BORDER};
  border-radius: ${Constants.BORDER_RADIUS};
  min-height: 30px;
  max-height: 30px;
`;

const Value = styled.button`
  display: flex;
  flex-direction: column;
  flex: 2;
  align-items: center;
  justify-content: center;
  border-radius: ${Constants.BORDER_RADIUS};
  font-size: 2.5rem;
  font-weight: bold;
  color: ${Constants.WIDGET_PRIMARY_FONT};
  border: 1px solid ${Constants.WIDGET_BORDER};
  background-color: ${Constants.WIDGET_BACKGROUND};
  background-color: ${Constants.WIDGET_BACKGROUND};
  p {
    font-size: 10px;
    font-weight: bold;
    color: ${Constants.WIDGET_BACKGROUND};
    letter-spacing: 1px;
  }
`;

const ActiveValue = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: bold;
  color: ${Constants.WIDGET_BACKGROUND};
  letter-spacing: 1px;
`;

interface SecondaryStatsControlsProps {
  value: number;
  title: string;
  stat: string;
}

function SimpleStatComponent({
  value,
  title,
  stat,
}: SecondaryStatsControlsProps) {
  return (
    <BoxContainer>
      <Value>
        {value}
        <ActiveValue>{title}</ActiveValue>
      </Value>
      <ValueName>{stat}</ValueName>
    </BoxContainer>
  );
}

export default SimpleStatComponent;
