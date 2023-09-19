import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBriefcase, faBolt } from "@fortawesome/free-solid-svg-icons";
import * as Constants from "../../Constants";
import RestBox from "../RestBox";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 10px;
`;

const Navigator = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  color: ${Constants.WIDGET_BACKGROUND};
  border-radius: ${Constants.BORDER_RADIUS};
  &:hover {
    background-color: ${Constants.WIDGET_BACKGROUND};
    color: ${Constants.WIDGET_PRIMARY_FONT};
    border: 1px solid ${Constants.WIDGET_BORDER};
  }
  width: 50px;
  height: 50px;
`;

interface NavigationProps {
  browserState: number;
  setBrowserState: (browserState: number) => void;
}

function CharacterNavigation({
  browserState,
  setBrowserState,
}: NavigationProps) {
  const onHandleItems = () => {
    if (browserState === 0) {
      setBrowserState(1);
    } else if (browserState === 2) {
      setBrowserState(1);
    } else {
      setBrowserState(0);
    }
  };

  const onHandleAbilities = () => {
    if (browserState === 0) {
      setBrowserState(2);
    } else if (browserState === 1) {
      setBrowserState(2);
    } else {
      setBrowserState(0);
    }
  };

  return (
    <Container>
      <Navigator>
        <FontAwesomeIcon icon={faUser} />
      </Navigator>
      <Navigator onClick={onHandleItems}>
        <FontAwesomeIcon icon={faBriefcase} />
      </Navigator>
      <Navigator onClick={onHandleAbilities}>
        <FontAwesomeIcon icon={faBolt} />
      </Navigator>
    </Container>
  );
}

export default CharacterNavigation;
