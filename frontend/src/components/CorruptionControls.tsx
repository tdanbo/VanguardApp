import * as Constants from "../Constants";

import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

function CorruptionControls() {
  return (
    <div className="d-flex w-100">
      <div
        className="d-flex flex-grow-1 align-items-center justify-content-center rounded fw-bold"
        style={{
          fontSize: "3rem",
          color: Constants.DARK,
          backgroundColor: Constants.PRIMARY,
          border: `1px solid ${Constants.BORDER}`,
          margin: "2px 2px 2px 2px",
          width: "80px",
          maxWidth: "80px",
        }}
      >
        I
      </div>
      <div className="d-flex flex-column">
        <div
          className="d-flex flex-grow-1 align-items-center justify-content-center rounded fw-bold"
          style={{
            fontSize: "0.8rem",
            color: Constants.DARK,
            backgroundColor: Constants.PRIMARY,
            border: `1px solid ${Constants.BORDER}`,
            margin: "2px 2px 2px 2px",
            width: "40px",
          }}
        >
          <LocalFireDepartmentIcon />
        </div>

        <div
          className="d-flex flex-grow-1 align-items-center justify-content-center rounded fw-bold"
          style={{
            fontSize: "0.8rem",
            color: Constants.DARK,
            backgroundColor: Constants.PRIMARY,
            border: `1px solid ${Constants.BORDER}`,
            margin: "2px 2px 2px 2px",
            width: "40px",
          }}
        >
          <RestartAltIcon />
        </div>
      </div>
    </div>
  );
}

export default CorruptionControls;
