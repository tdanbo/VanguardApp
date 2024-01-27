import { CharacterEntry } from "../Types";
import styled from "styled-components";
import * as Constants from "../Constants";
const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  width: 50%;
`;

const LevelIndicater = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  justify-content: center;
  align-items: center;
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  width: 100%;
`;

const LevelIndicater2 = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  width: 100%;
`;

interface LevelComponentProps {
  character: CharacterEntry;
}

function LevelComponent({ character }: LevelComponentProps) {
  return (
    <Container>
      {Array.from({ length: 60 }).map((_, index) => {
        {
          if (index % 2) {
            return <LevelIndicater></LevelIndicater>;
          } else if (index % 5) {
            return <LevelIndicater2>5</LevelIndicater2>;
          } else {
            return <LevelIndicater2>s</LevelIndicater2>;
          }
        }
      })}
    </Container>
  );
}
export default LevelComponent;
