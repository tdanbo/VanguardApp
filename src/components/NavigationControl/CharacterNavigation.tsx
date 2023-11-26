import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShield,
  faBolt,
  faGhost,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import * as Constants from "../../Constants";
const Container = styled.div`
  display: flex;
  flex-direction: column;

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
  height: 35px;
`;

interface NavigationProps {
  browserState: number;
  setBrowserState: (browserState: number) => void;
  gmMode: boolean;
}

function CharacterNavigation({
  browserState,
  setBrowserState,
  gmMode,
}: NavigationProps) {
  const handleNavigationClick = (targetState: number) => {
    setBrowserState(browserState === targetState ? 0 : targetState);
  };

  return (
    <Container>
      <Navigator
        $active={browserState === 1}
        onClick={() => handleNavigationClick(1)}
      >
        <FontAwesomeIcon icon={faShield} />
      </Navigator>
      <Navigator
        $active={browserState === 2}
        onClick={() => handleNavigationClick(2)}
      >
        <FontAwesomeIcon icon={faBolt} />
      </Navigator>
      {gmMode && (
        <Navigator
          $active={browserState === 4}
          onClick={() => handleNavigationClick(4)}
        >
          <FontAwesomeIcon icon={faGhost} />
        </Navigator>
      )}
      <Navigator
        $active={browserState === 5}
        onClick={() => handleNavigationClick(5)}
      >
        <FontAwesomeIcon icon={faUsers} />
      </Navigator>
    </Container>
  );
}

export default CharacterNavigation;
