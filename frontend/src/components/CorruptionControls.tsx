import * as Constants from "../Constants";

function CorruptionControls2() {
  const addCorruption = () => {
    console.log("add corruption");
  };

  const removeCorruption = () => {
    console.log("remove corruption");
  };

  return (
    <div className="flex">
      <div className="flex flex-col">
        <div
          className="fw-bold flex grow items-center justify-center rounded"
          style={{
            color: Constants.DARK,
            backgroundColor: Constants.PRIMARY,
            border: `1px solid ${Constants.BORDER}`,
            margin: "2px 2px 2px 2px",
            width: "40px",
          }}
          onClick={() => removeCorruption()}
        >
          -
        </div>

        <div
          className="fw-bold flex grow items-center justify-center rounded"
          style={{
            color: Constants.DARK,
            backgroundColor: Constants.PRIMARY,
            border: `1px solid ${Constants.BORDER}`,
            margin: "2px 2px 2px 2px",
            width: "40px",
          }}
          onClick={() => addCorruption()}
        >
          +
        </div>
      </div>
    </div>
  );
}

export default CorruptionControls2;
