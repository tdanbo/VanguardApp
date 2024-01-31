import styled from "styled-components";
import * as Constants from "../Constants";
import { CharacterPortraits } from "../Images";
import { CharacterEntry } from "../Types";

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

const NameBox = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  color: ${Constants.BLUE};
  text-shadow: 2px 2px 2px ${Constants.BACKGROUND};
`;

interface EncounterBoxProps {
  character: CharacterEntry;
}

function EncounterCharacterEntry({ character }: EncounterBoxProps) {
  return (
    <Container src={CharacterPortraits[character.portrait]}>
      <ColorBlock $rgb={Constants.BLUE} />
      <NameBox title={`Initiative: ${character.details.initiative}`}>
        {character.name}
      </NameBox>
    </Container>
  );
}

export default EncounterCharacterEntry;
