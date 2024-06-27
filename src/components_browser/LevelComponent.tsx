import * as Constants from "../Constants";
import "../Styles.css";

import {
  CharacterEntry,
  AbilityEntry,
  SessionEntry,
  EffectEntry,
} from "../Types";
import { update_session } from "../functions/SessionsFunctions";
import { Socket } from "socket.io-client";

interface LevelComponentProps {
  ability: AbilityEntry | EffectEntry;
  session: SessionEntry;
  websocket: Socket;
  isCreature: boolean;
  character: CharacterEntry;
}

export default function LevelComponent({
  ability,
  session,
  websocket,
  isCreature,
  character,
}: LevelComponentProps) {
  const HandleAddLevel = () => {
    if (typeof ability.level === "string") {
      if (ability.level === "Novice") {
        ability.level = "Adept";
      } else if (ability.level === "Adept") {
        ability.level = "Master";
      } else if (ability.level === "Master") {
        ability.level = "Novice";
      }
    } else {
      ability.level += 1;
    }
    update_session(session, websocket, character, isCreature);
  };

  const HandleMinusLevel = () => {
    if (typeof ability.level === "string") {
      if (ability.level === "Novice") {
        ability.level = "Master";
      } else if (ability.level === "Adept") {
        ability.level = "Novice";
      } else if (ability.level === "Master") {
        ability.level = "Novice";
      }
    } else {
      if (ability.level === 1) {
        return;
      }
      ability.level -= 1;
    }
    update_session(session, websocket, character, isCreature);
  };

  return (
    <div
      className="column button"
      style={{
        minWidth: "40px",
        maxWidth: "40px",
        borderLeft: "1px solid",
        borderColor: "rgba(0, 0, 0, 0.25)",
        borderRadius: "0px",
        justifyContent: "center",
        gap: "0px",
      }}
      onClick={HandleMinusLevel}
      onContextMenu={(e) => {
        e.preventDefault();
        HandleAddLevel();
      }}
      title={"Quantity"}
    >
      <div
        className="row"
        style={{
          color: Constants.WIDGET_SECONDARY_FONT,
          fontSize: "14px",
          fontWeight: "bold",
          gap: "2px",
        }}
      >
        {ability.level === "Novice"
          ? "1"
          : ability.level === "Adept"
          ? "2"
          : ability.level === "Master"
          ? "3"
          : ability.level}
      </div>
      <div
        className="row"
        style={{
          color: "rgba(255, 255, 255, 0.2)",
          fontSize: "10px",
        }}
      >
        Level
      </div>
    </div>
  );
}
