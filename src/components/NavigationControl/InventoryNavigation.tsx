import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faBolt } from "@fortawesome/free-solid-svg-icons";
import * as Constants from "../../Constants";
import RestBox from "../RestBox";
import OverburdenBox from "../OverburdenBox";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-grow: 1;
`;

interface NavigatorProps {
  $active: boolean;
}

const Navigator = styled.button<NavigatorProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: ${(props) =>
    props.$active ? `1px solid ${Constants.WIDGET_BORDER}` : `0px solid white`};
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

const Spacer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  flex: 1;
`;

interface NavigationProps {
  inventoryState: number;
  setInventoryState: (browserState: number) => void;
}

function InventoryNavigation({
  inventoryState,
  setInventoryState,
}: NavigationProps) {
  const onHandleItems = () => {
    if (inventoryState === 1) {
      setInventoryState(2);
    } else setInventoryState(1);
  };

  return (
    <Container>
      {inventoryState === 1 ? (
        <Navigator $active={inventoryState === 1} onClick={onHandleItems}>
          <FontAwesomeIcon icon={faBriefcase} />
        </Navigator>
      ) : (
        <Navigator $active={inventoryState === 2} onClick={onHandleItems}>
          <FontAwesomeIcon icon={faBolt} />
        </Navigator>
      )}
      <OverburdenBox />
      <Spacer />
      <RestBox />
    </Container>
  );
}

export default InventoryNavigation;
