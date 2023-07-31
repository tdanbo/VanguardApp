import * as Constants from "../Constants";

interface CombatEntryProps {
  character: string;
  entryType: string;
  entryResult: number;
  index: number;
}

function CombatEntry({
  character,
  entryType,
  entryResult,
  index,
}: CombatEntryProps) {
  const RollEntry = entryResult;

  const BackgroundColor = () => {
    if (index % 2 === 0) {
      return Constants.PRIMARY;
    } else {
      return Constants.PRIMARY_DARKER;
    }
  };

  const EntryColor = () => {
    if (entryType === "attack") {
      return Constants.RED;
    }
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
        className="fw-bold rounded-2 fs-5 flex items-center justify-center  bg-red-500"
        style={{
          backgroundColor: EntryColor(),
          color: Constants.FONT_LIGHT,
          aspectRatio: "1/1",
          borderColor: "#000000",
          border: `1px solid ${Constants.BORDER}`,
        }}
      >
        {RollEntry}
      </div>
      <div>
        <div className="fw-bold fs-5 m-0 flex justify-center">{character}</div>
        <div className="m-0 flex justify-center">{character}</div>
      </div>

      <img
        className="rounded-2 flex items-center justify-center"
        src="src\assets\characters\Alahara.png"
        alt={character}
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

export default CombatEntry;
