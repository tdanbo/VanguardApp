import styled from "styled-components";
import * as Constants from "../../Constants";

const Container = styled.div<{ hidden: boolean }>`
  display: ${(props) => (props.hidden ? "none" : "flex")};
  flex-direction: column;
  flex-grow: 1;
  gap: 10px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const ButtonStyle = styled.div`
  display: flex;
  flex-grow: 1;
  background-color: ${Constants.WIDGET_BACKGROUND};
  color: ${Constants.WIDGET_SECONDARY_FONT};
  border: 1px solid ${Constants.WIDGET_BORDER};
  border-radius: ${Constants.BORDER_RADIUS};
  align-items: center;
  justify-content: center;
  height: 50px;
`;

interface GenerateEncounterProps {
  browserState: number;
}

function GenerateEncounter({ browserState }: GenerateEncounterProps) {
  return (
    <Container hidden={browserState !== 4}>
      <Row>
        <ButtonStyle>Weak</ButtonStyle>
        <ButtonStyle>Ordinary</ButtonStyle>
        <ButtonStyle>Strong</ButtonStyle>
        <ButtonStyle>Challenging</ButtonStyle>
        <ButtonStyle>Mighty</ButtonStyle>
      </Row>
      <Row>
        <ButtonStyle>Elf</ButtonStyle>
        <ButtonStyle>Elf</ButtonStyle>
        <ButtonStyle>Elf</ButtonStyle>
        <ButtonStyle>Elf</ButtonStyle>
        <ButtonStyle>Elf</ButtonStyle>
      </Row>
      <Row>
        <ButtonStyle>Rogue</ButtonStyle>
        <ButtonStyle>Warrior</ButtonStyle>
        <ButtonStyle>Brute</ButtonStyle>
        <ButtonStyle>War Mage</ButtonStyle>
        <ButtonStyle>Mage</ButtonStyle>
      </Row>
    </Container>
  );
}

export default GenerateEncounter;
