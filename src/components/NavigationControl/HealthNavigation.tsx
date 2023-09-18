import styled from "styled-components";
import EquipmentNavigator from "../NavigationControl/Equipment";
import AbilitiesNavigator from "../NavigationControl/Abilities";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { faBolt } from "@fortawesome/free-solid-svg-icons";
import * as Constants from "../../Constants";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-grow: 1;
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

function HealthNavigation() {
  return (
    <Container>
      <Navigator>
        <FontAwesomeIcon icon={faBriefcase} />{" "}
      </Navigator>
      <Navigator>
        <FontAwesomeIcon icon={faBolt} />{" "}
      </Navigator>
    </Container>
  );
}

export default HealthNavigation;
