import * as Constants from "../Constants";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSkull } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
interface CorruptionProps {
  state: number;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${Constants.PRIMARY_MEDIUM};
  border: 1px solid ${Constants.BORDER_DARK};
  flex-grow: 1;
`;

function CorruptionToken({ state }: CorruptionProps) {
  const BackgroundColor = () => {
    if (state === 1) {
      return Constants.BORDER_DARK;
    } else if (state === 2) {
      return Constants.DARK;
    } else {
      return Constants.PRIMARY_MEDIUM; // This is the base color for the corruption box
    }
  };

  return (
    <Container>
      <FontAwesomeIcon icon={faSkull} />
    </Container>
  );
}

export default CorruptionToken;
