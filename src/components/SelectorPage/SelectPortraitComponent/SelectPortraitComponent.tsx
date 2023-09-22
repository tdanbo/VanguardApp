import {
  MainContainer,
  ModalContainer,
  Title,
  CenterContainer,
  Divider,
} from "../SelectorStyles";

import { useState, useEffect } from "react";
import styled from "styled-components";
import SelectPortraitButtons from "./SelectPortraitButtons";
import * as Constants from "../../../Constants";
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

type ImageModule = {
  default: string;
};

function SelectPortraitComponent({
  setSelector,
  setCharacterPortrait,
}: LoginProps) {
  const [loadedImages, setLoadedImages] = useState<string[]>([]);
  const imageModules = import.meta.glob("../../../assets/characters/*");

  useEffect(() => {
    // Load all images
    const loadAllImages = async () => {
      const allImages: string[] = [];
      for (const path in imageModules) {
        const imageModule = await imageModules[path]();
        // Use a type assertion here
        allImages.push((imageModule as { default: string }).default);
      }
      setLoadedImages(allImages);
    };
    loadAllImages();
  }, []);

  const handleImageSelect = (src: string) => () => {
    console.log(src);
    setCharacterPortrait(src);
    setSelector("createCharacter");
  };

  return (
    <MainContainer>
      <Title>Select Portrait</Title>
      <ModalContainer>
        <Divider />
        <GridContainer>
          {loadedImages.map(
            (src, index) => (
              console.log(src),
              (
                <ImageContainer
                  onClick={handleImageSelect(src)}
                  src={src}
                ></ImageContainer>
              )
            ),
          )}
        </GridContainer>
        <Divider />
      </ModalContainer>
      <SelectPortraitButtons setSelector={setSelector} />
    </MainContainer>
  );
}

export default SelectPortraitComponent;
