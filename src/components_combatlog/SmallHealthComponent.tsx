import * as Constants from "../Constants";
import { CharacterEntry, SessionEntry } from "../Types";
import { GetMaxToughness } from "../functions/RulesFunctions";
import { update_session } from "../functions/SessionsFunctions";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Socket } from "socket.io-client";

import "../layout.css";
import { useState } from "react";

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
  const handleAddToughness = () => {
    if (character.health.damage > 0) {
      character.health.damage -= 1;
    }
    update_session(session, websocket, character, isCreature);
  };

  const handleSubToughness = () => {
    const maxToughness =
      character.stats.strong.value < 10 ? 10 : character.stats.strong.value;

    const value_step = 1;

    if (character.health.damage === maxToughness) {
      console.log("Max damage reached");
    } else {
      character.health.damage += value_step;
    }
    update_session(session, websocket, character, isCreature);
  };

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
        onClick={handleSubToughness}
        onContextMenu={(e) => {
          e.preventDefault();
          handleAddToughness();
        }}
      >
        <FontAwesomeIcon
          icon={faHeart}
          onClick={handleSubToughness}
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
