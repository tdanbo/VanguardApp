import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShield, faBolt, faGhost } from "@fortawesome/free-solid-svg-icons";
import * as Constants from "../../Constants";
import SelectorComponent from "../SelectorPage/Selector";
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
}

function CharacterNavigation({
  browserState,
  setBrowserState,
  gmMode,
  setGmMode,
}: NavigationProps) {
  const onHandleItems = () => {
    if (browserState === 0 || browserState === 2) {
      setBrowserState(1);
    } else {
      setBrowserState(0);
    }
  };

  const onHandleAbilities = () => {
    if (browserState === 0 || browserState === 1) {
      setBrowserState(2);
    } else {
      setBrowserState(0);
    }
  };

  const onHandleCreatures = () => {
    if (browserState === 0 || browserState === 1 || browserState === 2) {
      setBrowserState(3);
    } else {
      setBrowserState(0);
    }
  };

  return (
    <Container>
      <SelectorComponent setGmMode={setGmMode} />
      <Navigator $active={browserState === 1} onClick={onHandleItems}>
        <FontAwesomeIcon icon={faShield} />
      </Navigator>
      <Navigator $active={browserState === 2} onClick={onHandleAbilities}>
        <FontAwesomeIcon icon={faBolt} />
      </Navigator>
      {gmMode && (
        <Navigator $active={browserState === 3} onClick={onHandleCreatures}>
          <FontAwesomeIcon icon={faGhost} />
        </Navigator>
      )}
    </Container>
  );
}

export default CharacterNavigation;
