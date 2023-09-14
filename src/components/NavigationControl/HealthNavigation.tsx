import styled from "styled-components";
import Navigator from "./Navigator";
import EquipmentNavigator from "../NavigationControl/Equipment";
import AbilitiesNavigator from "../NavigationControl/Abilities";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { faBolt } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-grow: 1;
`;

function HealthNavigation() {
  return (
    <Container>
      <EquipmentNavigator icon={faBriefcase} />
      <AbilitiesNavigator icon={faBolt} />
    </Container>
  );
}

export default HealthNavigation;
