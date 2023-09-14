import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex: 2;
  flex-direction: row;
  background-color: coral;
`;

function PortraitBox() {
  return <Container></Container>;
}

export default PortraitBox;
