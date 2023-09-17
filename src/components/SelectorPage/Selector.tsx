import * as Constants from "../../Constants";
import { useState, CSSProperties, useContext, useEffect } from "react";
import { CharacterContext } from "../../contexts/CharacterContext";

import LoginComponent from "./LoginComponent/LoginComponent";
import { CharacterEntry } from "../../Types";
import SessionComponent from "./SessionComponent/SessionComponent";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CreateSessionComponent from "./CreateSessionComponent/CreateSessionComponent";
import SelectCharacterComponent from "./SelectCharacterComponent/SelectCharacterComponent";
import CreateCharacterComponent from "./CreateCharacterComponent/CreateCharacterComponent";
import GamemasterComponent from "./GamemasterComponent/GamemasterComponent";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const OverlayStyles = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(rgba(7, 9, 11, 0.95), rgba(7, 9, 11, 0.95)),
    url("https://www.belloflostsouls.net/wp-content/uploads/2020/06/symbaroum-horz.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  width: 500px;
  min-width: 500px;
  background-color: ${Constants.WIDGET_BACKGROUND};
`;

function SelectorComponent() {
  const { character } = useContext(CharacterContext);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const [characterLog, setCharacterLog] = useState<CharacterEntry[]>([]);

  const renderContent = (selectorValue: string) => {
    switch (selectorValue) {
      case "login":
        return <LoginComponent setSelector={setSelector} />;
      case "session":
        return <SessionComponent setSelector={setSelector} />;
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
          />
        );
      case "gamemaster":
        return (
          <GamemasterComponent
            setSelector={setSelector}
            closeModal={handleClose}
          />
        );
      case "close":
        return <div>Add User Content</div>;
      default:
        return null; // or some default content if you wish
    }
  };

  const [selector, setSelector] = useState<string>("login");

  const handleOpen = () => {
    console.log("Opening Modal");
    setIsModalOpen(true);
  };

  const handleClose = () => {
    console.log("Closing Modal");
    setIsModalOpen(false);
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return isModalOpen ? (
    <OverlayStyles>{renderContent(selector)}</OverlayStyles>
  ) : null;
}

export default SelectorComponent;
