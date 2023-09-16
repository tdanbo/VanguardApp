import styled from "styled-components";
import Navigator from "./Navigator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faGear } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

function CharacterNavigation() {
  return (
    <Container>
      <Navigator icon={faUser} />
      <Navigator icon={faGear} />
    </Container>
  );
}

export default CharacterNavigation;
