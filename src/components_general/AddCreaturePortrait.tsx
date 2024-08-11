import * as Constants from "../Constants";
import styled from "styled-components";
import { useState } from "react";
import { CharacterImages } from "../Images";
import {
  MainContainer,
  ModalContainer,
  Title,
  Divider,
  ButtonContainer,
} from "./SelectorStyles";

interface PortraitProps {
  src: string;
}

import { ControlButton } from "./SelectorStyles";

const PortraitSelect = styled.button<PortraitProps>`
  display: flex;
  flex-grow: 1;
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  border-radius: ${Constants.BORDER_RADIUS};
  color: ${Constants.WIDGET_BORDER};
  background-image: ${(props) => `url(${props.src})`};
  background-size: cover;
  background-position: center 40%;
  border: 0px solid ${Constants.WIDGET_BORDER};
  height: 250px;
  font-size: 60px;
  min-height: 250px;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;

  display: flex;
  align-items: center;
  justify-content: center;
`;

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

interface AddPortraitProps {
  characterPortrait: string;
  setCharacterPortrait: (portrait: string) => void;
}

function AddCreaturePortrait({
  characterPortrait,
  setCharacterPortrait,
}: AddPortraitProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleImageSelect = (src: string) => () => {
    setCharacterPortrait(src);
    setIsModalOpen(false);
  };

  return (
    <>
      <PortraitSelect
        onClick={handleOpen}
        src={CharacterImages(characterPortrait)}
      >
        +
      </PortraitSelect>
      {isModalOpen && (
        <Overlay onClick={handleClose}>
          <MainContainer onClick={stopPropagation}>
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
              <ControlButton onClick={() => handleClose}>Back</ControlButton>
            </ButtonContainer>
          </MainContainer>
        </Overlay>
      )}
    </>
  );
}
export default AddCreaturePortrait;
