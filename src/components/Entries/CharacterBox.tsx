import { faCheck, faSkull, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";
import * as Constants from "../../Constants";
import { CharacterPortraits } from "../../Images";
import { CharacterEntry, SessionEntry } from "../../Types";
import { GetMaxToughness } from "../../functions/RulesFunctions";
import { update_session } from "../../functions/SessionsFunctions";
import HealthStatComponent from "../../component/HealthStatComponent";

const Container = styled.div`
  display: flex;
  flex-grow: 1;
  border-radius: ${Constants.BORDER_RADIUS};
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  cursor: pointer;
  border: 1px solid ${Constants.WIDGET_BORDER};
`;

interface PortraitCenterProps {
  src: string;
}

const PortraitCenter = styled.div<PortraitCenterProps>`
  display: flex;

  flex-direction: row;
  font-size: 14px;
  font-weight: bold;
  color: ${Constants.WIDGET_SECONDARY_FONT};
  background: linear-gradient(
      rgba(${Constants.COMBAT_BACKGROUND}, 0.925),
      rgba(${Constants.COMBAT_BACKGROUND}, 0.925)
    ),
    url(${(props) => props.src});
  background-size: cover;
  background-position: center 25%;

  justify-content: center;
  align-items: center;
  height: 100%;
  width: 50%;
`;

interface BgColor {
  $bgcolor: string;
}

const LeftControl = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  height: 100%;
  align-items: center;
  justify-content: center;
  color: ${Constants.WIDGET_BORDER};
`;

const RightControl = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  height: 100%;
  align-items: center;
  justify-content: center;
  color: ${Constants.WIDGET_BORDER};
`;

const DeadControl = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  height: 100%;
  align-items: center;
  justify-content: center;
  color: ${Constants.WIDGET_BORDER};
  border-radius: ${Constants.BORDER_RADIUS};
`;

interface DivProps {
  width: string;
}

const Column = styled.div<DivProps>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-basis: 0;
  gap: 1px;
  max-width: ${(props) => props.width};
  overflow: scroll;
  scrollbar-width: none !important;
`;

import { Socket } from "socket.io-client";
import CorruptionStatComponent from "../../component/CorruptionStatComponent";

interface SessionBoxProps {
  character: CharacterEntry;
  setCharacterName: React.Dispatch<React.SetStateAction<string>>;
  session: SessionEntry;
  websocket: Socket;
  setIsCreature: React.Dispatch<React.SetStateAction<boolean>>;
  isCreature: boolean;
}

function CharacterBox({
  character,
  setCharacterName, // setCharacterLog,
  session,
  websocket,
  setIsCreature,
  isCreature,
}: SessionBoxProps) {
  // const { session } = useContext(SessionContext);

  const [killCharacter, setKillCharacter] = useState<boolean>(false);

  const handleOnClick = () => {
    setIsCreature(false);
    setCharacterName(character.name);
  };

  const handleDeleteCharacter = async () => {
    setKillCharacter(false);
    const updated_characters = session.characters.filter(
      (c: CharacterEntry) => character.name !== c.name,
    );
    session.characters = updated_characters;
    update_session(session, character, isCreature, websocket);
  };

  const maxToughness = GetMaxToughness(character);

  const damage_toughness = character.health.damage;
  const remaining_toughness = maxToughness - character.health.damage;

  // const corruptionThreshold = Math.ceil(character.stats.resolute.value / 2);

  // const temporary_corruption = character.corruption.temporary;
  // const clean_corruption = corruptionThreshold - temporary_corruption;

  return (
    <Container>
      {remaining_toughness === 0 ? (
        killCharacter ? (
          <LeftControl
            onClick={() => setKillCharacter(false)}
            title={"Don't Kill " + character.name}
          >
            <FontAwesomeIcon
              icon={faXmark}
              style={{ fontSize: "12px", color: Constants.BRIGHT_RED }}
            />
          </LeftControl>
        ) : (
          <LeftControl
            onClick={() => setKillCharacter(true)}
            title={"Delete " + character.name}
          >
            <FontAwesomeIcon icon={faSkull} style={{ fontSize: "12px" }} />
          </LeftControl>
        )
      ) : (
        <CorruptionStatComponent
          character={character}
          session={session}
          websocket={websocket}
          isCreature={isCreature}
          browser={true}
        />
      )}

      {killCharacter ? (
        <PortraitCenter
          onClick={handleOnClick}
          src={CharacterPortraits[character.portrait]}
        >
          Confirm Delete : {character.name}
        </PortraitCenter>
      ) : (
        <PortraitCenter
          onClick={handleOnClick}
          src={CharacterPortraits[character.portrait]}
        >
          {character.name}
        </PortraitCenter>
      )}
      {remaining_toughness === 0 ? (
        killCharacter ? (
          <DeadControl onClick={handleDeleteCharacter}>
            <FontAwesomeIcon
              icon={faCheck}
              style={{ fontSize: "12px", color: Constants.BRIGHT_GREEN }}
              title={"Delete " + character.name}
            />
          </DeadControl>
        ) : (
          <RightControl
            onClick={() => setKillCharacter(true)}
            title={"Delete " + character.name}
          >
            <FontAwesomeIcon icon={faSkull} style={{ fontSize: "12px" }} />
          </RightControl>
        ) // Remove the extra curly braces here
      ) : (
        <HealthStatComponent
          character={character}
          session={session}
          websocket={websocket}
          isCreature={isCreature}
          browser={true}
        />
      )}
    </Container>
  );
}

export default CharacterBox;
