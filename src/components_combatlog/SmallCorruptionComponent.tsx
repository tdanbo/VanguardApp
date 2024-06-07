import * as Constants from "../Constants";
import { CharacterEntry, SessionEntry } from "../Types";
import { faSkull } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Socket } from "socket.io-client";

import "../layout.css";
import { useState } from "react";
import {
  LowerCorruption,
  RaiseCorruption,
} from "../functions/CharacterFunctions";

interface HealthBoxProps {
  character: CharacterEntry;
  session: SessionEntry;
  websocket: Socket;
  isCreature: boolean;
  browser: boolean;
}

function SmallCorruptionComponent({
  character,
  session,
  websocket,
  isCreature,
}: HealthBoxProps) {
  const corruptionThreshold = Math.ceil(character.stats.resolute.value / 2);

  const temporary_corruption = character.health.shield;
  const clean_corruption = corruptionThreshold - temporary_corruption;

  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <div
      className="row"
      style={{ maxWidth: "40%", gap: "0px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="row opaque_color "
        style={{ maxWidth: "70%", fontSize: "20px" }}
      >
        {isHovered
          ? `${clean_corruption} / ${corruptionThreshold}`
          : clean_corruption}
      </div>
      <div
        className="row button opaque_color"
        style={{ maxWidth: "30%", fontSize: "20px" }}
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
  );
}

export default SmallCorruptionComponent;
