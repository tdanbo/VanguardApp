import * as Constants from "../Constants";
import "../layout.css";

import { CharacterEntry, ItemEntry, SessionEntry } from "../Types";
import { update_session } from "../functions/SessionsFunctions";
import { Socket } from "socket.io-client";
import { AddToLoot } from "../functions/UtilityFunctions";
import { DeleteInventorySlot } from "../functions/CharacterFunctions";

interface QuantityComponentProps {
  item: ItemEntry;
  session: SessionEntry;
  websocket: Socket;
  isCreature: boolean;
  character: CharacterEntry;
}

export default function QuantityComponent({
  item,
  session,
  websocket,
  isCreature,
  character,
}: QuantityComponentProps) {
  const HandleAddQuantity = () => {
    item.quantity += 1;
    update_session(session, websocket, character, isCreature);
  };

  const HandleMinusQuantity = () => {
    if (item.quantity === 0) {
      return;
    }
    item.quantity -= 1;

    if (item.quantity === 0) {
      DeleteInventorySlot(character, item.id);
    }

    AddToLoot(item, session, websocket, character, isCreature);
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
      onClick={HandleMinusQuantity}
      onContextMenu={(e) => {
        e.preventDefault();
        HandleAddQuantity();
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
        {item.quantity}
        <span style={{ color: "rgba(255, 255, 255, 0.2)", fontSize: "10px" }}>
          x
        </span>
      </div>
      <div
        className="row"
        style={{
          color: "rgba(255, 255, 255, 0.2)",
          fontSize: "10px",
        }}
      >
        Qty
      </div>
    </div>
  );
}
