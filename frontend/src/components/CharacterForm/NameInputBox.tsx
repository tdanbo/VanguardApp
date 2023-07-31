import PersonIcon from "@mui/icons-material/Person";
import * as Constants from "../../Constants";

import React from "react";

interface NameInputProps {
  setState: React.Dispatch<React.SetStateAction<string>>;
}

function NameInputBox({ setState }: NameInputProps) {
  return (
    <div className="relative mb-3 flex w-full items-stretch">
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
        className="mb-1 block w-full appearance-none rounded border border-gray-200 bg-white px-2 py-1 text-base leading-normal text-gray-800"
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
