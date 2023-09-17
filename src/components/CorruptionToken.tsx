import * as Constants from "../Constants";
import styled from "styled-components";
import { useContext } from "react";
import {
  onAddCorruption,
  onSubCorruption,
} from "../functions/CharacterFunctions";
import { CharacterContext } from "../contexts/CharacterContext";

interface cssProps {
  backgroundColor: string;
}

const Container = styled.div<cssProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.backgroundColor};
  border: 1px solid ${Constants.WIDGET_BORDER};
  border-radius: ${Constants.BORDER_RADIUS};
  flex-grow: 1;
  background-image: url("/dist/assets/skull-solid.png");
  background-size: 80% auto; /* This enlarges the image */
  background-position: center; /* This centers the enlarged image */
  background-repeat: no-repeat;
`;

interface CorruptionTokenProps {
  state: string;
}

function CorruptionToken({ state }: CorruptionTokenProps) {
  const { character, setCharacter } = useContext(CharacterContext);

  const handleAddCorruption = () => {
    const updated_character = onAddCorruption(character, 1);
    setCharacter(updated_character);
  };

  const handleSubCorruption = () => {
    const updated_character = onSubCorruption(character, 1);
    setCharacter(updated_character);
  };

  if (state === "empty") {
    return (
      <Container
        onClick={handleSubCorruption}
        onContextMenu={(e) => {
          e.preventDefault();
          handleAddCorruption();
        }}
        backgroundColor={Constants.WIDGET_BACKGROUND_EMPTY}
      ></Container>
    );
  } else {
    return (
      <Container
        onClick={handleSubCorruption}
        onContextMenu={(e) => {
          e.preventDefault();
          handleAddCorruption();
        }}
        backgroundColor={Constants.TYPE_COLORS["casting"]}
      ></Container>
    );
  }
}

export default CorruptionToken;
