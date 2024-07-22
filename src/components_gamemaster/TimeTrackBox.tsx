import { useState } from "react";
import { Socket } from "socket.io-client";
import styled from "styled-components";
import * as Constants from "../Constants";
import { NewCharacterEntry, SessionEntry, TimeCategory } from "../Types";
import { update_session } from "../functions/SessionsFunctions";
import { v4 as uuidv4 } from "uuid";
import { CombatEntry } from "../Types";
import { DurabilityReport } from "../functions/UtilityFunctions";

import {
  toTitleCase,
  LowerEnergy,
  RaiseEnergy,
} from "../functions/UtilityFunctions";
import { forEach } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

interface HourContainerProps {
  "data-isactive": boolean;
}

const HourContainer = styled.button<HourContainerProps>`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid ${Constants.WIDGET_BACKGROUND_EMPTY};
  font-size: 12px;
  color: ${(props) =>
    props["data-isactive"]
      ? Constants.WIDGET_PRIMARY_FONT
      : Constants.WIDGET_BACKGROUND};
  background-color: ${(props) =>
    props["data-isactive"]
      ? Constants.WIDGET_BACKGROUND
      : Constants.WIDGET_BACKGROUND_EMPTY};
  border-radius: ${Constants.BORDER_RADIUS};
  height: 100%;
`;

interface TimeTrackBoxProps {
  session: SessionEntry;
  websocket: Socket;
}

function TimeTrackBox({ session, websocket }: TimeTrackBoxProps) {
  // Ensure that the initial value is a valid hour (0-23); otherwise, set it to null
  const [activeHour, setActiveHour] = useState<TimeCategory>(
    session.travel.time,
  );

  const passTimeForward = () => {
    forEach(session.characters, (character) => {
      LowerEnergy(character);

      if (session.travel.time === "night") {
        character.details.xp_earned += 5;
      }
    });

    if (session.travel.time === "night") {
      session.travel.time = "morning";
      session.travel.day += 1;
      const day_log: CombatEntry = {
        character: NewCharacterEntry,
        roll_type: "day",
        roll_source: `Day ${session.travel.day}`,
        roll_state: "",
        roll_entry: {
          result1: 0,
          result2: 0,
          roll1: 0,
          roll2: 0,
          advantage: "",
          critical: { state: 1, result: 0 },
          mod: 0,
          target: 0,
          success: true,
          dice: [0],
        },
        durability: DurabilityReport(session),
        uuid: uuidv4(),
        entry: "CombatEntry",
      };
      session.combatlog.push(day_log);
      session.combatlog = session.combatlog.slice(-20);

      session.travel.damage_gain = 0;
      session.travel.corruption_gain = 0;
      setActiveHour("morning");
    } else if (session.travel.time === "morning") {
      session.travel.time = "afternoon";
      setActiveHour("afternoon");
    } else if (session.travel.time === "afternoon") {
      session.travel.time = "evening";
      setActiveHour("evening");
    } else if (session.travel.time === "evening") {
      session.travel.time = "night";
      setActiveHour("night");
    }
    update_session(session, websocket, NewCharacterEntry, false);
  };

  const passTimeBackward = () => {
    forEach(session.characters, (character) => {
      RaiseEnergy(character);
      if (session.travel.time === "morning") {
        character.details.xp_earned -= 5;
      }
    });

    if (session.travel.time === "morning") {
      session.travel.time = "night";
      session.travel.day -= 1;
      setActiveHour("night");
    } else if (session.travel.time === "afternoon") {
      session.travel.time = "morning";
      setActiveHour("morning");
    } else if (session.travel.time === "evening") {
      session.travel.time = "afternoon";
      setActiveHour("afternoon");
    } else if (session.travel.time === "night") {
      session.travel.time = "evening";
      setActiveHour("evening");
    }
    update_session(session, websocket, NewCharacterEntry, false);
  };

  const time = ["morning", "afternoon", "evening", "night"];

  return (
    <>
      <div
        className="row base_color button"
        style={{ maxWidth: "50px" }}
        onClick={() => passTimeBackward()}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </div>
      {time.map((time, index) => (
        <HourContainer
          key={index}
          data-isactive={time === activeHour} // Use data-isactive instead of isactive
        >
          {toTitleCase(time)}
        </HourContainer>
      ))}
      <div
        className="row base_color button"
        style={{ maxWidth: "50px" }}
        onClick={() => passTimeForward()}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </div>
    </>
  );
}

export default TimeTrackBox;
