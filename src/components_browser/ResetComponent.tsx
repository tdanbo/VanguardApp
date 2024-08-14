import * as Constants from "../Constants";
import "../Styles.css";

import {
  faBurst,
  faDice,
  faMoon,
  faRotate,
  faShield,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Socket } from "socket.io-client";
import { CharacterEntry, EffectEntry, SessionEntry } from "../Types";
import { update_session } from "../functions/SessionsFunctions";

interface LevelComponentProps {
  effect: EffectEntry;
  session: SessionEntry;
  websocket: Socket;
  isCreature: boolean;
  character: CharacterEntry;
}

export default function ResetComponent({
  effect,
  session,
  websocket,
  isCreature,
  character,
}: LevelComponentProps) {
  const HandleAddLevel = () => {
    if (effect.reset === "never") {
      effect.reset = "roll";
    } else if (effect.reset === "roll") {
      effect.reset = "damage";
    } else if (effect.reset === "damage") {
      effect.reset = "armor";
    } else if (effect.reset === "armor") {
      effect.reset = "eating";
    } else if (effect.reset === "eating") {
      effect.reset = "sleeping";
    } else if (effect.reset === "sleeping") {
      effect.reset = "never";
    }

    update_session(session, websocket, character, isCreature);
  };

  const HandleMinusLevel = () => {
    if (effect.reset === "never") {
      effect.reset = "sleeping";
    } else if (effect.reset === "sleeping") {
      effect.reset = "eating";
    } else if (effect.reset === "eating") {
      effect.reset = "armor";
    } else if (effect.reset === "armor") {
      effect.reset = "damage";
    } else if (effect.reset === "damage") {
      effect.reset = "roll";
    } else if (effect.reset === "roll") {
      effect.reset = "never";
    }
    update_session(session, websocket, character, isCreature);
  };

  return (
    <>
      <div className="vertical-divider bg--primary-1" />
      <div
        className="button border-radius--none"
        onClick={HandleMinusLevel}
        onContextMenu={(e) => {
          e.preventDefault();
          HandleAddLevel();
        }}
        title={`Reset: ${effect.reset}`}
      >
        <div
          className="row"
          style={{
            color: Constants.WIDGET_SECONDARY_FONT,
            fontSize: "14px",
            fontWeight: "bold",
          }}
        >
          {effect.reset === "never" ? (
            <FontAwesomeIcon icon={faRotate} size="sm" />
          ) : effect.reset === "sleeping" ? (
            <FontAwesomeIcon icon={faMoon} size="sm" />
          ) : effect.reset === "eating" ? (
            <FontAwesomeIcon icon={faUtensils} size="sm" />
          ) : effect.reset === "armor" ? (
            <FontAwesomeIcon icon={faShield} size="sm" />
          ) : effect.reset === "damage" ? (
            <FontAwesomeIcon icon={faBurst} size="sm" />
          ) : effect.reset === "roll" ? (
            <FontAwesomeIcon icon={faDice} size="sm" />
          ) : (
            <FontAwesomeIcon icon={faRotate} size="sm" />
          )}
        </div>
        <div
          className="row font--primary-4"
          style={{
            fontSize: "11px",
          }}
        >
          Reset
        </div>
      </div>
    </>
  );
}
