import * as Constants from "../Constants";
import { CharacterContext } from "../contexts/CharacterContext";
import { useContext } from "react";
import { useState } from "react";

// src={`src/assets/icons/${type_name}.png`}

type Props = {
  active: string;
  type_name: string;
  type_value: number;
};

function ActiveBox({ active, type_name, type_value }: Props) {
  const [value, setValue] = useState(type_value);
  console.log(type_name);
  return (
    <div className="flex w-full flex-col">
      <div
        className="flex grow items-center justify-center  rounded-t"
        style={{
          color: Constants.RED,
          backgroundColor: Constants.PRIMARY_MEDIUM,
          border: `1px solid ${Constants.BORDER_LIGHT}`,
          margin: "2px 2px 2px 2px",
          fontSize: "1.1rem",
          fontWeight: "bold",
        }}
        onClick={() => setValue(value + 1)}
      >
        {type_value}
      </div>
      <img
        className="h-8 w-8 items-center justify-center rounded-b "
        src={`src/assets/icons/${active}.png`}
        style={{
          backgroundColor: Constants.PRIMARY_LIGHTER,
          border: `1px solid ${Constants.BORDER_LIGHT}`,
          margin: "2px 0px 2px 2px",
          fontSize: "0.8rem",
          fontWeight: "bold",
          padding: "4px",
        }}
      ></img>
    </div>
  );
}

export default ActiveBox;
