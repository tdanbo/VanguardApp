import { Socket } from "socket.io-client";
import * as Constants from "../Constants";
import "../Styles.css";
import {
  GetAbilityCorruption,
  GetEquipmentCorruption,
} from "../functions/RulesFunctions";
import { update_session } from "../functions/SessionsFunctions";

import { faSkull } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CharacterEntry, SessionEntry } from "../Types";

const backgroundcolor = "rgba(19, 23, 22, 0.8)";

interface CorruptionSmallComponentProps {
  session: SessionEntry;
  character: CharacterEntry;
  websocket: Socket;
  isCreature: boolean;
}

function SmallCorruptionComponent({
  character,
  session,
  websocket,
  isCreature,
}: CorruptionSmallComponentProps) {
  const corruptionThreshold = Math.ceil(character.stats.resolute.value / 2);
  const maxCorruptionPermanent = corruptionThreshold * 3;
  const corruptionRulesAdjustment =
    GetEquipmentCorruption(character) + GetAbilityCorruption(character);

  const current_corruption =
    character.health.corruption + corruptionRulesAdjustment;

  const handleAddCorruption = () => {
    const value_step = 1;

    if (current_corruption === maxCorruptionPermanent) {
      console.log("Max corruption reached");
    } else {
      character.health.corruption += value_step;
    }
    update_session(session, websocket, character, isCreature);
  };

  const handleSubCorruption = () => {
    const value_step = 1;

    if (character.health.corruption === 0) {
      console.log("Min corruption reached");
    } else {
      character.health.corruption -= value_step;
    }
    update_session(session, websocket, character, isCreature);
  };

  return (
    <div
      className="column"
      style={{ backgroundColor: backgroundcolor, gap: "0px" }}
      onClick={() => {
        handleSubCorruption();
      }}
      onContextMenu={(event) => {
        event.preventDefault();
        handleAddCorruption();
      }}
    >
      <div className="row">
        <div
          className="row"
          style={{
            fontSize: "20px",
            marginTop: "2px",
            marginRight: "-38px",
            filter: `drop-shadow(1px 1px 0px ${Constants.BACKGROUND})`,
          }}
        >
          {current_corruption} / {maxCorruptionPermanent}
        </div>
        <div style={{ marginRight: "10px" }}>
          <FontAwesomeIcon icon={faSkull} color={Constants.COLOR_3} />
        </div>
      </div>
      <div
        className="row font--primary-3 font--size-small"
        style={{
          height: "auto",
          marginBottom: "5px",
          fontWeight: "bold",
        }}
      >
        Perm. Corruption
      </div>
    </div>
  );
}

export default SmallCorruptionComponent;
