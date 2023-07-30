import React from "react";
import * as Constants from "../../Constants";

interface StatInputProps {
  stat: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

function StatInputBox({ stat, setState }: StatInputProps) {
  return (
    <div className="input-group mb-1">
      <span
        className="input-group-text w-50 justify-content-center"
        id="basic-addon1"
        style={{
          color: Constants.DARK,
          backgroundColor: Constants.PRIMARY_LIGHTER,
          border: `1px solid ${Constants.BORDER_LIGHT}`,
          fontSize: "1.0rem",
          fontWeight: "bold",
        }}
      >
        {stat}
      </span>
      <input
        type="number"
        className="form-control "
        placeholder="0"
        aria-label="Username"
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
export default StatInputBox;
