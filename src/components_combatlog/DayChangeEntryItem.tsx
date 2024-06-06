import {
  faAngleDoubleDown,
  faAngleDoubleUp,
  faCheck,
  faMoon,
  faSun,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import styled from "styled-components";
import "../App.css";
import * as Constants from "../Constants";
import { CharacterPortraits, NewDayIcon } from "../Images";
import { CombatEntry, SessionEntry, DayReportEntry } from "../Types";
import { toTitleCase } from "../functions/UtilityFunctions";
import Icon from "@mdi/react";
import { mdiShieldOff } from "@mdi/js";
import { DurabilityComponent } from "./DurabilityComponent";
interface DayChangeEntryItemProps {
  combatEntry: CombatEntry;
  index: number;
  session: SessionEntry;
}

interface ColorTypeProps {
  $rgb: string;
  $issuccess: boolean;
}

interface PortraitProps {
  src: string;
}

const Container = styled.div<PortraitProps>`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  border-radius: ${Constants.BORDER_RADIUS};

  color: ${Constants.WIDGET_PRIMARY_FONT};
  background: linear-gradient(
      rgba(${Constants.COMBAT_BACKGROUND}, 0.925),
      rgba(${Constants.COMBAT_BACKGROUND}, 0.925)
    ),
    url(${(props) => props.src});
  background-size: cover;
  background-position: center 25%;
  border: 1px solid ${Constants.WIDGET_BORDER};
`;

const ColorBlock = styled.div<ColorTypeProps>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: ${(props) => props.$rgb};
  width: 20px;
  max-width: 20px;
  margin: 1px 1px 1px 1px;
  border: 1px solid ${Constants.WIDGET_BORDER};
  border-radius: ${Constants.BORDER_RADIUS} 0px 0px ${Constants.BORDER_RADIUS};
`;

const RightBlock = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 20px;
  max-width: 20px;
  margin: 1px 1px 1px 1px;
  padding-right: 8px;
  padding-top: 5px;
  gap: 5px;
`;

const RollContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const ResultContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
`;

interface ResultProps {
  $position: 0 | 1 | 2;
}
const Result = styled.div<ResultProps>`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  justify-content: ${(props) =>
    props.$position === 0
      ? "flex-end"
      : props.$position === 1
      ? "flex-start"
      : "center"};


  font-size: 3.5rem;
  font-weight: bold;
  width: 100%;

  color: ${Constants.WIDGET_PRIMARY_FONT}
  text-shadow: 2px 2px 2px ${Constants.BACKGROUND};
`;

const FumbledSubText = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: ${Constants.WIDGET_SECONDARY_FONT};
  min-height: 20px;
  max-height: 20px;
  width: 100%;
`;

const Breakdown = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: ${Constants.WIDGET_SECONDARY_FONT};
  min-height: 20px;
  max-height: 20px;
`;

const SourceContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 14px;
  color: ${Constants.WIDGET_SECONDARY_FONT};
`;

const Active = styled.div<ColorTypeProps>`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => props.$rgb};
  text-shadow: 2px 2px 2px ${Constants.BACKGROUND};
  width: 50%;
`;

const ResultDivider = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${Constants.WIDGET_SECONDARY_FONT_INACTIVE};
  text-shadow: 2px 2px 2px ${Constants.BACKGROUND};
  width: 1px;
  height: 60%;
  margin: 10px 0px 0px 0px;
`;

function DayChangeEntryItem({ combatEntry }: DayChangeEntryItemProps) {
  const EntryColor = () => {
    return (
      Constants.TYPE_COLORS[combatEntry.roll_type.toLowerCase()] ||
      Constants.WIDGET_SECONDARY_FONT
    );
  };

  return (
    <Container src={NewDayIcon}>
      <ColorBlock
        $rgb={EntryColor()}
        $issuccess={combatEntry.roll_entry.success}
      />
      <RollContainer>
        <div className="column">
          <FontAwesomeIcon
            icon={faSun}
            size="xl"
            color={Constants.BRIGHT_YELLOW}
          />
          <div style={{ fontSize: "25px", fontWeight: "bold" }}>
            {combatEntry.roll_source}
          </div>
          <div
            style={{
              fontSize: "12px",
            }}
          >
            +5 Experience
          </div>
          <div
            className="row"
            style={{
              width: "80%",
              textAlign: "center",
              color: Constants.WIDGET_SECONDARY_FONT,
              fontSize: "14px",
              marginTop: "5px",
            }}
          >
            As the sun rises and sets, another day of adventuring passes. The
            following items have lost 1 durability due to wear and tear.
          </div>
          <div className="column" style={{ margin: "10px" }}>
            {combatEntry.durability.map((item, index) => {
              return <DurabilityComponent item={item} key={index} />;
            })}
          </div>
        </div>
      </RollContainer>
    </Container>
  );
}

export default DayChangeEntryItem;
