import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faUser } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import * as Constants from "../../../Constants";
import { CharacterEntry } from "../../../Types";
import { deleteSessionCharacter } from "../../../functions/SessionsFunctions";
import { useContext } from "react";
import { SessionContext } from "../../../contexts/SessionContext";
import { useWebSocket } from "../../../contexts/WebSocketContext";

interface CharacterSimpleBoxProps {
  character: CharacterEntry;
  setCharacterLog: React.Dispatch<React.SetStateAction<CharacterEntry[]>>;
}

const BoxContainer = styled.div`
  display: flex;
  padding: 0.25rem;
  border-radius: 0.375rem;
  background-color: ${Constants.WIDGET_BACKGROUND};
`;

const FlexCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  color: ${Constants.WIDGET_PRIMARY_FONT};
`;

const FlexGrowSection = styled.div`
  display: flex;
  flex-grow: 1;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  color: ${Constants.WIDGET_PRIMARY_FONT};
`;

const RedFlexCenter = styled(FlexCenter)`
  color: ${Constants.BRIGHT_RED};
`;

function CharacterSimpleBox({
  character,
  setCharacterLog,
}: CharacterSimpleBoxProps) {
  const { session } = useContext(SessionContext);
  const { sendRequest } = useWebSocket();

  const onHandleDeleteCharacter = async () => {
    await deleteSessionCharacter(character.details.name, session.id);
    sendRequest("characters");
  };

  return (
    <BoxContainer>
      <FlexCenter>
        <FontAwesomeIcon icon={faUser} />
      </FlexCenter>
      <FlexGrowSection>{character.details.name}</FlexGrowSection>
      <RedFlexCenter>
        <FontAwesomeIcon icon={faXmark} onClick={onHandleDeleteCharacter} />
      </RedFlexCenter>
    </BoxContainer>
  );
}

export default CharacterSimpleBox;
