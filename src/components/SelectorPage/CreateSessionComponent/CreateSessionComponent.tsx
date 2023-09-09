import UserBox from "../UserBox";
import * as Constants from "../../../Constants";
import * as Styles from "../SelectorStyles";
import CreateSessionButtons from "./CreateSessionButtons";
import { useState } from "react";

interface LoginProps {
  setSelector: (selector: string) => void;
}

function CreateSessionComponent({ setSelector }: LoginProps) {
  const [sessionName, setSessionName] = useState("");

  const [sessionDescription, setSessionDescription] = useState("");

  const handleNameChange = (e: any) => {
    setSessionName(e.target.value);
  };

  const handleDescriptionChange = (e: any) => {
    setSessionDescription(e.target.value);
  };

  return (
    <div
      className="flex w-1/5 flex-col justify-center"
      style={{ margin: "100px" }}
    >
      <div style={Styles.modalStyles}>
        <div
          className="flex justify-center p-10 text-4xl font-bold"
          style={{ color: Constants.FONT_LIGHT }}
        >
          Create Session
        </div>
        <div className="h-0.5 w-full bg-zinc-800"></div>
        <div
          className="flex flex-col justify-center space-y-2 overflow-auto"
          style={{ height: "400px" }}
        >
          <input
            placeholder="Session Name"
            className="rounded-md p-2"
            onChange={handleNameChange}
          />
          <textarea
            rows={5}
            placeholder="Session Description"
            className="rounded-md p-2"
            onChange={handleDescriptionChange}
          />
        </div>
        <div className="my-5 h-0.5 w-full bg-zinc-800"></div>
      </div>
      <CreateSessionButtons
        setSelector={setSelector}
        sessionName={sessionName}
        sessionDescription={sessionDescription}
      />
    </div>
  );
}

export default CreateSessionComponent;
