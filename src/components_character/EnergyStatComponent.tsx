import styled from "styled-components";
import * as Constants from "../Constants";
import { CharacterEntry, SessionEntry } from "../Types";
import { update_session } from "../functions/SessionsFunctions";
import { LowerEnergy, RaiseEnergy } from "../functions/UtilityFunctions";

interface BgColor {
  $bgcolor: string;
  $isFirst?: boolean;
  $isLast?: boolean;
}

const TickBar = styled.div<BgColor>`
  display: flex;
  flex-grow: 1;
  height: 100%;
  background-color: ${(props) => props.$bgcolor};
  border-right: 1px solid ${Constants.WIDGET_BORDER};
  border-top: 1px solid ${Constants.WIDGET_BORDER};
  border-bottom: 1px solid ${Constants.WIDGET_BORDER};
  cursor: pointer;
  border-radius: ${Constants.BORDER_RADIUS};
  border-top-left-radius: ${(props) =>
    props.$isFirst ? Constants.BORDER_RADIUS : "0"};
  border-bottom-left-radius: ${(props) =>
    props.$isFirst ? Constants.BORDER_RADIUS : "0"};
  border-top-right-radius: ${(props) =>
    props.$isLast ? Constants.BORDER_RADIUS : "0"};
  border-bottom-right-radius: ${(props) =>
    props.$isLast ? Constants.BORDER_RADIUS : "0"};
  border-left: ${(props) =>
    props.$isFirst ? "1px solid " + Constants.WIDGET_BORDER : "0"};
`;

import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Socket } from "socket.io-client";
import { useState } from "react";

interface EnergyBoxProps {
  character: CharacterEntry;
  session: SessionEntry;
  websocket: Socket;
  isCreature: boolean;
  browser: boolean;
}

function EnergyStatComponent({
  character,
  session,
  websocket,
  isCreature,
}: EnergyBoxProps) {
  const [isHovered, setIsHovered] = useState(false);

  const LowerEnergyStatus = () => {
    LowerEnergy(character);
    update_session(session, websocket, character, isCreature);
  };

  const RaiseEnergyStatus = () => {
    RaiseEnergy(character);
    update_session(session, websocket, character, isCreature);
  };

  const maxEnergy = Constants.MAX_ENERGY - character.health.energy;

  return (
    <div
      className="row base_color"
      style={{ padding: "1px", gap: "1px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered ? (
        <div
          className="row button-hover button_color"
          style={{
            maxWidth: "20px",
          }}
          onClick={LowerEnergyStatus}
        >
          <FontAwesomeIcon
            icon={faMinus}
            color={Constants.WIDGET_SECONDARY_FONT_INACTIVE}
          />
        </div>
      ) : null}
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <div className="row" style={{ gap: "0px", padding: "1px" }}>
          {character.health.energy < 0 ? (
            <div
              className="row"
              style={{
                background: Constants.BACKGROUND,
                color: Constants.BRIGHT_RED,
                fontSize: "17px",
                fontWeight: "bold",
              }}
            >
              Exhausted
            </div>
          ) : (
            <>
              {Array.from({ length: character.health.energy }).map(
                (_, index, array) => {
                  return (
                    <TickBar
                      key={index}
                      $bgcolor={Constants.TYPE_COLORS["energy"]}
                      $isFirst={index === 0} // Apply rounded corners on the left for the first item
                      $isLast={index === array.length - 1} // Apply rounded corners on the right for the last item
                    />
                  );
                },
              )}
              {Array.from({ length: maxEnergy }).map((_, index, array) => {
                return (
                  <TickBar
                    key={index}
                    $bgcolor={Constants.BACKGROUND}
                    $isFirst={index === 0} // Apply rounded corners on the left for the first item
                    $isLast={index === array.length - 1} // Apply rounded corners on the right for the last item
                  />
                );
              })}
            </>
          )}
        </div>
        {character.health.energy >= 0 ? (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: Constants.WIDGET_PRIMARY_FONT,
              textShadow: "2px 2px 2px black",
              fontSize: "18px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {`${character.health.energy} / 4`}
            <div
              style={{
                fontSize: "10px",
                marginTop: "-2px",
                alignItems: "center",
                justifyContent: "center",
                textShadow: "0px 0px 0px black",
                color: Constants.WIDGET_SECONDARY_FONT,
              }}
            >
              ENERGY
            </div>
          </div>
        ) : null}
      </div>
      {isHovered ? (
        <div
          className="row button-hover button_color"
          style={{
            maxWidth: "20px",
            visibility: isHovered ? "visible" : "hidden",
          }}
          onClick={RaiseEnergyStatus}
        >
          <FontAwesomeIcon
            icon={faPlus}
            color={Constants.WIDGET_SECONDARY_FONT_INACTIVE}
          />
        </div>
      ) : null}
    </div>
  );
}

export default EnergyStatComponent;
