import * as Constants from "../Constants";
import { CombatEntry } from "../Types";
import styled from "styled-components";

interface CombatEntryItemProps {
  combatEntry: CombatEntry;
  index: number;
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content:;
  background-color: ${Constants.WIDGET_BACKGROUND};
  border-radius: ${Constants.BORDER_RADIUS};
  border: 1px solid ${Constants.WIDGET_BORDER};
  width: 50%;
  max-height: 100px;
  height: 100px;
  color: ${Constants.WIDGET_PRIMARY_FONT};

  background-image: url("src/assets/characters/portrait2.jpeg");
  background-size: cover;
  background-position: center;
  border-radius: ${Constants.BORDER_RADIUS};
`;

function CombatEntryItem({ combatEntry, index }: CombatEntryItemProps) {
  const EntryColor = () => {
    return Constants.TYPE_COLORS[combatEntry.type] || Constants.BORDER_DARK;
  };

  return (
    <Container>
      <div
        className="flex items-center justify-center rounded text-lg font-bold"
        style={{
          backgroundColor: EntryColor(),
          color: Constants.FONT_LIGHT,
          aspectRatio: "1/1",
          borderColor: "#000000",
          border: `1px solid ${Constants.BORDER}`,
        }}
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
      </div>
      <div className="flex flex-grow flex-col justify-center">
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
      </div>

      <img
        className="rounded-2 flex items-center justify-center rounded"
        src="src\assets\characters\Alahara.png"
        alt={combatEntry.character}
        style={{
          width: "90px",
          height: "100%",
          objectFit: "cover",
          border: `1px solid ${Constants.BORDER}`,
        }}
      />
    </Container>
  );
}

export default CombatEntryItem;
