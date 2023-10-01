import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShield, faBolt } from "@fortawesome/free-solid-svg-icons";
import * as Constants from "../../Constants";
import SelectorComponent from "../SelectorPage/Selector";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 10px;
`;

interface NavigatorProps {
  $active: boolean;
}

const Navigator = styled.button<NavigatorProps>`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 1px solid ${Constants.WIDGET_BACKGROUND_EMPTY};
  font-size: 18px;
  color: ${(props) =>
    props.$active
      ? Constants.WIDGET_PRIMARY_FONT
      : Constants.WIDGET_BACKGROUND};
  background-color: ${(props) =>
    props.$active
      ? Constants.WIDGET_BACKGROUND
      : Constants.WIDGET_BACKGROUND_EMPTY};
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
      <SelectorComponent />
      <Navigator $active={browserState === 1} onClick={onHandleItems}>
        <FontAwesomeIcon icon={faShield} />
      </Navigator>
      <Navigator $active={browserState === 2} onClick={onHandleAbilities}>
        <FontAwesomeIcon icon={faBolt} />
      </Navigator>
    </Container>
  );
}

export default CharacterNavigation;
