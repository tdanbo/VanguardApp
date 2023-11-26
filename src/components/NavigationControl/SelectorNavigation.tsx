import styled from "styled-components";
import SelectorComponent from "../SelectorPage/Selector";
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
}

function SelectorNavigation({ setGmMode }: NavigationProps) {
  return (
    <Container>
      <SelectorComponent setGmMode={setGmMode} />
    </Container>
  );
}

export default SelectorNavigation;
