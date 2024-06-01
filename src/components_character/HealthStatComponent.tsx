import styled from "styled-components";
import * as Constants from "../Constants";
import { CharacterEntry, SessionEntry } from "../Types";
import { GetMaxToughness } from "../functions/RulesFunctions";
import { update_session } from "../functions/SessionsFunctions";

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
  const handleAddToughness = () => {
    if (character.health.damage > 0) {
      character.health.damage -= 1;
    }
    update_session(session, websocket, character, isCreature);
  };

  const handleSubToughness = () => {
    const maxToughness =
      character.stats.strong.value < 10 ? 10 : character.stats.strong.value;

    const value_step = 1;

    if (character.health.damage === maxToughness) {
      console.log("Max damage reached");
    } else {
      character.health.damage += value_step;
    }
    update_session(session, websocket, character, isCreature);
  };

  const maxToughness = GetMaxToughness(character);

  const damage_toughness = character.health.damage;
  const remaining_toughness = maxToughness - character.health.damage;

  return (
    <div
      className="row base_color"
      style={{ height: "100%", padding: "1px", gap: "1px" }}
    >
      <div
        className="row button-hover button_color"
        style={{ maxWidth: "30px" }}
        onClick={handleSubToughness}
      >
        <FontAwesomeIcon
          icon={faMinus}
          color={Constants.WIDGET_SECONDARY_FONT_INACTIVE}
        />
      </div>
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
          }}
        >
          {`${remaining_toughness} / ${remaining_toughness + damage_toughness}`}
        </div>
      </div>
      <div
        className="row button-hover button_color"
        style={{ maxWidth: "30px" }}
        onClick={handleAddToughness}
      >
        <FontAwesomeIcon
          icon={faPlus}
          color={Constants.WIDGET_SECONDARY_FONT_INACTIVE}
        />
      </div>
    </div>
  );
}

export default HealthStatComponent;
