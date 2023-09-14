import styled from "styled-components";

interface NavigationProps {
  navigation: string;
}

const Container = styled.div`
  display: flex;
  flex-grow: 1;
  fkex-direction: column;
  background-color: coral;
  justify-content: center;
  align-items: center;
  background-color: rgb(189, 188, 187);
`;

function Navigator({ navigation }: NavigationProps) {
  return <Container>{navigation}</Container>;
}

export default Navigator;
