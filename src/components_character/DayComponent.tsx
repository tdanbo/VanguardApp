import { Socket } from "socket.io-client";
import styled from "styled-components";
import "../App.css";
import * as Constants from "../Constants";
import { CharacterEntry, SessionEntry } from "../Types";
import { toTitleCase } from "../functions/UtilityFunctions";
const Container = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: row;

  cursor: pointer;
  gap: 10px;
  h1 {
    font-size: clamp(1px, ${Constants.VW}, 18px);
    color: ${Constants.WIDGET_PRIMARY_FONT};
  }
  h2 {
    margin-top: 12px;
    font-size: 12px;
    color: ${Constants.WIDGET_SECONDARY_FONT};
  }

  user-select: none;
`;

const CategoryContainerLeft = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
  border: 1px solid ${Constants.WIDGET_BORDER};
  border-radius: 5px;
  height: 100%;
  width: 100%;
  user-select: none;
`;
const CategoryContainerRight = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
  border: 1px solid ${Constants.WIDGET_BORDER};
  border-radius: 5px;
  height: 100%;
  width: 100%;
  user-select: none;
`;

interface XpBoxProps {
  session: SessionEntry;
  character: CharacterEntry;
  websocket: Socket;
  isCreature: boolean;
}

function DayComponent({ session }: XpBoxProps) {
  return (
    <Container className="mouse-icon-hover">
      <CategoryContainerLeft>
        <h1>{toTitleCase(session.travel.time)}</h1>
      </CategoryContainerLeft>
      <CategoryContainerRight title={"Day"}>
        <h2 className={".hide-div"}>DAY</h2>
        <h1>{session.travel.day}</h1>
      </CategoryContainerRight>
    </Container>
  );
}

export default DayComponent;
