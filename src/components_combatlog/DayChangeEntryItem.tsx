import { faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import "../App.css";
import * as Constants from "../Constants";
import { NewDayIcon } from "../Images";
import { CombatEntry, SessionEntry } from "../Types";
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
  min-width: 20px;
  max-width: 20px;
  margin: 1px 1px 1px 1px;
  border: 1px solid ${Constants.WIDGET_BORDER};
  border-radius: ${Constants.BORDER_RADIUS} 0px 0px ${Constants.BORDER_RADIUS};
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
            As the sun rises and sets, another day of adventuring passes.{" "}
            {combatEntry.durability.length > 0
              ? "The following items have lost 1 durability due to wear and tear."
              : "No items were damaged during the day."}
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
