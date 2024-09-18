import * as Constants from "../Constants";
import "../Styles.css";

import { CharacterEntry, ItemEntry, SessionEntry } from "../Types";

import { Socket } from "socket.io-client";

interface QuantityComponentProps {
  item: ItemEntry;
  session: SessionEntry;
  websocket: Socket;
  isCreature: boolean;
  character: CharacterEntry;
}

export default function QuantityComponent({ item }: QuantityComponentProps) {
  return (
    <div
      className="column"
      style={{
        minWidth: "45px",
        maxWidth: "45px",
        borderLeft: "1px solid",
        borderColor: "rgba(0, 0, 0, 0.25)",
        borderRadius: "0px",
        justifyContent: "center",
        gap: "0px",
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
