import CharacterBox from "./CharacterBox";
import { Socket } from "socket.io-client";
import { SessionEntry, NewCharacterEntry } from "../Types";
import * as Constants from "../Constants";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { get_session } from "../functions/SessionsFunctions";
import {
  faHatWizard,
  faPlus,
  faRightToBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { update_session } from "../functions/SessionsFunctions";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
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

const SessionInput = styled.input`
  display: flex;
  flex-grow: 1;
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  border: 1px solid ${Constants.WIDGET_BORDER};
  border-radius: ${Constants.BORDER_RADIUS};
  color: ${Constants.WIDGET_SECONDARY_FONT};
  font-weight: bold;
  text-align: center;
`;

interface PartySectionProps {
  session: SessionEntry;
  websocket: Socket;
  setCharacterId: React.Dispatch<React.SetStateAction<string>>;
  setIsCreature: React.Dispatch<React.SetStateAction<boolean>>;
  isCreature: boolean;
  isGm: boolean;
  gmMode: boolean;
  setGmMode: React.Dispatch<React.SetStateAction<boolean>>;
  setSession: React.Dispatch<React.SetStateAction<SessionEntry>>;
  setIsGm: React.Dispatch<React.SetStateAction<boolean>>;
}

function PartySection({
  session,
  websocket,
  setCharacterId,
  setIsCreature,
  isCreature,
  isGm,
  setIsGm,
  setSession,
}: PartySectionProps) {
  const [isJoined, setIsJoined] = useState(false);
  const [sessionName, setSessionName] = useState("0nPFPbvRss"); // Default session name "0nPFPbvRss

  const handlePostCharacter = async () => {
    NewCharacterEntry.name = "Player Character";
    NewCharacterEntry.id = uuidv4();
    session.characters.push(NewCharacterEntry);
    await update_session(session, websocket, NewCharacterEntry, isCreature);
    setCharacterId(NewCharacterEntry.id);
  };

  const handleJoinSession = () => {
    get_session(sessionName).then((res) => {
      if (res) {
        setSession(res);
        setIsJoined(true);
      } else {
        console.log("Session not found");
      }
    });
  };

  // const HandleLeaveSession = () => {
  //   setSession(EmptySession);
  //   setCharacterName("");
  //   setIsJoined(false);
  // };

  const onSessionNameChange = (e: any) => {
    setSessionName(e.target.value);
  };

  const onGmSwitch = () => {
    setIsGm((prevMode) => !prevMode);
  };

  return (
    <>
      <Container height="40px">
        <Row width="100%">
          {isJoined ? (
            <AddButton onClick={handlePostCharacter}>
              <FontAwesomeIcon icon={faPlus} />
            </AddButton>
          ) : (
            <SessionInput
              placeholder="Session ID"
              value={sessionName}
              onChange={onSessionNameChange}
            ></SessionInput>
          )}
          {isJoined ? (
            <Navigator onClick={onGmSwitch}>
              {isGm ? (
                <FontAwesomeIcon
                  icon={faHatWizard}
                  color={Constants.WIDGET_SECONDARY_FONT}
                  title={"Player Mode"}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faUser}
                  color={Constants.WIDGET_SECONDARY_FONT}
                  title={"Game Master Mode"}
                />
              )}
            </Navigator>
          ) : (
            <Navigator onClick={handleJoinSession}>
              <FontAwesomeIcon
                icon={faRightToBracket}
                color={Constants.WIDGET_SECONDARY_FONT}
                title={"Disconnected"}
              />
            </Navigator>
          )}
        </Row>
      </Container>
      <Container height="260px">
        <Column width="100%">
          {session.characters.map((entry, index) => {
            return (
              <CharacterBox
                key={index}
                character={entry}
                session={session}
                websocket={websocket}
                setIsCreature={setIsCreature}
                isCreature={false}
                setCharacterId={setCharacterId}
              />
            );
          })}
        </Column>
      </Container>
    </>
  );
}

export default PartySection;
