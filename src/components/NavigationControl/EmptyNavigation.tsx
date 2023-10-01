import styled from "styled-components";
import * as Constants from "../../Constants";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Navigator = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  background-color: ${Constants.BACKGROUND};
  border: none;
  width: 50px;
  height: 50px;
`;

function EmptyNavigation() {
  return (
    <Container>
      <Navigator />
    </Container>
  );
}

export default EmptyNavigation;
