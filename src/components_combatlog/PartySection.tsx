import CharacterBox from "./CharacterBox";
import { Socket } from "socket.io-client";
import { SessionEntry, CharacterEntry } from "../Types";
import * as Constants from "../Constants";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHatWizard,
  faPlus,
  faUser,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import BackgroundImage from "../assets/icons/background.jpeg";
import { update_session } from "../functions/SessionsFunctions";
import { v4 as uuidv4 } from "uuid";
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
  max-height: ${(props) => props.height};
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

const AddButton = styled.button`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  border-radius: ${Constants.BORDER_RADIUS};
  border: 1px solid ${Constants.WIDGET_BORDER};
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: ${Constants.WIDGET_SECONDARY_FONT};
  padding-left: 50px;
`;

const WebsocketStatus = styled.button`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
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

const Navigator = styled.button`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
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
  isGm: boolean;
  gmMode: boolean;
  setGmMode: React.Dispatch<React.SetStateAction<boolean>>;
}

function PartySection({
  session,
  websocket,
  setCharacterName,
  setIsCreature,
  isCreature,
  isConnected,
  isGm,
  gmMode,
  setGmMode,
}: PartySectionProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [_addAdjust, setAddAdjust] = useState(0);

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const NewCharacterEntry: CharacterEntry = {
    name: "Player Character",
    id: uuidv4(),
    portrait: "Ambrian",
    details: {
      race: "Ambrian",
      movement: 0,
      xp_earned: 50,
      modifier: 0,
      initiative: 0,
    },
    health: {
      damage: 0,
      corruption: 0,
      shield: 0,
    },
    stats: {
      cunning: { value: 15, mod: 0 },
      discreet: { value: 13, mod: 0 },
      persuasive: { value: 11, mod: 0 },
      quick: { value: 10, mod: 0 },
      resolute: { value: 10, mod: 0 },
      strong: { value: 9, mod: 0 },
      vigilant: { value: 7, mod: 0 },
      accurate: { value: 5, mod: 0 },
    },
    abilities: [],
    inventory: [],
    effects: [],
    rations: { food: 0, water: 0 },
    money: 0,
    entry: "CharacterEntry",
  };

  const handlePostCharacter = async () => {
    session.characters.push(NewCharacterEntry);
    update_session(session, websocket, NewCharacterEntry, isCreature);
    setCharacterName(NewCharacterEntry.id);
  };

  return (
    <>
      <Container height="40px">
        <Row width="100%">
          {isGm ? (
            <Navigator
              onClick={() => setGmMode((prevMode) => !prevMode)} // Toggle gmMode when clicked
              title={"GM Mode"}
            >
              <FontAwesomeIcon icon={gmMode ? faHatWizard : faUser} />
            </Navigator>
          ) : null}

          <>
            <AddButton onClick={handlePostCharacter}>
              <FontAwesomeIcon icon={faPlus} />
            </AddButton>
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
          </>
        </Row>
      </Container>
      <Container height="260px">
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
