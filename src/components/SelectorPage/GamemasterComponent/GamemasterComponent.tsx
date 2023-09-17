import * as Constants from "../../../Constants";
import * as Styles from "../SelectorStyles";
import SelectCharacterButtons from "./GamemasterButtons";
import CharacterBox from "../SelectCharacterComponent/CharacterBox";
import { useState, useEffect, useContext } from "react";
import { CharacterEntry, SessionEntry } from "../../../Types";
import { getCharacters } from "../../../functions/SessionsFunctions";
import { UserContext } from "../../../contexts/UserContext";
import { SessionContext } from "../../../contexts/SessionContext";
import { useWebSocket } from "../../../contexts/WebSocketContext";
import styled from "styled-components";
import {
  MainContainer,
  ModalContainer,
  Title,
  CenterContainer,
  Divider,
} from "../SelectorStyles";

import UserSimpleBox from "./UserSimpleBox";

import CharacterSimpleBox from "./CharacterSimpleBox";
interface LoginProps {
  setSelector: (selector: string) => void;
  closeModal: () => void;
}

const CatergoryTitle = styled.div`
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${Constants.WIDGET_SECONDARY_FONT};
`;
function GamemasterComponent({ setSelector, closeModal }: LoginProps) {
  const { user } = useContext(UserContext);
  const { session } = useContext(SessionContext);

  const [characterLog, setCharacterLog] = useState<CharacterEntry[]>([]);
  const [userLog, setUserLog] = useState<string[]>([]);

  const { charactersResponse } = useWebSocket();

  useEffect(() => {
    setUserLog(session.users);
  }, [session.users]);

  useEffect(() => {
    getCharacters(session.id).then((response) => {
      setCharacterLog(response);
    });
  }, []);

  useEffect(() => {
    if (charactersResponse) {
      setCharacterLog(charactersResponse);
    }
  }, [charactersResponse]);

  return (
    <MainContainer>
      <ModalContainer>
        <Title>{session.name}</Title>
        <Divider />
        <CenterContainer>
          <CatergoryTitle>Characters</CatergoryTitle>
          {[...characterLog].reverse().map((character, index) => (
            <CharacterSimpleBox
              character={character}
              setCharacterLog={setCharacterLog}
            />
          ))}
          <CatergoryTitle>Users</CatergoryTitle>
          {[...userLog].map((username, index) => (
            <UserSimpleBox username={username} setUserLog={setUserLog} />
          ))}
        </CenterContainer>
        <Divider />
      </ModalContainer>
      <SelectCharacterButtons setSelector={setSelector} />
    </MainContainer>
  );
}

export default GamemasterComponent;
