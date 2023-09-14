import styled from "styled-components";

interface NavigationProps {
  navigation: string;
}

const Container = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`;

const NameBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  background-color: rgb(189, 50, 187);
  &:hover {
    background-color: rgb(255, 0, 170);
  }
`;

const OnHoverBox = styled.div`
  display: flex;
  flex-direction: row;
  height: 10px;
  background-color: rgb(150, 90, 187);
`;

function Navigator({ navigation }: NavigationProps) {
  return (
    <Container>
      <NameBox>{navigation}</NameBox>
      <OnHoverBox></OnHoverBox>
    </Container>
  );
}

export default Navigator;
