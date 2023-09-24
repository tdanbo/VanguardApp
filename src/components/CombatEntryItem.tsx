import * as Constants from "../Constants";
import { CombatEntry } from "../Types";
import styled from "styled-components";

import { UpperFirstLetter } from "../functions/UtilityFunctions";

interface CombatEntryItemProps {
  combatEntry: CombatEntry;
  index: number;
}

interface ColorTypeProps {
  $rgb: string;
}

interface PortraitProps {
  src: string;
}

const Container = styled.div<PortraitProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  border-radius: ${Constants.BORDER_RADIUS};
  border: 1px solid ${Constants.WIDGET_BORDER};
  width: 50%;
  height: 150px;
  padding: 20px;
  gap: 20px;
  color: ${Constants.WIDGET_PRIMARY_FONT};

  background: linear-gradient(
      rgba(${Constants.COMBAT_BACKGROUND}, 0.9),
      rgba(${Constants.COMBAT_BACKGROUND}, 0.9)
    ),
    url(${(props) => props.src});
  background-size: cover;
  background-position: center;
`;

const Result = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${Constants.WIDGET_BACKGROUND};
  width: 60px;
  height: 60px;
  border-radius: 50%;
  font-size: 1.75rem;
  font-weight: bold;
  border: 1px solid ${Constants.WIDGET_BORDER};
`;

const Active = styled.div<ColorTypeProps>`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: right;
  align-items: flex-end;
  font-size: 1.25rem;
  font-weight: bold;
  height: 50px;
  color: ${Constants.WIDGET_PRIMARY_FONT};
`;

const Outcome = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: left;
  align-items: flex-start;
  font-size: 1.25rem;
  font-weight: bold;
  height: 50px;
`;

const Dice = styled.h2`
  color: ${Constants.WIDGET_SECONDARY_FONT};
  font-size: 12px;
`;
const Source = styled.h2<ColorTypeProps>`
  color: ${Constants.WIDGET_SECONDARY_FONT};
  font-size: 12px;
`;

const TestResult = styled.h2<{ $issuccess: boolean }>`
  color: ${(props) =>
    props.$issuccess === true
      ? "rgb(64, 191, 96)"
      : props.$issuccess === false
      ? "rgb(191, 64, 64)"
      : Constants.WIDGET_SECONDARY_FONT};
  font-size: 12px;
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

  return (
    <Container src={combatEntry.portrait}>
      <Active $rgb={EntryColor()}>
        <h1>{UpperFirstLetter(combatEntry.character)}</h1>
        {combatEntry.source === "Skill Test" ? (
          <TestResult $issuccess={combatEntry.success}>
            {combatEntry.source}
          </TestResult>
        ) : (
          <Source $rgb={EntryColor()}>{combatEntry.source}</Source>
        )}
      </Active>
      <Result>{combatEntry.result}</Result>
      <Outcome>
        <h1>
          {UpperFirstLetter(combatEntry.active)} {modifierText}
        </h1>
        {combatEntry.source === "Skill Test" ? (
          <TestResult $issuccess={combatEntry.success}>
            {combatEntry.success ? "Success" : "Failure"}
          </TestResult>
        ) : (
          <Dice>{combatEntry.dice}</Dice>
        )}
      </Outcome>
    </Container>
  );
}

export default CombatEntryItem;
