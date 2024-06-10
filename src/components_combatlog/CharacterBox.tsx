import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";
import * as Constants from "../Constants";
import { CharacterPortraits } from "../Images";
import { CharacterEntry, SessionEntry } from "../Types";
import { GetMaxToughness } from "../functions/RulesFunctions";
import { update_session } from "../functions/SessionsFunctions";

import Icon from "@mdi/react";
import { mdiGraveStone } from "@mdi/js";

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
  width: 100%;
`;

import { Socket } from "socket.io-client";
import SmallHealthComponent from "./SmallHealthComponent";
import SmallCorruptionComponent from "./SmallCorruptionComponent";
import "../layout.css";

interface SessionBoxProps {
  character: CharacterEntry;
  session: SessionEntry;
  websocket: Socket;
  setIsCreature: React.Dispatch<React.SetStateAction<boolean>>;
  isCreature: boolean;
  setCharacterId: React.Dispatch<React.SetStateAction<string>>;
  setIsGm: React.Dispatch<React.SetStateAction<boolean>>;
}

function CharacterBox({
  character,
  session,
  websocket,
  setIsCreature,
  isCreature,
  setCharacterId,
  setIsGm,
}: SessionBoxProps) {
  // const { session } = useContext(SessionContext);

  const [killCharacter, setKillCharacter] = useState<boolean>(false);

  const handleOnClick = () => {
    setIsCreature(false);
    setIsGm(false);
    console.log(character.id);
    setCharacterId(character.id);
  };

  const handleDeleteCharacter = async () => {
    setKillCharacter(false);
    const updated_characters = session.characters.filter(
      (c: CharacterEntry) => character.id !== c.id,
    );
    session.characters = updated_characters;
    update_session(session, websocket, character, isCreature);
  };

  const maxToughness = GetMaxToughness(character);

  const remaining_toughness = maxToughness - character.health.damage;

  // const corruptionThreshold = Math.ceil(character.stats.resolute.value / 2);

  // const temporary_corruption = character.corruption.temporary;
  // const clean_corruption = corruptionThreshold - temporary_corruption;

  return (
    <Container>
      <PortraitCenter src={CharacterPortraits[character.portrait]}>
        {killCharacter ? (
          <div
            className="row opaque_color button"
            style={{ maxWidth: "30%", gap: "0px" }}
            onClick={() => setKillCharacter(false)}
          >
            <FontAwesomeIcon
              icon={faXmark}
              style={{ fontSize: "20px", color: Constants.BRIGHT_RED }}
              title={"Delete " + character.name}
            />
          </div>
        ) : (
          <SmallHealthComponent
            character={character}
            session={session}
            websocket={websocket}
            isCreature={isCreature}
            browser={true}
          />
        )}
        {remaining_toughness === 0 ? (
          <div
            className="column opaque_color button"
            style={{
              gap: "0px",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => setKillCharacter(!killCharacter)}
          >
            <Icon path={mdiGraveStone} size={0.75} />
            {character.name}
          </div>
        ) : (
          <div
            className="row"
            style={{
              gap: "0px",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={handleOnClick}
          >
            {character.name}
          </div>
        )}

        {killCharacter ? (
          <div
            className="row opaque_color button"
            style={{ maxWidth: "30%", gap: "0px" }}
            onClick={handleDeleteCharacter}
          >
            <FontAwesomeIcon
              icon={faCheck}
              style={{ fontSize: "20px", color: Constants.BRIGHT_GREEN }}
              title={"Delete " + character.name}
            />
          </div>
        ) : (
          <SmallCorruptionComponent
            character={character}
            session={session}
            websocket={websocket}
            isCreature={isCreature}
            browser={true}
          />
        )}
      </PortraitCenter>
    </Container>
  );
}

export default CharacterBox;
