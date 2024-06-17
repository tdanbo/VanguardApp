import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { update_session } from "../functions/SessionsFunctions";
import { Socket } from "socket.io-client";
import { SessionEntry, CharacterEntry } from "../Types";
import * as Constants from "../Constants";

type AdjustmentType = "rations" | "coins";

interface ValueAdjustComponentProps {
  type: AdjustmentType;
  session: SessionEntry;
  websocket: Socket;
  character: CharacterEntry;
  isCreature: boolean;
}

function ValueAdjustComponent({
  type,
  session,
  websocket,
  character,
  isCreature,
}: ValueAdjustComponentProps) {
  const [value, setValue] = useState<number>(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleSingleValueChange = (add: boolean) => {
    let newValue = value;
    if (add) {
      newValue += 1;
    } else {
      newValue -= 1;
    }

    setValue(newValue);
  };

  const submitValueChange = () => {
    // Determine the damage adjustment
    if (type === "rations") {
      character.rations += value;
    } else if (type === "coins") {
      character.coins += value;
    }
    update_session(session, websocket, character, isCreature);
    setIsModalOpen(false);
  };

  const handleOpen = () => {
    setValue(0);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setValue(0);
    setIsModalOpen(false);
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value);

    if (!/^\d*$/.test(e.target.value)) {
      // If the value is not a number, don't update the state
      return;
    }

    if (e.target.value === "") {
      value = 0;
    }

    setValue(value);
  };

  return (
    <>
      <div
        className="row button_color button"
        style={{ width: "30px" }}
        onClick={handleOpen}
      >
        <FontAwesomeIcon icon={faEllipsis} style={{ fontSize: "14px" }} />
      </div>
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.50)",
            zIndex: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            className="column empty_color"
            style={{ maxWidth: "15%", maxHeight: "20%", padding: "5px" }}
            onClick={stopPropagation}
          >
            <div className="row" style={{ fontSize: "25px" }}>
              {type === "coins" ? "Thaler" : "Coins"}
            </div>
            <div className="row empty_color" style={{ padding: "5px" }}>
              <div className="row">
                <div
                  className="row button_color button"
                  onClick={() => handleSingleValueChange(false)}
                >
                  -
                </div>
                <input
                  className="row empty_color"
                  type="text"
                  onChange={handleValueChange}
                  value={value}
                  style={{
                    fontSize: "40px",
                    minWidth: "50%",
                    padding: "0px",
                    color: Constants.WIDGET_SECONDARY_FONT,
                    textAlign: "center",
                    border: "none",
                  }}
                />
                <div
                  className="row button_color button"
                  onClick={() => handleSingleValueChange(true)}
                >
                  +
                </div>
              </div>
            </div>
            <div className="row empty_color" style={{ padding: "5px" }}>
              <div className="row button_color button" onClick={handleClose}>
                Cancel
              </div>
              <div
                className="row button_color button"
                onClick={submitValueChange}
              >
                Submit
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ValueAdjustComponent;
