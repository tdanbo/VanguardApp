import * as Constants from "../../Constants";
import { useState, CSSProperties, useContext, useEffect } from "react";
import { CharacterContext } from "../../contexts/CharacterContext";

import LoginComponent from "./LoginComponent/LoginComponent";

import SessionComponent from "./SessionComponent/SessionComponent";
import SessionButtons from "./SessionComponent/SessionButtons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CreateSessionComponent from "./CreateSessionComponent/CreateSessionComponent";
import SelectCharacterComponent from "./SelectCharacterComponent/SelectCharacterComponent";
import CreateCharacterComponent from "./CreateCharacterComponent/CreateCharacterComponent";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function SelectorComponent() {
  const { character } = useContext(CharacterContext);
  const [isModalOpen, setIsModalOpen] = useState(true);

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
          />
        );
      case "createCharacter":
        return <CreateCharacterComponent setSelector={setSelector} />;
      case "gamemaster":
        return <div>Gamemaster Content</div>;
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

  const overlayStyles: CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `linear-gradient(rgba(7, 9, 11, 0.95), rgba(7, 9, 11, 0.95)), url('https://www.belloflostsouls.net/wp-content/uploads/2020/06/symbaroum-horz.jpg')`,
    backgroundSize: "cover", // This will stretch and scale the image
    backgroundPosition: "center", // This will center the image
    backgroundRepeat: "no-repeat", // This will prevent repeating the image
    zIndex: 999,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div>
      {isModalOpen ? (
        <div style={overlayStyles}>{renderContent(selector)}</div>
      ) : (
        <div
          className="flex h-full items-center justify-center"
          style={{
            backgroundColor: Constants.PRIMARY_LIGHTER,
            width: Constants.SECTION_TITLE_HEIGHT,
            minWidth: Constants.SECTION_TITLE_HEIGHT,
            border: `1px solid ${Constants.BORDER}`,
          }}
          onClick={() => handleOpen()}
        >
          <FontAwesomeIcon icon={faUser} />
        </div>
      )}
    </div>
  );
}

export default SelectorComponent;
