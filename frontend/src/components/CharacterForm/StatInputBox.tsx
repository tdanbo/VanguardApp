import React from "react";
import * as Constants from "../../Constants";

interface StatInputProps {
  stat: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

function StatInputBox({ stat, setState }: StatInputProps) {
  return (
    <div className="relative flex items-stretch w-full mb-1">
      <span
        className="input-group-text w-1/2 justify-center"
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
        className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded "
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
