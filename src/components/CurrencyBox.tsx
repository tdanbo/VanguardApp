import * as Constants from "../Constants";
import styled from "styled-components";

import { useContext } from "react";
import { CharacterContext } from "../contexts/CharacterContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "@mui/material";

const Container = styled.div`
  display: flex;
  flex-grow: 1;
  border-radius: 100px;
  height: 35px;
  gap: 20px;
  justify-content: right;
`;

const RationContainer = styled.div`
  display: flex;
  flex: 1;
  flex-grow: 1;
  border-radius: 100px;
  justify-content: center;
  align-items: center;
  font-size: 1.25em;
  font-weight: bold;
  background-color: ${Constants.WIDGET_BACKGROUND};
  border: 1px solid ${Constants.WIDGET_BORDER};
  color: ${Constants.WIDGET_PRIMARY_FONT};
  max-width: 100px;
`;

const IconTContainer = styled.div`
  display: flex;
  margin-left: 5px;
  font-size: 25px;
  color: rgba(180, 156, 40, 1);
`;

const IconSContainer = styled.div`
  display: flex;
  margin-left: 5px;
  font-size: 25px;
  color: rgba(140, 140, 140, 1);
`;

const IconOContainer = styled.div`
  display: flex;
  margin-left: 5px;
  font-size: 25px;
  color: rgba(90, 46, 0, 1);
`;

const TextContainer = styled.div`
  display: flex;
  flex: 1;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  font-size: 16px;
`;

// const Container = styled.div`
//   display: flex;
//   flex-grow: 1;
//   border-radius: 100px;
//   height: 35px;
//   gap: 20px;
//   justify-content: left;
// `;

// const RationContainer = styled.div`
//   display: flex;
//   flex: 1;
//   flex-grow: 1;
//   border-radius: 100px;
//   justify-content: center;
//   align-items: center;
//   font-size: 1.25em;
//   font-weight: bold;
//   background-color: ${Constants.WIDGET_BACKGROUND};
//   border: 1px solid ${Constants.WIDGET_BORDER};
//   color: ${Constants.WIDGET_PRIMARY_FONT};
//   max-width: 100px;
// `;

// const IconContainer = styled.div`
// display: flex;
// flex: 1;
// flex-grow: 1;
// margin-left: 12px;
// font-size: 20px;
// `;

// const TextContainer = styled.div`
// display: flex;
// flex: 1;
// flex-grow: 1;
// justify-content: left;
// align-items: center;
// font-size: 15px;
// `;

function CurrencyBox() {
  const { character } = useContext(CharacterContext);

  const used_slots = character.inventory.length;
  const max_slots = character.stats.strong.value;

  return (
    <Container>
      <RationContainer>
        <IconTContainer>
          <FontAwesomeIcon icon={faCircle} />
        </IconTContainer>
        <TextContainer>100</TextContainer>
      </RationContainer>
      <RationContainer>
        <IconSContainer>
          <FontAwesomeIcon icon={faCircle} />
        </IconSContainer>
        <TextContainer>50</TextContainer>
      </RationContainer>
      <RationContainer>
        <IconOContainer>
          <FontAwesomeIcon icon={faCircle} />
        </IconOContainer>
        <TextContainer>35</TextContainer>
      </RationContainer>
    </Container>
  );
}
export default CurrencyBox;
