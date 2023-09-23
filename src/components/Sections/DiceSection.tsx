import DiceBox from "../DiceBox";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;

  justify-content: flex-end;
  max-width: 50%;
  gap: 10px;
`;

function DiceSection() {
  return (
    <Container>
      <DiceBox type_name={"d4"} type_value={2} />
      <DiceBox type_name={"d6"} type_value={2} />
      <DiceBox type_name={"d8"} type_value={1} />
      <DiceBox type_name={"d10"} type_value={2} />
      <DiceBox type_name={"d12"} type_value={1} />
      <DiceBox type_name={"d20"} type_value={3} />
      <DiceBox type_name={"d100"} type_value={3} />
    </Container>
  );
}

export default DiceSection;
