import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

interface NavigationProps {
  icon: any;
}

const Container = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  background-color: rgb(189, 50, 187);
  &:hover {
    background-color: rgb(255, 0, 170);
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
