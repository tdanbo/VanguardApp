import styled from "styled-components";
import SelectorComponent from "../SelectorPage/Selector";
import { SessionEntry } from "../../Types";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
`;

interface NavigationProps {
  gmMode: boolean;
  setGmMode: React.Dispatch<React.SetStateAction<boolean>>;
  setSession: React.Dispatch<React.SetStateAction<SessionEntry>>;
}

function SelectorNavigation({ setGmMode, setSession }: NavigationProps) {
  return (
    <Container>
      <SelectorComponent setGmMode={setGmMode} setSession={setSession} />
    </Container>
  );
}

export default SelectorNavigation;
