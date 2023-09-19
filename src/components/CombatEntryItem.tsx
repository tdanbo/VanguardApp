import * as Constants from "../Constants";
import { CombatEntry } from "../Types";
import styled from "styled-components";

import { UpperFirstLetter } from "../functions/UtilityFunctions";

interface CombatEntryItemProps {
  combatEntry: CombatEntry;
  index: number;
}

const Container = styled.div`
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
    url("src/assets/characters/portrait2.jpeg");
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

const Active = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: right;
  align-items: flex-end;
  font-size: 1.25rem;
  font-weight: bold;
  height: 50px;

  h2 {
    color: ${Constants.WIDGET_SECONDARY_FONT};
    font-size: 12px;
  }
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
  h2 {
    color: ${Constants.WIDGET_SECONDARY_FONT};
    font-size: 12px;
  }
`;

//

function CombatEntryItem({ combatEntry, index }: CombatEntryItemProps) {
  const EntryColor = () => {
    return Constants.TYPE_COLORS[combatEntry.type] || Constants.BORDER_DARK;
  };

  let modifierText = "";
  if (combatEntry.modifier > 0) {
    modifierText = `+${combatEntry.modifier}`;
  } else if (combatEntry.modifier < 0) {
    modifierText = `${combatEntry.modifier}`;
  }

  return (
    <Container>
      <Active>
        <h1>{UpperFirstLetter(combatEntry.type)}</h1>
        <h2>{modifierText}</h2>
      </Active>
      <Result
        title={
          combatEntry.add
            ? `Dice: 1${combatEntry.dice}\nRoll: ${
                combatEntry.result - combatEntry.modifier
              }\nRoll Modified: ${combatEntry.modifier}\nResult: ${
                combatEntry.result
              }`
            : `Dice: 1${combatEntry.dice}\nRoll: ${combatEntry.result}\nRoll Modified: 0\nResult: ${combatEntry.result}`
        }
      >
        {combatEntry.result}
      </Result>
      <Outcome>
        <h1>{(combatEntry.success && "Success") || "Failure"}</h1>
        <h2>Target {combatEntry.target}</h2>
      </Outcome>
      {/* <div className="flex flex-grow flex-col justify-center">
        <div className="text-m flex items-center justify-center font-bold uppercase ">
          {combatEntry.modifier > 0
            ? `+${combatEntry.modifier}`
            : combatEntry.modifier === 0
            ? ""
            : `${combatEntry.modifier}`}{" "}
          {combatEntry.type}
        </div>
        {combatEntry.success === true ? (
          <div className="flex items-center justify-center text-sm">
            {combatEntry.character}
          </div>
        ) : (
          <div className="flex items-center justify-center text-sm">
            {combatEntry.character}
          </div>
        )}
      </div> */}
    </Container>
  );
}

export default CombatEntryItem;
