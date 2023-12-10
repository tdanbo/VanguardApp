import * as Constants from "../Constants";
import { GetBurnRate } from "../functions/CharacterFunctions";

import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { CharacterEntry, SessionEntry } from "../Types";

const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Navigator = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  color: ${Constants.WIDGET_PRIMARY_FONT};
  border-radius: ${Constants.BORDER_RADIUS};
  border: 1px solid ${Constants.WIDGET_BACKGROUND_EMPTY};
  &:hover {
    background-color: ${Constants.WIDGET_BACKGROUND};
    color: ${Constants.WIDGET_PRIMARY_FONT};
    border: 1px solid ${Constants.WIDGET_BORDER};
  }
  height: 33px;
  width: 48px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
`;

const Divider = styled.div`
  display: flex;
  background-color: rgba(0, 0, 0, 0.25);
  width: 2px;
  height: 16px;
  margin: 5px;
  background-color: ${Constants.WIDGET_BACKGROUND};
`;

interface RestBoxProps {
  character: CharacterEntry;
  session: SessionEntry;
  websocket: WebSocket;
  isCreature: boolean;
}

function RestBox({ character }: RestBoxProps) {
  return (
    <OuterContainer>
      <Navigator>
        <Container>{GetBurnRate(character)}</Container>
        <Divider />
        <Icon>
          <FontAwesomeIcon icon={faMoon} />
        </Icon>
      </Navigator>
    </OuterContainer>
  );
}

export default RestBox;
