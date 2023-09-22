import UserBox from "../UserBox";

import * as Styles from "../SelectorStyles";
import * as Constants from "../../../Constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../../contexts/UserContext";
import { useContext } from "react";
import { SessionEntry } from "../../../Types";
import { postSession } from "../../../functions/SessionsFunctions";

import {
  ButtonContainer,
  LargeCircleButton,
  LargeCircleButtonDisabled,
} from "../SelectorStyles";

interface CreateSessionsProps {
  setSelector: (selector: string) => void;
  sessionName: string;
  sessionDescription: string;
}

function formatDate(date: Date): string {
  const year = date.getFullYear();
  // JavaScript's getMonth returns 0 for January, 1 for February, etc.
  // So, we add 1 to get the correct month number.
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function generateID(): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function CreateSessionButtons({
  setSelector,
  sessionName,
  sessionDescription,
}: CreateSessionsProps) {
  const { user } = useContext(UserContext);
  const currentDate = new Date();

  const NewSessionEntry: SessionEntry = {
    name: sessionName,
    description: sessionDescription,
    id: generateID(),
    date: formatDate(currentDate),
    owner: user,
    users: [],
  };

  const handlePostSession = async () => {
    console.log(NewSessionEntry);
    await postSession(NewSessionEntry);
    setSelector("session");
  };

  return (
    <div className="mb-5 mt-3 flex justify-center">
      {" "}
      {/* Adjust the margin-bottom if necessary */}
      <LargeCircleButton onClick={() => setSelector("session")}>
        <FontAwesomeIcon icon={faAngleLeft} />
      </LargeCircleButton>
      {sessionName === "" ? (
        <LargeCircleButtonDisabled>
          <FontAwesomeIcon icon={faCheck} />
        </LargeCircleButtonDisabled>
      ) : (
        <LargeCircleButton>
          <FontAwesomeIcon icon={faCheck} />
        </LargeCircleButton>
      )}
    </div>
  );
}
export default CreateSessionButtons;
