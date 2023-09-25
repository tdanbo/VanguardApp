import * as Constants from "../../Constants";
import { useState } from "react";

import { CharacterEntry } from "../../Types";
import JoinComponent from "./JoinComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CreateSessionComponent from "./CreateSessionComponent";
import SelectCharacterComponent from "./SelectCharacterComponent";
import CreateCharacterComponent from "./CreateCharacterComponent";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import SelectPortraitComponent from "./SelectPortraitComponent/SelectPortraitComponent";

const OverlayStyles = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(rgba(7, 9, 11, 0.95), rgba(7, 9, 11, 0.95)),
    url("src/assets/icons/background.jpeg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Navigator = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  color: ${Constants.WIDGET_BACKGROUND};
  border-radius: ${Constants.BORDER_RADIUS};
  border: 1px solid ${Constants.WIDGET_BACKGROUND_EMPTY};
  &:hover {
    background-color: ${Constants.WIDGET_BACKGROUND};
    color: ${Constants.WIDGET_PRIMARY_FONT};
    border: 1px solid ${Constants.WIDGET_BORDER};
  }
  height: 50px;
  max-height: 50px;
`;

function SelectorComponent() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const [characterLog, setCharacterLog] = useState<CharacterEntry[]>([]);
  const [characterPortrait, setCharacterPortrait] = useState<string>("");

  const renderContent = (selectorValue: string) => {
    switch (selectorValue) {
      case "joinSession":
        return <JoinComponent setSelector={setSelector} />;
      case "createSession":
        return <CreateSessionComponent setSelector={setSelector} />;
      case "characterSelect":
        return (
          <SelectCharacterComponent
            setSelector={setSelector}
            closeModal={handleClose}
            characterLog={characterLog}
            setCharacterLog={setCharacterLog}
          />
        );
      case "createCharacter":
        return (
          <CreateCharacterComponent
            setSelector={setSelector}
            setCharacterLog={setCharacterLog}
            characterPortrait={characterPortrait}
          />
        );
      case "selectPortrait":
        return (
          <SelectPortraitComponent
            setSelector={setSelector}
            setCharacterPortrait={setCharacterPortrait}
          />
        );
      case "close":
        return <div>Add User Content</div>;
      default:
        return null; // or some default content if you wish
    }
  };

  const [selector, setSelector] = useState<string>("joinSession");

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return isModalOpen ? (
    <OverlayStyles>{renderContent(selector)}</OverlayStyles>
  ) : (
    <Navigator onClick={handleOpen}>
      <FontAwesomeIcon icon={faUser} />
    </Navigator>
  );
}

export default SelectorComponent;
