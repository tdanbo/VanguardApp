import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import * as Constants from "../../Constants";

interface NavigationProps {
  icon: any;
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
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
`;

function EquipmentNavigator({ icon }: NavigationProps) {
  return (
    <Container>
      <FontAwesomeIcon icon={icon} />
    </Container>
  );
}

export default EquipmentNavigator;
