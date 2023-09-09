import * as Constants from "../../Constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

function UserBox() {
  const { user, setUser } = useContext(UserContext);
  return (
    <div className="flex w-full p-7">
      <button
        className="center h-10 w-full flex-row rounded-l-lg px-20"
        style={{
          backgroundColor: Constants.BUTTON_LIGHT,
          border: `1px solid ${Constants.NEW_BORDER}`,
          textAlign: "center",
        }}
      >
        {user.charAt(0).toUpperCase() + user.slice(1)}
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
  );
}

export default UserBox;
