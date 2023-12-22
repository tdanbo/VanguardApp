import CharacterBox from "../components/Entries/CharacterBox";
import { Socket } from "socket.io-client";
import { SessionEntry } from "../Types";
import * as Constants from "../Constants";
import styled from "styled-components";
import CreateCharacterComponent from "../components/SelectorPage/CreateCharacterComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faWifi } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import BackgroundImage from "../assets/icons/background.jpeg";
type DivProps = {
  width: string;
};
interface ContainerProps {
  height: string;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  gap: ${Constants.WIDGET_GAB};
  height: ${(props) => props.height};
`;

const Row = styled.div<DivProps>`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  flex-basis: 0;
  gap: ${Constants.WIDGET_GAB};
  max-width: ${(props) => props.width};
`;

const Column = styled.div<DivProps>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-basis: 0;
  gap: ${Constants.WIDGET_GAB};
  max-width: ${(props) => props.width};
`;

const OverlayStyles = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(rgba(7, 9, 11, 0.95), rgba(7, 9, 11, 0.95)),
    url(${BackgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AddButton = styled.button`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  max-height: 35px;
  border-radius: ${Constants.BORDER_RADIUS};
  border: 1px solid ${Constants.WIDGET_BORDER};
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: ${Constants.WIDGET_SECONDARY_FONT};
  padding-right: 50px;
`;

const WebsocketStatus = styled.button`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  max-height: 35px;
  border-radius: ${Constants.BORDER_RADIUS};
  border: 1px solid ${Constants.WIDGET_BORDER};
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: ${Constants.WIDGET_SECONDARY_FONT};
  width: 40px;
  max-width: 40px;
  height: 40px;
`;

interface PartySectionProps {
  session: SessionEntry;
  websocket: Socket;
  setCharacterName: React.Dispatch<React.SetStateAction<string>>;
  setIsCreature: React.Dispatch<React.SetStateAction<boolean>>;
  isCreature: boolean;
  isConnected: boolean;
}

function PartySection({
  session,
  websocket,
  setCharacterName,
  setIsCreature,
  isCreature,
  isConnected,
}: PartySectionProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [_addAdjust, setAddAdjust] = useState(0);

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Container height="3%">
        <Row width="100%">
          {isModalOpen ? (
            <OverlayStyles>
              <CreateCharacterComponent
                setCharacterName={setCharacterName}
                characterName={""}
                characterRace={"Ambrian"}
                closeModal={handleClose}
                session={session}
                websocket={websocket}
                source={"characterSelect"}
                isCreature={isCreature}
                setAddAdjust={setAddAdjust}
              />
            </OverlayStyles>
          ) : (
            <>
              <WebsocketStatus>
                {isConnected ? (
                  <FontAwesomeIcon
                    icon={faWifi}
                    color={Constants.BRIGHT_GREEN}
                    title={"Connected"}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faWifi}
                    color={Constants.BRIGHT_RED}
                    title={"Disconnected"}
                  />
                )}
              </WebsocketStatus>
              <AddButton onClick={handleOpen}>
                <FontAwesomeIcon icon={faPlus} />
              </AddButton>
            </>
          )}
        </Row>
      </Container>
      <Container height="20%">
        <Column width="100%">
          {session.characters.map((entry, index) => {
            return (
              <CharacterBox
                key={index}
                character={entry}
                setCharacterName={setCharacterName}
                session={session}
                websocket={websocket}
                setIsCreature={setIsCreature}
                isCreature={false}
              />
            );
          })}
        </Column>
      </Container>
    </>
  );
}

export default PartySection;
