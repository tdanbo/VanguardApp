import styled from "styled-components";
import Navigator from "./Navigator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlask, faCoins, faShield } from "@fortawesome/free-solid-svg-icons";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

function InventoryNavigation() {
  return (
    <Container>
      <Navigator icon={faShield} />
      <Navigator icon={faCoins} />
      <Navigator icon={faFlask} />
    </Container>
  );
}

export default InventoryNavigation;
