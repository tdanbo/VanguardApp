import * as Constants from "../Constants";
import styled from "styled-components";
import { GetUsedSlots, GetMaxSlots } from "../functions/CharacterFunctions";
import { CharacterEntry } from "../Types";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
`;

const Divider = styled.div`
  display: flex;
  background-color: rgba(0, 0, 0, 0.25);
  width: 2px;
  height: 16px;
  margin: 5px;
  background-color: ${Constants.WIDGET_BACKGROUND};
`;

// Create a styled component for numbers that can take a color prop
const ColoredNumber = styled.span`
  color: ${(props) => props.color || "inherit"};
`;

interface OverBurdenBoxProps {
  character: CharacterEntry;
}
function OverburdenBox({ character }: OverBurdenBoxProps) {
  const used_slots = GetUsedSlots(character);
  const max_slots = GetMaxSlots(character);

  // Decide on the color based on the comparison
  const numberColor =
    used_slots > max_slots ? "#b55c5c" : Constants.WIDGET_PRIMARY_FONT;

  return (
    <Container>
      <ColoredNumber color={numberColor}>{used_slots}</ColoredNumber>
      <Divider></Divider>
      <ColoredNumber color={numberColor}>{max_slots}</ColoredNumber>
    </Container>
  );
}

export default OverburdenBox;
