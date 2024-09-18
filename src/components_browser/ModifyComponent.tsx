import * as Constants from "../Constants";
import "../Styles.css";

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

export default function ModifyComponent({
  effect,
  session,
  websocket,
  isCreature,
  character,
}: LevelComponentProps) {
  const HandleAddLevel = () => {
    effect.level += 1;
    update_session(session, websocket, character, isCreature);
  };

  const HandleMinusLevel = () => {
    effect.level -= 1;
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
          {effect.level > 0 ? "+" : ""}
          {effect.level}
        </div>
        <div
          className="row font--primary-4"
          style={{
            fontSize: "11px",
          }}
        >
          Effect
        </div>
      </div>
    </>
  );
}
