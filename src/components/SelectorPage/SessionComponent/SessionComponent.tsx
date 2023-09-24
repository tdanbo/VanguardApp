import SessionButtons from "./SessionButtons";
import SessionBox from "./SessionBox";
import { useState, useEffect, useContext } from "react";
import { SessionEntry } from "../../../Types";
import { getSessions } from "../../../functions/SessionsFunctions";
import { UserContext } from "../../../contexts/UserContext";

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
  const { user } = useContext(UserContext);
  const [sessions, setSessions] = useState<SessionEntry[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getSessions(user);
      setSessions(data);
    }

    fetchData();
  }, []);

  return (
    <MainContainer>
      <Title>Sessions</Title>
      <ModalContainer>
        <Divider />
        <CenterContainer>
          {[...sessions].reverse().map((item, index) => (
            <SessionBox
              key={index}
              setSelector={setSelector}
              sessionprop={item}
            />
          ))}
        </CenterContainer>
        <Divider />
      </ModalContainer>
      <SessionButtons setSelector={setSelector} setSessions={setSessions} />
    </MainContainer>
  );
}

export default CreateSessionComponent;
