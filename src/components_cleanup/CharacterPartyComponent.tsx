import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import * as Constants from "../Constants";
import { CharacterImages } from "../Images";
import { CharacterEntry, DisplayType, SessionEntry } from "../Types";
import { GetMaxToughness } from "../functions/RulesFunctions";
import { update_session } from "../functions/SessionsFunctions";
import { faSkull, faHeart } from "@fortawesome/free-solid-svg-icons";
import {
  LowerCorruption,
  RaiseCorruption,
  LowerToughness,
  RaiseToughness,
} from "../functions/CharacterFunctions";
import Icon from "@mdi/react";
import { mdiGraveStone, mdiTrashCan } from "@mdi/js";

import { Socket } from "socket.io-client";

interface SessionBoxProps {
  character: CharacterEntry;
  session: SessionEntry;
  websocket: Socket;
  setIsCreature: React.Dispatch<React.SetStateAction<boolean>>;
  isCreature: boolean;
  setCharacterId: React.Dispatch<React.SetStateAction<string>>;
  setIsGm: React.Dispatch<React.SetStateAction<boolean>>;
  isGm: boolean;
  setDisplay: React.Dispatch<React.SetStateAction<DisplayType>>;
}

function CharacterPartyComponent({
  character,
  session,
  websocket,
  setIsCreature,
  isCreature,
  setCharacterId,
  setDisplay,
  isGm,
}: SessionBoxProps) {
  // const { session } = useContext(SessionContext);
  const [corruptionIsHovered, setCorruptionIsHovered] =
    useState<boolean>(false);
  const [toughnessIsHovered, setToughnessIsHovered] = useState<boolean>(false);
  const [killCharacter, setKillCharacter] = useState<boolean>(false);

  const handleOnClick = () => {
    setIsCreature(false);
    console.log(character.id);
    setCharacterId(character.id);
    setDisplay("character");
  };

  const handleDeleteCharacter = async () => {
    setKillCharacter(false);
    const updated_characters = session.characters.filter(
      (c: CharacterEntry) => character.id !== c.id,
    );
    session.characters = updated_characters;
    update_session(session, websocket, character, isCreature);
  };

  // Toughness numbers
  const maxToughness = GetMaxToughness(character);
  const remaining_toughness = maxToughness - character.health.damage;

  // Corrutption numbers
  const corruptionThreshold = Math.ceil(character.stats.resolute.value / 2);
  const temporary_corruption = character.health.shield;
  const clean_corruption = corruptionThreshold - temporary_corruption;

  return (
    <div
      className="row"
      style={{
        background: `linear-gradient(rgba(${
          Constants.COMBAT_BACKGROUND
        }, 0.925), rgba(${
          Constants.COMBAT_BACKGROUND
        }, 0.925)), url(${CharacterImages(character.portrait)})`,
        flexDirection: "row",
        fontSize: 14,
        fontWeight: "bold",
        color: Constants.WIDGET_SECONDARY_FONT,
        backgroundSize: "cover",
        backgroundPosition: "center 25%",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <div className="row">
        {killCharacter ? (
          <div
            className="row opaque_color button"
            style={{ gap: "0px" }}
            onClick={() => setKillCharacter(false)}
          >
            <FontAwesomeIcon
              icon={faXmark}
              style={{ fontSize: "20px", color: Constants.BRIGHT_RED }}
              title={"Delete " + character.name}
            />
          </div>
        ) : (
          <div
            className="row"
            style={{ gap: "3px" }}
            onMouseEnter={() => setToughnessIsHovered(true)}
            onMouseLeave={() => setToughnessIsHovered(false)}
          >
            <div
              className="row button button_color"
              style={{ maxWidth: "50px", fontSize: "20px" }}
              onClick={() =>
                LowerToughness(character, session, websocket, isCreature)
              }
              onContextMenu={(e) => {
                e.preventDefault();
                RaiseToughness(character, session, websocket, isCreature);
              }}
            >
              <FontAwesomeIcon
                icon={faHeart}
                fontSize={"20px"}
                color={Constants.COLOR_1}
                opacity={1.0}
              />
            </div>

            <div className="row opaque_color" style={{ fontSize: "20px" }}>
              {toughnessIsHovered
                ? `${remaining_toughness} / ${maxToughness}`
                : remaining_toughness}
            </div>
            {remaining_toughness === 0 && isGm ? (
              <div
                className="column opaque_red_color"
                style={{
                  gap: "0px",
                  alignItems: "center",
                  justifyContent: "center",
                  maxWidth: "30px",
                  minWidth: "30px",
                }}
                onClick={() => setKillCharacter(!killCharacter)}
              >
                <Icon path={mdiTrashCan} size={0.75} />
              </div>
            ) : null}
          </div>
        )}
      </div>

      <div className="row">
        <div
          className="column"
          style={{
            gap: "0px",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={handleOnClick}
        >
          {remaining_toughness === 0 ? (
            <Icon path={mdiGraveStone} size={0.75} />
          ) : null}
          {character.name}
        </div>
      </div>
      <div className="row">
        {killCharacter ? (
          <div
            className="row opaque_color button"
            style={{ gap: "0px" }}
            onClick={handleDeleteCharacter}
          >
            <FontAwesomeIcon
              icon={faCheck}
              style={{ fontSize: "20px", color: Constants.BRIGHT_GREEN }}
              title={"Delete " + character.name}
            />
          </div>
        ) : (
          <div
            className="row"
            style={{ gap: "3px" }}
            onMouseEnter={() => setCorruptionIsHovered(true)}
            onMouseLeave={() => setCorruptionIsHovered(false)}
          >
            <div className="row opaque_color " style={{ fontSize: "20px" }}>
              {corruptionIsHovered
                ? `${clean_corruption} / ${corruptionThreshold}`
                : clean_corruption}
            </div>
            <div
              className="row button button_color"
              style={{ maxWidth: "50px", fontSize: "20px" }}
              onClick={() =>
                LowerCorruption(character, session, websocket, isCreature)
              }
              onContextMenu={(e) => {
                e.preventDefault();
                RaiseCorruption(character, session, websocket, isCreature);
              }}
            >
              <FontAwesomeIcon
                icon={faSkull}
                fontSize={"20px"}
                color={Constants.COLOR_3}
                opacity={1.0}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CharacterPartyComponent;
