import PersonIcon from "@mui/icons-material/Person";
import * as Constants from "../../Constants";

import React from "react";

interface NameInputProps {
  setState: React.Dispatch<React.SetStateAction<string>>;
}

function NameInputBox({ setState }: NameInputProps) {
  return (
    <div className="input-group mb-3">
      <span
        className="input-group-text"
        id="basic-addon1"
        style={{
          backgroundColor: Constants.PRIMARY_LIGHTER,
          border: `1px solid ${Constants.BORDER_LIGHT}`,
          fontSize: "1.0rem",
          fontWeight: "bold",
        }}
      >
        <PersonIcon />
      </span>
      <input
        type="text"
        className="form-control"
        placeholder="Character Name"
        aria-label="Character Name"
        aria-describedby="basic-addon1"
        style={{
          color: Constants.RED,
          backgroundColor: Constants.PRIMARY_MEDIUM,
          border: `1px solid ${Constants.BORDER_LIGHT}`,
          fontSize: "1.1rem",
          fontWeight: "bold",
        }}
        onChange={(event) => setState(event.target.value)}
      />
    </div>
  );
}
export default NameInputBox;
