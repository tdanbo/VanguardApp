import * as Constants from "../Constants";
import "../Styles.css";

import { Socket } from "socket.io-client";
import {
  AbilityEntry,
  CharacterEntry,
  EffectEntry,
  SessionEntry,
} from "../Types";
import { update_session } from "../functions/SessionsFunctions";

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
    <>
      <div className="vertical-divider bg--primary-1" />
      <div
        className="button border-radius--none"
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
          className="row font--primary-4"
          style={{
            fontSize: "11px",
          }}
        >
          Level
        </div>
      </div>
    </>
  );
}
