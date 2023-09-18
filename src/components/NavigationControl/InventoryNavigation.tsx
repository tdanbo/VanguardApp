import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBriefcase, faBolt } from "@fortawesome/free-solid-svg-icons";
import * as Constants from "../../Constants";

const Container = styled.div`
  display: flex;
  flex-direction: column;
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
  inventoryState: number;
  setInventoryState: (browserState: number) => void;
}

function InventoryNavigation({
  inventoryState,
  setInventoryState,
}: NavigationProps) {
  const onHandleItems = () => {
    if (inventoryState === 0) {
      setInventoryState(1);
    } else if (inventoryState === 2) {
      setInventoryState(1);
    } else {
      setInventoryState(0);
    }
  };

  const onHandleAbilities = () => {
    if (inventoryState === 0) {
      setInventoryState(2);
    } else if (inventoryState === 1) {
      setInventoryState(2);
    } else {
      setInventoryState(0);
    }
  };

  return (
    <Container>
      <Navigator onClick={onHandleItems}>
        <FontAwesomeIcon icon={faBriefcase} />
      </Navigator>
      <Navigator onClick={onHandleAbilities}>
        <FontAwesomeIcon icon={faBolt} />
      </Navigator>
    </Container>
  );
}

export default InventoryNavigation;
