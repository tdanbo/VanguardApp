import styled from "styled-components";
import * as Constants from "../Constants";
import { CharacterEntry, SessionEntry } from "../Types";
import { update_session } from "../functions/SessionsFunctions";

interface BgColor {
  $bgcolor: string;
  $isFirst?: boolean;
  $isLast?: boolean;
}
const TickBar = styled.div<BgColor>`
  display: flex;
  flex-grow: 1;
  height: 100%;
  background-color: ${(props) => props.$bgcolor};
  border-right: 1px solid ${Constants.WIDGET_BORDER};
  border-top: 1px solid ${Constants.WIDGET_BORDER};
  border-bottom: 1px solid ${Constants.WIDGET_BORDER};
  cursor: pointer;
  border-radius: ${Constants.BORDER_RADIUS};
  border-top-left-radius: ${(props) =>
    props.$isFirst ? Constants.BORDER_RADIUS : "0"};
  border-bottom-left-radius: ${(props) =>
    props.$isFirst ? Constants.BORDER_RADIUS : "0"};
  border-top-right-radius: ${(props) =>
    props.$isLast ? Constants.BORDER_RADIUS : "0"};
  border-bottom-right-radius: ${(props) =>
    props.$isLast ? Constants.BORDER_RADIUS : "0"};
  border-left: ${(props) =>
    props.$isFirst ? "1px solid " + Constants.WIDGET_BORDER : "0"};
`;

import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Socket } from "socket.io-client";

interface HealthBoxProps {
  character: CharacterEntry;
  session: SessionEntry;
  websocket: Socket;
  isCreature: boolean;
  browser: boolean;
}

function CorruptionStatComponent({
  character,
  session,
  websocket,
  isCreature,
}: HealthBoxProps) {
  const handleTempAddCorruption = () => {
    const corruptionThreshold = Math.ceil(character.stats.resolute.value / 2);
    let value = 1;
    for (let i = 0; i < value; i++) {
      if (character.health.shield === corruptionThreshold) {
        if (character.health.corruption === corruptionThreshold * 3) {
          console.log("Max corruption reached");
        }
        character.health.corruption += 1;
      } else {
        character.health.shield += 1;
      }
    }
    update_session(session, websocket, character, isCreature);
  };

  const handleTempSubCorruption = () => {
    let value = 1;
    character.health.shield -= value;

    if (character.health.shield < 0) {
      character.health.shield = 0;
    }
    update_session(session, websocket, character, isCreature);
  };

  const corruptionThreshold = Math.ceil(character.stats.resolute.value / 2);

  const temporary_corruption = character.health.shield;
  const clean_corruption = corruptionThreshold - temporary_corruption;

  return (
    <div
      className="row base_color"
      style={{ height: "100%", padding: "1px", gap: "1px" }}
    >
      <div
        className="row button-hover button_color"
        style={{ maxWidth: "30px" }}
        onClick={handleTempSubCorruption}
      >
        <FontAwesomeIcon
          icon={faMinus}
          color={Constants.WIDGET_SECONDARY_FONT_INACTIVE}
        />
      </div>
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <div className="row" style={{ gap: "0px", padding: "1px" }}>
          {[...Array(clean_corruption)].map((_, index, array) => (
            <TickBar
              key={index}
              $bgcolor={Constants.TYPE_COLORS["temporary_corruption"]}
              $isFirst={index === 0} // Apply rounded corners on the left for the first item
              $isLast={index === array.length - 1}
            ></TickBar>
          ))}
          {[...Array(temporary_corruption)].map((_, index, array) => (
            <TickBar
              key={index}
              $bgcolor={Constants.WIDGET_BACKGROUND_EMPTY}
              $isFirst={index === 0} // Apply rounded corners on the left for the first item
              $isLast={index === array.length - 1}
            />
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: Constants.WIDGET_PRIMARY_FONT,
            textShadow: "2px 2px 2px black",
            fontSize: "18px",
          }}
        >
          {`${clean_corruption} / ${corruptionThreshold}`}
        </div>
      </div>
      <div
        className="row button-hover button_color"
        style={{ maxWidth: "30px" }}
        onClick={handleTempAddCorruption}
      >
        <FontAwesomeIcon
          icon={faPlus}
          color={Constants.WIDGET_SECONDARY_FONT_INACTIVE}
        />
      </div>
    </div>
  );
}

export default CorruptionStatComponent;
