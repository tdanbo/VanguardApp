import styled from "styled-components";
import ActiveBox from "./ActiveBox";

import { ActiveKey } from "../Types";

const Container = styled.div`
  display: flex;
  flex: 2;
  flex-direction: row;
  gap: 10px;
`;

function CorruptionControls() {
  return (
    <Container>
      <ActiveBox active_name={"attack" as ActiveKey} />
      <ActiveBox active_name={"defense" as ActiveKey} />
      <ActiveBox active_name={"casting" as ActiveKey} />
      <ActiveBox active_name={"sneaking" as ActiveKey} />
    </Container>
  );
}

export default CorruptionControls;
