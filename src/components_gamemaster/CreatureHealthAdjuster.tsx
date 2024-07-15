import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Socket } from "socket.io-client";
import { CharacterEntry, SessionEntry } from "../Types";
import { GetMaxToughness } from "../functions/RulesFunctions";
import { GetCreatureArmor } from "../functions/CharacterFunctions";
import * as Constants from "../Constants";
import { useEffect } from "react";
import {
  faCircleHalfStroke,
  faShield,
} from "@fortawesome/free-solid-svg-icons";

interface CreatureHealthAdjusterProps {
  creature: CharacterEntry;
  session: SessionEntry;
  websocket: Socket;
  submit_adjust_hp: any;
}

function CreatureHealthAdjuster({
  creature,
  submit_adjust_hp,
}: CreatureHealthAdjusterProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const pain = Math.ceil(creature.stats.strong.value / 2);
  const [useArmor, setUseArmor] = useState<boolean>(true);
  const [useHalf, setUseHalf] = useState<boolean>(false);

  const [damage, setDamage] = useState<number>(0);
  const [damageAdjustment, setDamageAdjustment] = useState<number>(0);

  useEffect(() => {
    // Recalculate adjustedDamage here

    let calculateDamage = damage;

    if (useArmor) {
      calculateDamage -= GetCreatureArmor(creature);
    }

    if (useHalf) {
      calculateDamage = Math.ceil(calculateDamage / 2);
    }

    if (calculateDamage < 0) {
      calculateDamage = 0;
    }

    setDamageAdjustment(calculateDamage);
  }, [useArmor, useHalf, damage]);

  const handleOpen = () => {
    setDamage(0);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleDamageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let damage = parseInt(e.target.value);

    if (!/^\d*$/.test(e.target.value)) {
      // If the value is not a number, don't update the state
      return;
    }

    if (e.target.value === "") {
      damage = 0;
    }

    setDamage(damage);
  };

  const handleSingleDamageChange = (add: boolean) => {
    let newDamage = damage;
    if (add) {
      newDamage += 1;
    } else {
      newDamage -= 1;
    }

    if (newDamage < 0) {
      newDamage = 0;
    }

    setDamage(newDamage);
  };

  const handleUseArmor = () => {
    setUseArmor(!useArmor);
  };

  const handleUseHalf = () => {
    setUseHalf(!useHalf);
  };

  const submitGainOneHp = () => {
    // Determine the damage adjustment
    submit_adjust_hp(-1);
    setIsModalOpen(false);
  };

  const submitLoseOneHp = () => {
    // Determine the damage adjustment
    submit_adjust_hp(1);
    setIsModalOpen(false);
  };

  const submitDamageChange = () => {
    // Determine the damage adjustment
    submit_adjust_hp(damageAdjustment);
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className="row bg--primary-2 border"
        style={{ gap: "0px", maxWidth: "100px" }}
      >
        <div
          className="row button"
          style={{ minWidth: "20px", height: "40px" }}
          onClick={submitLoseOneHp}
        >
          -
        </div>
        <div
          className="row "
          style={{
            minWidth: "45px",
            height: "40px",
            userSelect: "none",
            fontSize: "18px",
          }}
          onClick={handleOpen}
          title={"Pain Threshold: " + pain}
        >
          {GetMaxToughness(creature) - creature.health.damage}
        </div>
        <div
          className="row  button"
          style={{ minWidth: "20px", height: "40px" }}
          onClick={submitGainOneHp}
        >
          +
        </div>
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
            style={{ maxWidth: "20%", maxHeight: "30%", padding: "20px" }}
            onClick={stopPropagation}
          >
            <div className="row" style={{ fontSize: "25px", height: "20%" }}>
              {creature.name}
            </div>
            <div
              className="column empty_color"
              style={{ padding: "10px", height: "60%" }}
            >
              <div className="row">
                <div
                  className="row empty_color"
                  style={{ width: "50%", padding: "5px" }}
                >
                  <div
                    className="row empty_color button"
                    onClick={() => handleSingleDamageChange(false)}
                  >
                    -
                  </div>
                  <input
                    className="row empty_color"
                    type="text"
                    onChange={handleDamageChange}
                    value={damage}
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
                    className="row empty_color button"
                    onClick={() => handleSingleDamageChange(true)}
                  >
                    +
                  </div>
                </div>
                <div
                  className="row"
                  style={{
                    fontSize: "40px",
                    width: "50%",
                    border: "1px solid #923333",
                    background: "#4d1b1b",
                  }}
                >
                  {damageAdjustment}
                </div>
              </div>
              <div className="row">
                <div
                  className="row empty_color button"
                  style={
                    useHalf
                      ? {
                          background: "#252827",
                          color: Constants.WIDGET_PRIMARY_FONT,
                          border: "1px solid #303332",
                        }
                      : {
                          background: "#191c1b",
                          color: Constants.WIDGET_SECONDARY_FONT_INACTIVE,
                          border: "1px solid #303332",
                        }
                  }
                  onClick={handleUseHalf}
                >
                  Half <FontAwesomeIcon icon={faCircleHalfStroke} />
                </div>
                <div
                  className="row empty_color button"
                  style={
                    useArmor
                      ? {
                          background: "#252827",
                          color: Constants.WIDGET_PRIMARY_FONT,
                          border: "1px solid #303332",
                        }
                      : {
                          background: "#191c1b",
                          color: Constants.WIDGET_SECONDARY_FONT_INACTIVE,
                          border: "1px solid #303332",
                        }
                  }
                  onClick={handleUseArmor}
                >
                  Armor <FontAwesomeIcon icon={faShield} />
                </div>
              </div>
            </div>
            <div
              className="row empty_color"
              style={{ padding: "10px", height: "20%" }}
            >
              <div className="row button_color button" onClick={handleClose}>
                Cancel
              </div>
              <div
                className="row button_color button"
                onClick={submitDamageChange}
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
export default CreatureHealthAdjuster;
