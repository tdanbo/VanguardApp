import * as Constants from "../Constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSkull } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

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
  if (state === "empty") {
    return (
      <Container
        backgroundColor={Constants.WIDGET_BACKGROUND_EMPTY}
      ></Container>
    );
  } else {
    return (
      <Container backgroundColor={Constants.TYPE_COLORS["casting"]}></Container>
    );
  }
}

export default CorruptionToken;
