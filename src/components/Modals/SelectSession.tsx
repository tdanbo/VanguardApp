import * as Constants from "../../Constants";
import { useState, CSSProperties, useContext, useEffect } from "react";
import { ItemEntry } from "../../Types";
import { onChangeQuantity } from "../../functions/CharacterFunctions";
import { CharacterContext } from "../../contexts/CharacterContext";
import { SessionContext } from "../../contexts/SessionContext";

import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faCheck,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

function SelectSession() {
  const { character } = useContext(CharacterContext);
  // const { session, setSession } = useContext(SessionContext);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [inputValue, setInputValue] = useState<number>(0);
  const [token, setToken] = useState(null);

  const handleClose = () => {
    console.log("Closing Modal");
    setIsModalOpen(false);
  };

  const modalStyles: CSSProperties = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.1)), linear-gradient(${Constants.WIDGET_BG}, ${Constants.WIDGET_BG})`,
    backgroundColor: Constants.WIDGET_BG,
    padding: "20px",
    zIndex: 1000,
    border: `1px solid ${Constants.NEW_BORDER}`,
    flex: 1,
    maxHeight: "60vh",
    overflowY: "auto",
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

  const circleButtonStyles: CSSProperties = {
    width: "50px",
    height: "50px",
    borderRadius: "50%", // Makes it a circle
    backgroundColor: Constants.BUTTON,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "10px",
    border: `1px solid ${Constants.NEW_BORDER}`,
    cursor: "pointer",
  };

  const smallCircleButtonStyles: CSSProperties = {
    ...circleButtonStyles,
    width: "35px",
    height: "35px",
    margin: "5px",
  };

  const largeCircleButtonStyles: CSSProperties = {
    ...circleButtonStyles,
    width: "50px",
    height: "50px",
    margin: "5px",
    fontSize: "1.5rem",
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const [username, setUsername] = useState<string | null>(null);

  const fetchUsername = async () => {
    try {
      const res = await axios.get("http://localhost:8000/username", {
        withCredentials: true,
      });
      const fetchedUsername = res.data.user;

      if (fetchedUsername) {
        setUsername(fetchedUsername);
      } else {
        console.log("Username is not present in the response.");
      }
    } catch (error) {
      console.error("Error fetching username from cookie:", error);
    }
  };

  useEffect(() => {
    fetchUsername();
  }, []);

  console.log("Username:", username);

  const handleLogin = () => {
    axios.get("http://localhost:8000/login").then((res) => {
      const authURL = res.data.url;
      console.log(authURL);
      window.location.href = authURL;
    });
  };

  return (
    <div>
      {isModalOpen && (
        <div style={overlayStyles}>
          {/* <div style={overlayStyles} onClick={handleClose}> */}
          <div
            className="flex h-1/2 flex-col items-center rounded-lg"
            style={modalStyles}
            onClick={stopPropagation}
          >
            <div className="flex w-full p-10">
              <button
                className="center h-10 flex-row rounded-l-lg px-10"
                style={{
                  backgroundColor: Constants.BUTTON_LIGHT,
                  border: `1px solid ${Constants.NEW_BORDER}`,
                  textAlign: "center",
                }}
                onClick={handleLogin}
              >
                Login Using Discord
              </button>

              <div
                className="flex h-10 w-10 items-center justify-center rounded-r-lg"
                style={{
                  color: "FF0000",
                  fontSize: "1.25rem",
                  backgroundColor: Constants.BUTTON_LIGHT,
                  borderTop: `1px solid ${Constants.NEW_BORDER}`,
                  borderRight: `1px solid ${Constants.NEW_BORDER}`,
                  borderBottom: `1px solid ${Constants.NEW_BORDER}`,
                }}
              >
                <FontAwesomeIcon icon={faUser} />
              </div>
            </div>
            <div className="w-full flex-col px-10">
              <button
                className="fs-l text-bold mb-2 flex h-10 w-full items-center justify-center rounded-lg"
                style={{
                  color: Constants.FONT_LIGHT,
                  backgroundColor: Constants.BUTTON,
                  borderTop: `1px solid ${Constants.NEW_BORDER}`,
                  borderRight: `1px solid ${Constants.NEW_BORDER}`,
                  borderBottom: `1px solid ${Constants.NEW_BORDER}`,
                }}
              >
                Vindica
              </button>
              <button
                className="fs-l text-bold mb-2 flex h-10 w-full items-center justify-center rounded-lg"
                style={{
                  color: Constants.FONT_LIGHT,
                  backgroundColor: Constants.BUTTON,
                  borderTop: `1px solid ${Constants.NEW_BORDER}`,
                  borderRight: `1px solid ${Constants.NEW_BORDER}`,
                  borderBottom: `1px solid ${Constants.NEW_BORDER}`,
                }}
              >
                Vindica
              </button>
              <button
                className="fs-l text-bold mb-2 flex h-10 w-full items-center justify-center rounded-lg"
                style={{
                  color: Constants.FONT_LIGHT,
                  backgroundColor: Constants.BUTTON,
                  borderTop: `1px solid ${Constants.NEW_BORDER}`,
                  borderRight: `1px solid ${Constants.NEW_BORDER}`,
                  borderBottom: `1px solid ${Constants.NEW_BORDER}`,
                }}
              >
                Vindica
              </button>
            </div>
          </div>
          <div className="mb-5 mt-3 flex justify-center">
            {" "}
            {/* Adjust the margin-bottom if necessary */}
            <div style={smallCircleButtonStyles}>
              <FontAwesomeIcon
                icon={faMinus}
                style={{ color: Constants.FONT_LIGHT }}
              />
            </div>
            <div style={largeCircleButtonStyles}>
              <FontAwesomeIcon
                icon={faCheck}
                style={{ color: Constants.FONT_LIGHT }}
              />
            </div>
            <div style={smallCircleButtonStyles}>
              {" "}
              <FontAwesomeIcon
                icon={faPlus}
                style={{ color: Constants.FONT_LIGHT }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SelectSession;
