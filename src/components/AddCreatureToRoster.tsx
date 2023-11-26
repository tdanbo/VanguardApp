import * as Constants from "../Constants";
import styled from "styled-components";
import { CharacterEntry } from "../Types";
import { useState, useContext } from "react";
import { CharacterContext } from "../contexts/CharacterContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faAngleLeft,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { addNewRoster } from "../functions/CharacterFunctions";

import {
  MainContainer,
  ModalContainer,
  Title,
  CenterContainer,
  Divider,
  LargeCircleButton,
  ButtonContainer,
} from "./SelectorPage/SelectorStyles";

const Container = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  width: 50px;
  max-width: 50px;
  border-right-top-radius: ${Constants.BORDER_RADIUS};
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: ${Constants.WIDGET_SECONDARY_FONT};
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

const InputContainer = styled.div`
  display: flex;
  height: 50px;
  justify-content: center;
  align-items: stretch; /* Make children stretch to fill the height */
`;

const ValueInput = styled.input`
  flex: 1;
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  border: 1px solid ${Constants.WIDGET_BORDER};
  font-size: 12px;
  color: ${Constants.WIDGET_SECONDARY_FONT};
  text-align: center;
`;

const ResourceChangeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  margin-bottom: 20px;
`;

interface AddMemberProps {
  character_template: CharacterEntry;
}

function AddCreatureToRoster({ character_template }: AddMemberProps) {
  const [member, setMember] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { character, setCharacter } = useContext(CharacterContext);

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleMemberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMember(e.target.value);
  };

  const handleSubmit = async () => {
    const characterClone = { ...character };
    character_template.name = member;
    await addNewRoster(character_template); // Assuming this is an async operation
    setCharacter(characterClone);
    setIsModalOpen(false);
  };

  return (
    <>
      <Container onClick={handleOpen}>
        <FontAwesomeIcon icon={faUsers} />
      </Container>
      {isModalOpen && (
        <Overlay onClick={handleClose}>
          <MainContainer onClick={stopPropagation}>
            <Title>Add Member</Title>
            <ModalContainer>
              <CenterContainer>
                <ResourceChangeContainer>
                  <InputContainer>
                    <ValueInput
                      value={member}
                      onChange={handleMemberChange}
                    ></ValueInput>
                  </InputContainer>
                </ResourceChangeContainer>
              </CenterContainer>
              <Divider />
            </ModalContainer>
            <ButtonContainer>
              <LargeCircleButton onClick={handleClose}>
                <FontAwesomeIcon icon={faAngleLeft} />
              </LargeCircleButton>
              <LargeCircleButton onClick={handleSubmit}>
                <FontAwesomeIcon icon={faCheck} />
              </LargeCircleButton>
            </ButtonContainer>
          </MainContainer>
        </Overlay>
      )}
    </>
  );
}
export default AddCreatureToRoster;
