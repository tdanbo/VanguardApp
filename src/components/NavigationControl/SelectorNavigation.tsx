import styled from "styled-components";
import SelectorComponent from "../SelectorPage/Selector";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
`;

interface NavigationProps {
  gmMode: boolean;
  setGmMode: React.Dispatch<React.SetStateAction<boolean>>;
}

function SelectorNavigation({ gmMode, setGmMode }: NavigationProps) {
  return (
    <Container>
      <SelectorComponent setGmMode={setGmMode} />
    </Container>
  );
}

export default SelectorNavigation;
