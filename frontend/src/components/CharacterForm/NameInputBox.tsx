import PersonIcon from "@mui/icons-material/Person";
import * as Constants from "../../Constants";

import React from "react";

interface NameInputProps {
  setState: React.Dispatch<React.SetStateAction<string>>;
}

function NameInputBox({ setState }: NameInputProps) {
  return (
    <div className="relative flex items-stretch w-full mb-3">
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
        className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
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
