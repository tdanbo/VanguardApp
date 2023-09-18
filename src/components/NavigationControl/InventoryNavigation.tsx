import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlask, faCoins, faShield } from "@fortawesome/free-solid-svg-icons";
import * as Constants from "../../Constants";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Navigator = styled.div`
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

function InventoryNavigation() {
  return (
    <Container>
      <Navigator>
        <FontAwesomeIcon icon={faShield} />
      </Navigator>
      <Navigator>
        <FontAwesomeIcon icon={faCoins} />
      </Navigator>
      <Navigator>
        <FontAwesomeIcon icon={faFlask} />
      </Navigator>
    </Container>
  );
}

export default InventoryNavigation;
