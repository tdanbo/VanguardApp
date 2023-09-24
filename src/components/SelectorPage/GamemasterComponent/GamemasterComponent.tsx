import * as Constants from "../../../Constants";
import SelectCharacterButtons from "./GamemasterButtons";
import { useState, useEffect, useContext } from "react";
import { CharacterEntry } from "../../../Types";
import { getCharacters } from "../../../functions/SessionsFunctions";
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
function GamemasterComponent({ setSelector }: LoginProps) {
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
              key={index}
              character={character}
              setCharacterLog={setCharacterLog}
            />
          ))}
          <CatergoryTitle>Users</CatergoryTitle>
          {[...userLog].map((username, index) => (
            <UserSimpleBox
              key={index}
              username={username}
              setUserLog={setUserLog}
            />
          ))}
        </CenterContainer>
        <Divider />
      </ModalContainer>
      <SelectCharacterButtons setSelector={setSelector} />
    </MainContainer>
  );
}

export default GamemasterComponent;
