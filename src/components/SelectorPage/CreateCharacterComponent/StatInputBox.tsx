import React from "react";
import * as Constants from "../../../Constants";

interface StatInputProps {
  stat: string;
  value: number;
  selectedValue: number;
  setSelectedValue: React.Dispatch<React.SetStateAction<number>>;
}

function StatInputBox({
  stat,
  value,
  selectedValue,
  setSelectedValue,
}: StatInputProps) {
  let newValue = value;
  if (selectedValue === 0) {
    console.log("selectedValue is 0");
    setSelectedValue(value);
  }
  // if (selectedValue === 0) {
  //   setSelectedValue(value);
  // } else {
  //   setSelectedValue(0);
  //   newValue = selectedValue;
  // }

  const handleClick = () => {
    setSelectedValue(value);
  };

  return (
    <div className="relative mb-1 flex w-full items-stretch">
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
      <button
        className="mb-1 block w-full appearance-none rounded border border-gray-200 bg-white px-2 py-1 text-base leading-normal text-gray-800 "
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
      >
        {newValue}
      </button>
    </div>
  );
}
export default StatInputBox;
