import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

interface NavigationProps {
  icon: any;
}

const Container = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;
  background-color: rgb(189, 50, 187);
  &:hover {
    background-color: rgb(255, 0, 170);
  }
  width: 50px;
  height: 50px;
`;

function AbilitiesNavigator({ icon }: NavigationProps) {
  return (
    <Container>
      <FontAwesomeIcon icon={icon} />
    </Container>
  );
}

export default AbilitiesNavigator;
