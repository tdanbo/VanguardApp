import {
  faAngleLeft,
  faCheck,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";
import * as Constants from "../Constants";
import { CharacterEntry, SessionEntry } from "../Types";
import { update_session } from "../functions/SessionsFunctions";
import AddCreaturePortrait from "../components_general/AddCreaturePortrait";
import { v4 as uuid } from "uuid";

import {
  ButtonContainer,
  CenterContainer,
  Divider,
  LargeCircleButton,
  MainContainer,
  ModalContainer,
  Title,
} from "../components_general/SelectorStyles";

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

import { Socket } from "socket.io-client";

interface AddMemberProps {
  character_template: CharacterEntry;
  character: CharacterEntry;
  session: SessionEntry;
  websocket: Socket;
}

function AddCreatureToRoster({
  character_template,
  session,
  websocket,
}: AddMemberProps) {
  const [member, setMember] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [characterPortrait, setCharacterPortrait] = useState<string>(
    character_template.details.race,
  );
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
    character_template.name = member;
    character_template.portrait = characterPortrait;
    character_template.id = uuid();
    session.characters.push(character_template);
    update_session(session, websocket, character_template, false);
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
                  <AddCreaturePortrait
                    characterPortrait={characterPortrait}
                    setCharacterPortrait={setCharacterPortrait}
                  />
                </ResourceChangeContainer>

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
