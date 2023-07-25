import "bootstrap/dist/css/bootstrap.css";

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
      className="d-flex justify-content-between p-1 border rounded-1"
      style={{
        backgroundColor: BackgroundColor(),
        height: "60px",
        borderColor: Constants.DARK,
      }}
    >
      <div
        className="d-flex fw-bold align-items-center justify-content-center border rounded-1 fs-5"
        style={{
          backgroundColor: EntryColor(),
          color: Constants.DARK,
          aspectRatio: "1/1",
          borderColor: Constants.DARK,
        }}
      >
        {RollEntry}
      </div>
      <div>
        <div className="m-0 fw-bold d-flex justify-content-center fs-5">
          {character}
        </div>
        <div className="m-0 d-flex justify-content-center">{character}</div>
      </div>

      <img
        className="d-flex align-items-center justify-content-center border rounded-1"
        src="src\assets\characters\Alahara.png"
        alt={character}
        style={{ width: "90px", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
}

export default CombatEntry;
