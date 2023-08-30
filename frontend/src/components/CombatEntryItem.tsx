import * as Constants from "../Constants";
import { CombatEntry } from "../Types";

interface CombatEntryItemProps {
  combatEntry: CombatEntry;
  index: number;
}

function CombatEntryItem({ combatEntry, index }: CombatEntryItemProps) {
  const BackgroundColor = () => {
    if (index % 2 === 0) {
      return Constants.PRIMARY;
    } else {
      return Constants.PRIMARY_DARKER;
    }
  };

  const EntryColor = () => {
    return Constants.TYPE_COLORS[combatEntry.type] || Constants.BORDER_DARK;
  };

  return (
    <div
      className="flex justify-between p-1"
      style={{
        backgroundColor: BackgroundColor(),
        height: "60px",
        borderTop: `1px solid ${Constants.BORDER}`,
      }}
    >
      <div
        className="flex items-center justify-center rounded text-lg font-bold"
        style={{
          backgroundColor: EntryColor(),
          color: Constants.FONT_LIGHT,
          aspectRatio: "1/1",
          borderColor: "#000000",
          border: `1px solid ${Constants.BORDER}`,
        }}
        title={`Dice: ${combatEntry.dice}
        Modifier: ${combatEntry.modifier}`}
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
    </div>
  );
}

export default CombatEntryItem;
