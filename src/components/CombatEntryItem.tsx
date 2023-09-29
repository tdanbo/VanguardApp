import * as Constants from "../Constants";
import { CombatEntry } from "../Types";
import styled from "styled-components";

import { UpperFirstLetter } from "../functions/UtilityFunctions";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CharacterPortraits } from "../Images";
interface CombatEntryItemProps {
  combatEntry: CombatEntry;
  index: number;
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

  width: 50%;
  max-height: 200px;
  min-height: 200px;
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

const ResultContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Result = styled.div<ColorTypeProps>`
  display: flex;
  flex-grow: 1;
  flex: 2;
  justify-content: center;
  align-items: flex-end;
  width: 100px;
  height: 100%;
  font-size: 3.5rem;
  font-weight: bold;
  color: ${(props) =>
    props.$issuccess
      ? Constants.WIDGET_PRIMARY_FONT
      : Constants.WIDGET_PRIMARY_FONT};

  opacity: ${(props) => (props.$issuccess ? 1 : 1.0)};

  text-shadow: 2px 2px 2px ${Constants.BACKGROUND};
`;

const Active = styled.div<ColorTypeProps>`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  font-size: 1.5rem;
  font-weight: bold;
  color: ${(props) => props.$rgb};
  text-shadow: 2px 2px 2px ${Constants.BACKGROUND};
`;

const Source = styled.div<ColorTypeProps>`
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: bold;
  height: 50px;
  color: ${Constants.WIDGET_SECONDARY_FONT};
`;

function CombatEntryItem({ combatEntry }: CombatEntryItemProps) {
  const EntryColor = () => {
    return (
      Constants.TYPE_COLORS[combatEntry.active.toLowerCase()] ||
      Constants.WIDGET_SECONDARY_FONT
    );
  };

  let modifierText = "";
  if (combatEntry.modifier > 0) {
    modifierText = `+${combatEntry.modifier}`;
  } else if (combatEntry.modifier < 0) {
    modifierText = `${combatEntry.modifier}`;
  }

  let title = `Roll: ${combatEntry.roll}\n`;

  if (combatEntry.source !== "Skill Test") {
    title += `Modifier: ${combatEntry.modifier}\n`;
  }

  if (combatEntry.target > 0) {
    title += `Target: ${combatEntry.target}`;
  }

  return (
    <Container src={CharacterPortraits[combatEntry.portrait]}>
      <ColorBlock $rgb={EntryColor()} $issuccess={combatEntry.success} />
      <ResultContainer>
        <Result
          title={title}
          $rgb={EntryColor()}
          $issuccess={combatEntry.success}
        >
          {combatEntry.result}
        </Result>

        {combatEntry.source === "Skill Test" ? (
          <Active $rgb={EntryColor()} $issuccess={combatEntry.success}>
            {modifierText} {UpperFirstLetter(combatEntry.active)}{" "}
          </Active>
        ) : (
          <Active $rgb={EntryColor()} $issuccess={combatEntry.success}>
            {UpperFirstLetter(combatEntry.active)}
          </Active>
        )}

        <Source $rgb={EntryColor()} $issuccess={combatEntry.success}>
          {UpperFirstLetter(combatEntry.source)}
          {combatEntry.source === "Skill Test" ? (
            combatEntry.success ? (
              <FontAwesomeIcon
                icon={faCheck}
                color="#5cb57c"
                style={{
                  fontSize: "20px",
                  position: "relative",
                  top: "4px",
                  left: "5px",
                }}
              />
            ) : (
              <FontAwesomeIcon
                icon={faXmark}
                color="#b55c5c"
                style={{
                  fontSize: "20px",
                  position: "relative",
                  top: "4px",
                  left: "5px",
                }}
              />
            )
          ) : null}
        </Source>
      </ResultContainer>
    </Container>
  );
}

export default CombatEntryItem;
