import styled from "styled-components";
import * as Constants from "../Constants";
import { CharacterPortraits } from "../Images";
import { CharacterEntry, SessionEntry } from "../Types";

interface PortraitProps {
  src: string;
}

const Container = styled.div<PortraitProps>`
  display: flex;
  flex: 1;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center 40%;
  border-radius: ${Constants.BORDER_RADIUS};
  border: 1px solid ${Constants.WIDGET_BORDER};
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
`;

// background-image: url("/dist/assets/portrait1.jpeg");

const InnerContainer = styled.div`
  display: flex;
  flex: 2;
  flex-direction: row;
  justiy-content: end;
  align-items: end;
  gap: 10px;
  margin: 10px;
`;

interface HealthBoxProps {
  character: CharacterEntry;
}

function PortraitComponent({ character }: HealthBoxProps) {
  return (
    <Container src={CharacterPortraits[character.portrait]}>
      <InnerContainer></InnerContainer>
    </Container>
  );
}

export default PortraitComponent;
