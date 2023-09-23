import CreateSessionButtons from "./CreateSessionButtons";
import { useState } from "react";

import {
  MainContainer,
  ModalContainer,
  Title,
  CenterContainer,
  Divider,
} from "../SelectorStyles";

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
    <MainContainer>
      <Title>Create Session</Title>
      <ModalContainer>
        <Divider />
        <CenterContainer>
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
        </CenterContainer>
        <Divider />
      </ModalContainer>
      <CreateSessionButtons
        setSelector={setSelector}
        sessionName={sessionName}
        sessionDescription={sessionDescription}
      />
    </MainContainer>
  );
}

export default CreateSessionComponent;
