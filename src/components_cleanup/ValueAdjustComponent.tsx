import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Socket } from "socket.io-client";
import * as Constants from "../Constants";
import { update_session } from "../functions/SessionsFunctions";
import { CharacterEntry, SessionEntry } from "../Types";

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
  const [inputValue, setInputValue] = useState<string>("0");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleSingleValueChange = (add: boolean) => {
    let newValue = parseInt(inputValue, 10);
    if (add) {
      newValue += 1;
    } else {
      newValue -= 1;
    }

    setInputValue(newValue.toString());
  };

  const submitValueChange = () => {
    const parsedValue = parseInt(inputValue, 10);

    if (type === "rations") {
      character.rations = Math.max(0, character.rations + parsedValue);
    } else if (type === "coins") {
      character.coins = Math.max(0, character.coins + parsedValue);
    }

    update_session(session, websocket, character, isCreature);
    setIsModalOpen(false);
  };

  const handleOpen = () => {
    setInputValue("0");
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setInputValue("0");
    setIsModalOpen(false);
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Check if the value is a valid number or just a minus sign
    if (!/^-?\d*$/.test(value)) {
      // If the value is not a valid number, don't update the state
      return;
    }

    // Update the input value state
    setInputValue(value);
  };

  // Convert the input value to a number when the input loses focus
  const handleBlur = () => {
    const numericValue = parseInt(inputValue, 10);
    setInputValue(numericValue.toString());
  };

  return (
    <>
      <div
        className="button bg--primary-4 border"
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
                  value={inputValue}
                  onChange={handleValueChange}
                  onBlur={handleBlur}
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
