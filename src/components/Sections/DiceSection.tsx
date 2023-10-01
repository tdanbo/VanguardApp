import DiceBox from "../DiceBox";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  justify-content: flex-end;
  gap: 10px;
  width: 100%;
`;

function DiceSection() {
  return (
    <Container>
      <DiceBox type_name={4} />
      <DiceBox type_name={6} />
      <DiceBox type_name={8} />
      <DiceBox type_name={10} />
      <DiceBox type_name={12} />
      <DiceBox type_name={20} />
      <DiceBox type_name={100} />
    </Container>
  );
}

export default DiceSection;
