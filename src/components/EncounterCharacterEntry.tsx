import styled from "styled-components";
import { CharacterEntry } from "../Types";
import * as Constants from "../Constants";
import { CharacterPortraits } from "../Images";

interface ColorTypeProps {
  $rgb: string;
}

interface PortraitProps {
  src: string;
}

const Container = styled.div<PortraitProps>`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  border-radius: ${Constants.BORDER_RADIUS};
  max-height: 100px;
  min-height: 100px;
  color: ${Constants.WIDGET_PRIMARY_FONT};
  background: linear-gradient(
      rgba(${Constants.COMBAT_BACKGROUND}, 0.925),
      rgba(${Constants.COMBAT_BACKGROUND}, 0.925)
    ),
    url(${(props) => props.src});
  background-size: cover;
  background-position: center 25%;
  border: 1px solid ${Constants.WIDGET_BORDER};
`;

const ColorBlock = styled.div<ColorTypeProps>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: ${(props) => props.$rgb};
  width: 20px;
  max-width: 20px;
  margin: 1px 1px 1px 1px;
  border: 1px solid ${Constants.WIDGET_BORDER};
  border-radius: ${Constants.BORDER_RADIUS} 0px 0px ${Constants.BORDER_RADIUS};
`;

const InnnerContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const NameBox = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 200px;
  font-size: 18px;
  font-weight: bold;
  color: ${Constants.WIDGET_PRIMARY_FONT};
`;

interface EncounterBoxProps {
  character: CharacterEntry;
}

function EncounterCharacterEntry({ character }: EncounterBoxProps) {
  return (
    <Container src={CharacterPortraits[character.portrait]}>
      <ColorBlock $rgb={Constants.BLUE} />
      <InnnerContainer></InnnerContainer>
      <NameBox>{character.name}</NameBox>
    </Container>
  );
}

export default EncounterCharacterEntry;
