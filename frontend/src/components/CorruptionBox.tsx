import * as Constants from "../Constants";

function CorruptionBox() {
  return (
    <div className="d-flex flex-column w-100">
      <div
        className="d-flex flex-grow-1 align-items-center justify-content-center rounded fw-bold"
        style={{
          fontSize: "0.8rem",
          color: Constants.RED,
          backgroundColor: Constants.PRIMARY_LIGHTER,
          border: `1px solid ${Constants.BORDER_LIGHT}`,
          margin: "2px 2px 2px 2px",
        }}
      ></div>
    </div>
  );
}

export default CorruptionBox;
