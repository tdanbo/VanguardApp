import * as Constants from "../Constants";
import { CharacterEntry, SessionEntry } from "../Types";
import { GetMaxToughness } from "../functions/RulesFunctions";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Socket } from "socket.io-client";

import "../layout.css";
import { useState } from "react";
import {
  LowerToughness,
  RaiseToughness,
} from "../functions/CharacterFunctions";

interface HealthBoxProps {
  character: CharacterEntry;
  session: SessionEntry;
  websocket: Socket;
  isCreature: boolean;
  browser: boolean;
}

function SmallHealthComponent({
  character,
  session,
  websocket,
  isCreature,
}: HealthBoxProps) {
  const maxToughness = GetMaxToughness(character);

  const remaining_toughness = maxToughness - character.health.damage;

  const [isHovered, setIsHovered] = useState<boolean>(false);
  return (
    <div
      className="row"
      style={{ maxWidth: "40%", gap: "0px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="row button opaque_color"
        style={{ maxWidth: "30%", fontSize: "20px" }}
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
      <div
        className="row opaque_color"
        style={{ maxWidth: "70%", fontSize: "20px" }}
      >
        {isHovered
          ? `${remaining_toughness} / ${maxToughness}`
          : remaining_toughness}
      </div>
    </div>
  );
}

export default SmallHealthComponent;
