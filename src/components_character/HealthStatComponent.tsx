import styled from "styled-components";
import * as Constants from "../Constants";
import { CharacterEntry, SessionEntry } from "../Types";
import { GetMaxToughness } from "../functions/RulesFunctions";

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
import {
  LowerToughness,
  RaiseToughness,
} from "../functions/CharacterFunctions";

interface HealthBoxProps {
  character: CharacterEntry;
  session: SessionEntry;
  websocket: Socket;
  isCreature: boolean;
  browser: boolean;
}

function HealthStatComponent({
  character,
  session,
  websocket,
  isCreature,
}: HealthBoxProps) {
  const [isHovered, setIsHovered] = useState(false);

  const maxToughness = GetMaxToughness(character);
  const damage_toughness = character.health.damage;
  const remaining_toughness = maxToughness - character.health.damage;

  return (
    <div
      className="row base_color"
      style={{ height: "100%", padding: "1px", gap: "1px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered ? (
        <div
          className="row button-hover button_color"
          style={{ maxWidth: "30px" }}
          onClick={() =>
            LowerToughness(character, session, websocket, isCreature)
          }
        >
          <FontAwesomeIcon
            icon={faMinus}
            color={Constants.WIDGET_SECONDARY_FONT_INACTIVE}
          />
        </div>
      ) : null}
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <div className="row" style={{ gap: "0px", padding: "1px" }}>
          {Array.from({ length: remaining_toughness }).map(
            (_, index, array) => {
              return (
                <TickBar
                  key={index}
                  $bgcolor={Constants.TYPE_COLORS["health"]}
                  $isFirst={index === 0} // Apply rounded corners on the left for the first item
                  $isLast={index === array.length - 1}
                />
              );
            },
          )}
          {Array.from({ length: damage_toughness }).map((_, index, array) => {
            return (
              <TickBar
                key={index}
                $bgcolor={Constants.BACKGROUND}
                $isFirst={index === 0} // Apply rounded corners on the left for the first item
                $isLast={index === array.length - 1} // Apply rounded corners on the right for the last item
              />
            );
          })}
        </div>

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
          {`${remaining_toughness} / ${remaining_toughness + damage_toughness}`}
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
            TOUGHNESS
          </div>
        </div>
      </div>
      {isHovered ? (
        <div
          className="row button-hover button_color"
          style={{ maxWidth: "30px" }}
          onClick={() =>
            RaiseToughness(character, session, websocket, isCreature)
          }
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

export default HealthStatComponent;
