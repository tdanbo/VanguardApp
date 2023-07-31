import * as Constants from "../Constants";

import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

function CorruptionControls() {
  return (
    <div className="flex w-full">
      <div
        className="flex-grow-1 fw-bold flex items-center justify-center rounded"
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
      <div className="flex flex-col">
        <div
          className="flex-grow-1 fw-bold flex items-center justify-center rounded"
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
          className="flex-grow-1 fw-bold flex items-center justify-center rounded"
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
