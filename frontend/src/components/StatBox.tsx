import * as Constants from "../Constants";
import AutoFixNormalIcon from "@mui/icons-material/AutoFixNormal";
import { CharacterContext } from "../contexts/CharacterContext";
import { useContext } from "react";

type Props = {
  type_name: string;
  type_value: number;
};

function StatBox({ type_name, type_value }: Props) {
  const { character, setCharacter } = useContext(CharacterContext);

  let active = "";

  Object.entries(character.actives).forEach(([key, dict]) => {
    console.log(dict.stat);
    console.log(type_name);
    if (dict.stat === type_name) {
      console.log("below is the value");
      active = key;
    }
  });

  const handleActiveRoll = () => {
    console.log(active);
  };

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
      >
        {type_value}
      </div>
      <div className="flex">
        {active === "" ? ( // if active is an empty string
          <div
            className="flex h-7 grow items-center justify-center rounded-b"
            style={{
              backgroundColor: Constants.PRIMARY_LIGHTER,
              border: `1px solid ${Constants.BORDER_LIGHT}`,
              margin: "2px 2px 2px 0px",
              fontSize: "0.8rem",
              fontWeight: "bold",
            }}
          >
            {type_name.toUpperCase()}
          </div>
        ) : (
          <>
            <img
              className="h-7 w-7 items-center justify-center rounded-bl "
              src={`src/assets/icons/${active}.png`}
              style={{
                backgroundColor: Constants.PRIMARY_LIGHTER,
                borderLeft: `1px solid ${Constants.BORDER_LIGHT}`,
                borderBottom: `1px solid ${Constants.BORDER_LIGHT}`,
                borderTop: `1px solid ${Constants.BORDER_LIGHT}`,
                margin: "2px 0px 2px 2px",
                fontSize: "0.8rem",
                fontWeight: "bold",
                padding: "4px",
              }}
              onClick={handleActiveRoll}
            ></img>
            <div
              className="flex h-7 grow items-center justify-center rounded-br pr-6"
              style={{
                backgroundColor: Constants.PRIMARY_LIGHTER,
                border: `1px solid ${Constants.BORDER_LIGHT}`,
                margin: "2px 2px 2px 0px",
                fontSize: "0.8rem",
                fontWeight: "bold",
              }}
            >
              {type_name.toUpperCase()}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default StatBox;
