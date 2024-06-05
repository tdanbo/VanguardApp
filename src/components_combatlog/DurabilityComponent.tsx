import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldAlt, faShieldHalved } from "@fortawesome/free-solid-svg-icons";
import * as Constants from "../Constants";
import Icon from "@mdi/react";
import { mdiShieldOff } from "@mdi/js";
import { ItemEntry } from "../Types";

interface DurabilityComponentProps {
  item: ItemEntry;
}

export function DurabilityComponent({ item }: DurabilityComponentProps) {
  return (
    <div
      className="row base_color"
      style={{ width: "90%", fontSize: "14px", padding: "8px" }}
    >
      <div style={{ height: "100%", width: "20%" }}>
        <Icon path={mdiShieldOff} size={0.8} color={Constants.BRIGHT_RED} />
      </div>
      <div className="columnm " style={{ width: "60%" }}>
        <div className="row ">{item.name}</div>
        <div
          className="row"
          style={{
            color: Constants.WIDGET_SECONDARY_FONT,

            fontSize: "10px",
          }}
        >
          {item.equipped ? "Equipped" : "Inventory"}
        </div>
      </div>
      <div
        className="row"
        style={{
          color: Constants.WIDGET_SECONDARY_FONT_INACTIVE,
          height: "100%",
          width: "20%",
          alignItems: "flex-start",
          justifyContent: "flex-end",
        }}
      >
        {item.owner}
      </div>
    </div>
  );
}
