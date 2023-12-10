import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faHatWizard } from "@fortawesome/free-solid-svg-icons";
import * as Constants from "../../Constants";
import { SessionEntry } from "../../Types";
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
  setGmMode: React.Dispatch<React.SetStateAction<boolean>>;
  setSession: React.Dispatch<React.SetStateAction<SessionEntry>>;
  isGm: boolean;
}

function CharacterNavigation({
  browserState,
  setBrowserState,
  isGm,
  gmMode,
  setGmMode,
}: NavigationProps) {
  const handleNavigationClick = (targetState: number) => {
    setBrowserState(browserState === targetState ? 0 : targetState);
  };

  return (
    <Container>
      {isGm ? (
        <Navigator
          $active={gmMode}
          onClick={() => setGmMode(!gmMode)} // Toggle gmMode when clicked
          title={"GM Mode"}
        >
          <FontAwesomeIcon icon={faHatWizard} />
        </Navigator>
      ) : null}

      <Navigator
        $active={browserState === 0}
        onClick={() => handleNavigationClick(1)}
        title={"Game Browser"}
      >
        <FontAwesomeIcon icon={faBook} />
      </Navigator>
    </Container>
  );
}

export default CharacterNavigation;
