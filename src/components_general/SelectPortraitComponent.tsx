import {
  MainContainer,
  ModalContainer,
  Title,
  Divider,
  ControlButton,
  ButtonContainer,
} from "./SelectorStyles";

import styled from "styled-components";
import * as Constants from "../Constants";
import { CharacterImages } from "../Images";
interface LoginProps {
  setSelector: (selector: string) => void;
  setCharacterPortrait: (portrait: string) => void;
}

interface ImageProp {
  src: string;
}

const ImageContainer = styled.div<ImageProp>`
  display: flex;
  flex-grow: 1;
  flex: 1;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  min-height: 150px;
  border: 2px solid ${Constants.WIDGET_BORDER};
  border-radius: ${Constants.BORDER_RADIUS};
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px; // Space between items
  padding: 20px;
`;

function SelectPortraitComponent({
  setSelector,
  setCharacterPortrait,
}: LoginProps) {
  const character_images = CharacterImages();

  const handleImageSelect = (src: string) => () => {
    setCharacterPortrait(src);
    setSelector("createCharacter");
  };

  return (
    <MainContainer>
      <Title>Select Portrait</Title>
      <ModalContainer>
        <GridContainer>
          {Object.entries(character_images).map(
            ([key, src]: [string, string], index: number) => (
              <ImageContainer
                key={index}
                onClick={handleImageSelect(key)}
                src={src}
              ></ImageContainer>
            ),
          )}
        </GridContainer>
        <Divider />
      </ModalContainer>
      <ButtonContainer>
        <ControlButton onClick={() => setSelector("createCharacter")}>
          Back
        </ControlButton>
      </ButtonContainer>
    </MainContainer>
  );
}

export default SelectPortraitComponent;
