import * as Constants from "../../Constants";
import styled from "styled-components";
import { CharacterEntry } from "../../Types";
import { CharacterContext } from "../../contexts/CharacterContext";
import { useContext } from "react";
import { CharacterPortraits } from "../../Images";
// import { deleteSessionCharacter } from "../../functions/SessionsFunctions";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrash } from "@fortawesome/free-solid-svg-icons";
// import { getCharacters } from "../../functions/SessionsFunctions";
// import { SessionContext } from "../../contexts/SessionContext";
// import { useWebSocket } from "../../contexts/WebSocketContext";
interface SessionBoxProps {
  setSelector: (selector: string) => void;
  selectedCharacter: CharacterEntry;
  closeModal: () => void;
  setGmMode: React.Dispatch<React.SetStateAction<boolean>>;
  setCharacterLog: React.Dispatch<React.SetStateAction<CharacterEntry[]>>;
}

const Container = styled.div`
  display: flex;
  height: 50px;
  min-height: 100px;
  width: 100%;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  cursor: pointer;
  border: 1px solid ${Constants.WIDGET_BORDER};
`;

// const RightControl = styled.div`
//   display: flex;
//   flex-direction: column;
//   flex-grow: 1;
//   background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
//   width: 20px;
//   max-width: 20px;
//   border-left: 1px solid ${Constants.WIDGET_BORDER};
//   border-radius: 0px ${Constants.BORDER_RADIUS} ${Constants.BORDER_RADIUS} 0px;
//   height: 100%;
//   align-items: center;
//   justify-content: center;
//   color: ${Constants.WIDGET_SECONDARY_FONT};
// `;

interface PortraitCenterProps {
  src: string;
}

const PortraitCenter = styled.div<PortraitCenterProps>`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${Constants.WIDGET_PRIMARY_FONT};
  background: linear-gradient(
      rgba(${Constants.COMBAT_BACKGROUND}, 0.925),
      rgba(${Constants.COMBAT_BACKGROUND}, 0.925)
    ),
    url(${(props) => props.src});
  background-size: cover;
  background-position: center 25%;
  border-radius: ${Constants.BORDER_RADIUS} 0px 0px ${Constants.BORDER_RADIUS};
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

function CharacterBox({
  selectedCharacter,
  closeModal,
  setGmMode,
} // setCharacterLog,
: SessionBoxProps) {
  // const { session } = useContext(SessionContext);
  const { setCharacter } = useContext(CharacterContext);
  const handleOnClick = () => {
    setGmMode(false);
    setCharacter(selectedCharacter);
    closeModal();
  };

  // const handleDeleteCharacter = async () => {
  //   await deleteSessionCharacter(selectedCharacter.name, selectedCharacter.id);
  //   console.log("delete character");
  //   getCharacters(session.id).then((response) => {
  //     setCharacterLog(response);
  //   });
  // };

  return (
    <Container>
      <PortraitCenter
        onClick={handleOnClick}
        src={CharacterPortraits[selectedCharacter.portrait]}
      >
        {selectedCharacter.name}
      </PortraitCenter>
      {/* <RightControl onClick={handleDeleteCharacter}>
        <FontAwesomeIcon icon={faTrash} />
      </RightControl> */}
    </Container>
  );
}

export default CharacterBox;
